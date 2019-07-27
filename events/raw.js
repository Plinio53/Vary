const Discord = require("discord.js")

module.exports = async (vary, evento) => {
        if(evento.t !== "MESSAGE_REACTION_ADD" && evento.t !== "MESSAGE_REACTION_REMOVE") return
        if(evento.d.message_id != "604308534477193237") return

        let servidor = vary.guilds.get("546634351740190731")
        let membro = servidor.members.get(evento.d.user_id)

        let cargo1 = servidor.roles.get('546635665752981504');
    /*  let cargo2 = servidor.roles.get('ID');
        let cargo3 = servidor.roles.get('ID');
    */
        if(evento.t === "MESSAGE_REACTION_ADD"){
            if(evento.d.emoji.id === "603548511182782484"){
                if(membro.roles.has(cargo1)) return
                membro.addRole(cargo1)
           } /* else if(evento.d.emoji.id === "529266822961430548"){
                if(membro.roles.has(cargo2)) return
                membro.addRole(cargo2)
            }else if(evento.d.emoji.id === "545161740875333632"){
                if(membro.roles.has(cargo3)) return
                membro.addRole(cargo3)
            }
            */
        }
        if(evento.t === "MESSAGE_REACTION_REMOVE"){
            if(evento.d.emoji.id === "603548511182782484"){
                if(membro.roles.has(cargo1)) return
                membro.removeRole(cargo1)
            } /* else if(evento.d.emoji.id === "529266822961430548"){
                if(membro.roles.has(cargo2)) return
                membro.removeRole(cargo2)
            }else if(evento.d.emoji.id === "545161740875333632"){
                if(membro.roles.has(cargo3)) return
                membro.removeRole(cargo3)
               } */
            }
}
