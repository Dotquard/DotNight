const Discord = require("discord.js");
exports.run = (client, message, args) => {
  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
 message.channel.createOverwrite(every, {
    SEND_MESSAGES: null
  });

  message.channel.send("Sohbet kanalı Başarıyla ``Yazılabilir`` Durumuna Getirildi. \<:greentick:782644515084435516>");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "sohbet",
  permLevel: 3
};

exports.help = {
  name: "sohbet-aç",
  description: "Sohbetinizi açmaya yarar işte yaw",
  usage: "aç"
};