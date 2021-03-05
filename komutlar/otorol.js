const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (args[0] === 'sıfırla') {
let otorol = db.fetch(`otorol_${message.guild.id}`)
if (!otorol) return message.channel.send(`Otorol Ayarlanmadığı İçin Sıfırlanamaz!`)
message.channel.send(`Otorol Başarıyla Sıfırlandı!`)
  db.delete(`otorollog_${message.guild.id}`)
  db.delete(`otorol_${message.guild.id}`)
  return;
}

let rol = message.mentions.roles.first()
if(!rol) return message.channel.send(`Sunucuya Gelenlere Verilecek Rolü Belirtmeyi Unuttun!`)

let kanal = message.mentions.channels.first()
if (!kanal) return message.channel.send(`Otorol Logunu Ayarlamayı Unuttun!`)

db.set(`otorol_${message.guild.id}`, rol.id)
db.set(`otorollog_${message.guild.id}`, kanal.id)

message.channel.send(`Otorol Başarıyla Ayarlandı ! `)  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: ['oto-rol'],
  permlevel: 0
}
exports.help = {
  name: 'otorol'
}