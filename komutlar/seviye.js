const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
  
   let hm = await db.fetch(`seviyeacik_${message.guild.id}`)
  let kanal = await db.fetch(`svlog_${message.guild.id}`)
  let xp = await db.fetch(`verilecekxp_${message.guild.id}`)
  let seviyerol = await db.fetch(`svrol_${message.guild.id}`)
  let rollvl = await db.fetch(`rollevel_${message.guild.id}`)
  let kxp = await db.fetch(`xp_${message.author.id}_${message.guild.id}`)
  let klvl = await db.fetch(`lvl_${message.author.id}_${message.guild.id}`)
  if(!hm) return message.channel.send(':x: Seviye komutları aktif değil! \n `?seviye-aç ?seviye-rol ?seviye-log ?seviye-xp ?seviye-ayarlar ?seviye-kapat`')
  var user = message.mentions.users.first() || message.author;
  
  let kontrol;
  if(klvl == null) kontrol = '0'
  else kontrol = kxp
  
  let kontrol2;
  if(klvl == null) kontrol2 = '0'
  else kontrol2 = klvl
  
  let seviye = new Discord.MessageEmbed()
  .setTitle('Seviye Bilgisi:')
   .setAuthor(message.member.user.username, message.author.avatarURL())
  .addField('Kullanıcı:', user, true)
  .addField('Kullanıcı XP değeri:', '**'+kontrol+'**', true)
  .addField('Kullanıcı Seviye Değeri:', '**'+kontrol2+'**', true)
  .setFooter('DotNight | Seviye')
  .setColor('GOLD')
  .setTimestamp()
  .setThumbnail(user.avatarURL())
  message.channel.send(seviye)
 

 };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'seviye',
  description: 'taslak', 
  usage: 'seviye'
};