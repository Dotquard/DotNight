const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
  
  
 let hm = await db.fetch(`seviyeacik_${message.guild.id}`)
  let kanal = await db.fetch(`svlog_${message.guild.id}`)
  let xp = await db.fetch(`verilecekxp_${message.guild.id}`)
  let seviyerol = await db.fetch(`svrol_${message.guild.id}`)
  let rollvl = await db.fetch(`rollevel_${message.guild.id}`)
  
   let kontrol;
  if(kanal == null) kontrol = '\<:redtick:782644503223336990>'
  else kontrol = '\<:greentick:782644515084435516> | '+ kanal
  
  let kontrol2;
  if(xp == null) kontrol2 = '4 (Varsayılan)'
  else kontrol2 = '\<:greentick:782644515084435516> | '+ xp
  
  let kontrol3;
  if(seviyerol == null) kontrol3 = '\<:redtick:782644503223336990>>'
  else kontrol3 = '\<:greentick:782644515084435516> | '+ seviyerol
  
  let kontrol4;
  if(rollvl == null) kontrol4 = '\<:redtick:782644503223336990>'
  else kontrol4 = '\<:greentick:782644515084435516> | '+rollvl
  if(!hm) return message.channel.send('<a:alert:707993531834302505>Seviye sistemi bu sunucuda aktif durumda değil! \n `?seviye-aç`')
  let ayarlar = new Discord.MessageEmbed()
  .setTitle('Sunucu Seviye Ayarları:')
  .setDescription(message.guild.name + ' Sunucusunun seviye ayarları!')
  .addField('Göstergeler', '\<:greentick:782644515084435516> : **Aktif** \n \<:redtick:782644503223336990> : **Devre Dışı**')
  .addField('Seviye Logs Kanalı:', kontrol, true)
  .addField('Mesaj Başı Verilecek XP:', kontrol2, true)
  .addField('Seviye Rol', kontrol3, true)
  .addField('Seviye Rol Leveli:', kontrol4, true)
  .setFooter('DotNight | Seviye')
  message.channel.send(ayarlar)
 

 };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['seviyeayarlar', 'seviyeayar'], 
  permLevel: 0
};

exports.help = {
  name: 'seviye-ayarlar',
  description: 'taslak', 
  usage: 'seviye-ayarlar'
};