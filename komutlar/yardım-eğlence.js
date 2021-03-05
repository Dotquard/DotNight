const Discord = require("discord.js");
const db = require("quick.db");


exports.run = async (client, message, args) => {

const yardım = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("\<:ss:771023987299844118> Eğlence Menüsüne Hoşgeldin! \<:ss:771023987299844118>")
 .setTimestamp()
.setDescription("\<:ss:771023987299844118> **?eğlence** = __Eğlence komutlarını görüntülersiniz.__ \n \<:ss:771023987299844118> **?moderasyon** = __Moderasyon komutlarını görüntülersiniz.__ \n \<:ss:771023987299844118> **?kullanıcı** = __Kullanıcı komutlarını görüntülersiniz.__ \n \<:ss:771023987299844118> **?logo** = __Logo komutlarını görüntülersiniz.__")
.setImage("https://media.giphy.com/media/iGD9lEb2ow4cyIQ5fC/giphy.gif")
message.channel.send(yardım)
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
   aliases: [""],
  permLevel: `Yetki gerekmiyor.` 
};

exports.help = {
  name: 'eğlence',
  category: 'kullanıcı',
  description: 'Eğlence Menüsü.',
   usage:'!eğlence'
}