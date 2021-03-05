const Discord = require('discord.js');
exports.run = async (client, message) => {
  var karakterler = [
    "Colt",
    "Nita",
    "Bull",
    "Jessie",
    "Mortis",
    "Gale",
    "Leon",
    "Spike",
    "Sandy",
    "Crow",
    "MR.P",
    "Max",
    "Sprout",
    "Tara",
    "Gene",
    "Surge",
    "Brock",
    "Dynamike",
    "Frank",
    "Piper",
    "Carl",
    "Penny",
    "Darrly",
    "Rico",
    "Rosa",
    "Poco",
    "Barley",
    "El Primo",
    "8-Bit",
    "Tick",
    "Bibi",
    "Bo",
    "Shelly",
    "Pam",
    "Bea",
    "Emz",
    "Jacky",
    "Nani",
    "Shelly"
   
    ]  
  var karakterler = karakterler[Math.floor(Math.random(1) * karakterler.length)]
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`${message.author.username} ın Kutusu;`, message.author.avatarURL())
    .setImage('https://media0.giphy.com/media/JOdQKwcV985Ip2ezWh/giphy.gif')
    .setDescription(`
\`\`\`
Kutudan Çıkan Karakter = ${karakterler}
\`\`\`
`)
  .setFooter(`Kutuyu açan (${message.author.username}) Unutma Bunlar Sadece Bir Simülatör Gerçek hesabına Gelmez`)
    message.channel.send(embed);
  }
 
 
exports.conf = {
  aliases: ['jsal']
}
exports.help = {
  name: "kutuaç"
}