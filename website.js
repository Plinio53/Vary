require('dotenv').config()
const express = require("express")
const request = require("request")
const bt = require("btoa")
const {redirect_uri,id} = require("./config.json")
const secret = process.env.SECRET
const app = express()
const database = require("./database.js")
const authorized = ["375627393773207554"]

app.set('trust proxy', 1) 
const session = require("express-session")
app.use(session({ secret: 'keyboard cat', cookie: { }, resave: false, saveUninitialized: true,}))



app.get("/",function(req, res){

  res.render("index.ejs",{

   logged: req.session.user,

   username: req.session.user ? req.session.user.username : ""

})

})

app.get("/log",function(req, res){

      res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${id}&redirect_uri=${redirect_uri}`)

})

app.get("/login",async function (req, res) {

   if (!req.query.code) return res.redirect("/");

   request({

       method: 'POST', url: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirect_uri}`, headers: {

           Authorization: `Basic ${bt(id + ":" + secret)}`

       }

   }, function (_, _, body) {

       const json = JSON.parse(body);

       request({

           method: 'GET',

           url: 'https://discordapp.com/api/users/@me',

           headers: {

               Authorization: 'Bearer ' + json['access_token']

           }

       }, async function (_, _, userBody) {

           userBody = JSON.parse(userBody)

           if (!userBody.id) return res.redirect("/");

           req.session.user = userBody

           

           res.redirect("/");

       })

   })
})
app.get("/changemoney",function(req,res){
    if (!req.session.user) return res.redirect("/")
    if (!authorized.includes(req.session.user.id)) return res.redirect("/")
    res.render("changemoney.ejs",{
      username: req.session.user.username
    })
})
app.post("/changemoney",async function(req,res){
    const {user,Smiles} = req.body
    if ( (!user || !Smiles) && Smiles !== 0 ) return res.end("Inválido")
    if (!req.session.user) return res.end("Não autorizado")
    if (!authorized.includes(req.session.user.id)) return res.end("Não autorizado")
    const data = await database.Users.findOne({"userID":user})
    if (!data) return res.end("Não achei esse usuário no banco de dados")
    data.Smiles = Smiles
    data.save()
    return res.end(`Dinheiro do usuário ${user} mudado para ${Smiles} com sucesso`)
})

console.log(`Website iniciado com sucesso!`)
app.listen(4000)