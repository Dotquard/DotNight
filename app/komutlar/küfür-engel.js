const Discord = require('discord.js')
const db = require('quick.db')
 
exports.run = async (client ,message, args) =>{
if(args[0] === 'aç') {
    db.set(`${message.guild.id}.kufur`, true)
    message.channel.send('\<a:tik1:768735939081797653> **Küfür Filtresi başarıyla ayarlandı.**')
  return
}
if (args[0] === 'kapat') {
  db.delete(`${message.guild.id}.kufur`)
message.channel.send('Başarılı Şekilde `Deaktif` Edildi')
return
}
  message.channel.send(':no_entry: Küfür Filtresini Ayarlamak İçin \`?küfür-engel aç\` | Kapatmak İstiyorsanız \`?küfür-engel kapat\` Yazabilirsiniz')
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['küfürengel','küfür-engel','küfür'],
 permLevel: 0
};
 
exports.help = {
 name: 'küfür-engel',
 description: 'Davet Log Kanalını Belirler',
 usage: 'davet-kanal-ayarla #kanal'
};
 