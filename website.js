const express = require("express")

const request = require("request")

const bt = require("btoa")

const {redirect_uri,id,secret} = require("./config.json")

const app = express()

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

app.listen(4000)




