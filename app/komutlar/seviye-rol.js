const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
  
 if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`Ne yazık ki bu komutu kullanmaya yetkin yok.`);
  let rol = message.mentions.roles.first()
  let seviye = args[1]
  
     let kanal = await db.fetch(`svlog_${message.guild.id}`)
  let xp = await db.fetch(`verilecekxp_${message.guild.id}`)
  let hm = await db.fetch(`seviyeacik_${message.guild.id}`)
    if(!hm) return message.reply(':x: Bu tuhaf! aktif edilmeyen bir seviye sistemine xp değeri eklemeyi düşünmedin umarım? \n Bunu Deniyebilirsin: `?seviye-aç`')
  if(!rol) return message.channel.send(':x: Ayarlayabilmem için bir rol belirtmelisin. \n Örnek: ***?seviye-rol @verilicekrol 10***')
  if(!seviye) return message.channel.send(':x: Ayarlayabilmem için bir seviye belirtmelisin. \n Örnek: `?seviye-rol @verilicekrol 10`')
  if(isNaN(args[1])) return message.channel.send(':x: eviye değerini bir sayı biçiminde girmelisin.')
  if(seviye > 700) return message.channel.send(':x: Max `700` olarak ayarlanabilir.!')
  
    let kontrol;
  if(kanal == null) kontrol = ':x: Sunucuda Ayarlanmış Bir Log Bulunamadı!'
  else kontrol = kanal
  
  let kontrol2;
  if(xp == null) kontrol2 = '4 (Varsayılan)'
  else kontrol2 = xp
  
  let codeming = new Discord.MessageEmbed()
  .setTitle('Başarılı Ayarlandı!')
  .setDescription('Seviye rol ödülü başarıyla ayarlandı.')
  .addField('Seviye Log Kanalı:', kontrol, true)
  .addField('Mesaj Başı Verilecek XP:', kontrol2, true)
  .addField('Verilecek Rol:', rol, true)
  .addField('Rolün Verileceği Seviye:', seviye)
  .setFooter('DotNight | Seviye')
  .setColor('RANDOM')
  message.channel.send(codeming)
  db.set(`svrol_${message.guild.id}`, rol.id)
  db.set(`rollevel_${message.guild.id}`, seviye)
  
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'seviye-rol',
  description: 'taslak', 
  usage: 'seviye-rol'
};