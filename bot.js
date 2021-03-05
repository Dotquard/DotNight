const fs=require('fs');
const Discord=require("discord.js");
const client=new Discord.Client();
const db = require('quick.db')
const moment = require("moment");
const ayarlar=require("./ayarlar.json");
const express = require('express');
/////
const app = express()
app.get('/', (req, res) => res.send("Bot Aktif"))
app.listen(process.env.PORT, () => console.log('Port ayarlandı: ' + process.env.PORT))
//////////////////



client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})


client.on("ready", () => {
  console.log(`Bütün komutlar başarıyla yüklendi!`);
  client.user.setStatus("dnd");
  client.user.setActivity('?yenilikler- Kayıt Sistemi Eklendi!🔥');
})


const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut ismi: ${props.help.name.toUpperCase()}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  
client.yetkiler = message => {
  if(!message.guild) {
	return; }
  let permlvl = -ayarlar.varsayilanperm  ;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};
 
/////////////////////////////////////// SA AS ////////////////////////////

client.on("message", async msg => {
 
 
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'sea'|| msg.content.toLowerCase() == 'selam') {
          try {
 
                  return msg.reply(
                    'Aleyküm Selam, Hoşgeldin')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
   
    }
    if (!i) return;
 
    });

client.login(ayarlar.token)

/////////////////////////// SA AS ///////////////////////////////////////////////////

//////////////////////////////////////// 

client.on("message", async msg => {
    if(msg.author.bot) return;
    
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const reklam = ["https://","http://","discord.gg"];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                                       
                    return msg.channel.send(`✋ ${msg.author.tag}, Reklam Yapmak Yasak!`).then(msg => msg.delete(10000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });    


client.on("messageUpdate", msg => {
 
 
 const i = db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", 
                       "amk", 
                       "ananı sik iyim",
                       "piç",
                       "orospu çocuğu",
                       "orospu",
                       "oruspu"];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                         
                      return msg.reply('✋ Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});
 
/////////////////////////////

////////// Güvenlik ///////////

client.on('guildMemberAdd', member => {
     let kanal = db.fetch(`güvenlik.${member.guild.id}`)
     if(!kanal) return;

       let aylar = {
               "01": "Ocak",
               "02": "Şubat",
               "03": "Mart",
               "04": "Nisan",
               "05": "Mayıs",
               "06": "Haziran",
               "07": "Temmuz",
               "08": "Ağustos",
               "09": "Eylül",
               "10": "Ekim",
               "11": "Kasım",
               "12": "Aralık"
    }

  let bitiş = member.user.createdAt
      let günü = moment(new Date(bitiş).toISOString()).format('DD')
      let ayı = moment(new Date(bitiş).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık").replace("13","CodAre")//codare
     let yılı =  moment(new Date(bitiş).toISOString()).format('YYYY')
     let saati = moment(new Date(bitiş).toISOString()).format('HH:mm')

let günay = `${günü} ${ayı} ${yılı} ${saati}`  

      let süre = member.user.createdAt
      let gün = moment(new Date(süre).toISOString()).format('DD')
      let hafta = moment(new Date(süre).toISOString()).format('WW')
      let ay = moment(new Date(süre).toISOString()).format('MM')
      let ayy = moment(new Date(süre).toISOString()).format('MM')
      let yıl =  moment(new Date(süre).toISOString()).format('YYYY')
     let yıl2 = moment(new Date().toISOString()).format('YYYY')

     let netyıl = yıl2 - yıl

     let created = ` ${netyıl} yıl  ${ay} ay ${hafta} hafta ${gün} gün önce`

     let kontrol;
     if(süre < 1296000000) kontrol = 'Bu hesap şüpheli!'
     if(süre > 1296000000) kontrol = 'Bu hesap güvenli!'

     let codare = new Discord.MessageEmbed()
     .setColor('GREEN')
     .setTitle(`${member.user.username} Katıldı`)
     .setDescription('<@'+member.id+'> Bilgileri : \n\n  Hesap oluşturulma tarihi **[' + created + ']** (`' + günay + '`) \n\n Hesap durumu : **' + kontrol + '**')//codare
     .setTimestamp()
     client.channels.cache.get(kanal).send(codare)
})

/////////// Güvenlik /////////

////////// MOD LOG /////////////

//@Efe#9110 v12 modlog //CODARE <3
const botadi = "DotNight"


client.on('guildBanAdd', async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir kişi sunucudan yasaklandı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasaklanan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});


client.on('guildBanRemove', async (guild, user) => {
 let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir kişinin yasağı kaldırıldı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasağı kaldırılan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});


client.on('channelCreate', async channel => {
 let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
 let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      let embed = new Discord.MessageEmbed()
      .setColor("#fffa00")
      .setAuthor("Bir Kanal Oluşturuldu")
      .addField(`Oluşturulan Kanalın İsmi : `, `${channel.name}`)
      .addField(`Oluşturulan Kanalın Türü : `, `Yazı`)
      .addField(`Kanalı Oluşturan : `, `<@${user.id}>`)
      .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp()
      modlogkanal.send(embed)
    }
      if (channel.type === "voice") {
      
        let embed = new Discord.MessageEmbed()
        .setColor("#fffa00")
        .setAuthor("Bir Kanal Oluşturuldu")
        .addField(`Oluşturulan Kanalın İsmi : `, `${channel.name}`)
        .addField(`Oluşturulan Kanalın Türü : `, `Ses`)
        .addField(`Kanalı Oluşturan : `, `<@${user.id}>`)
        .setFooter(`${botadi} | Mod-Log Sistemi`)
        .setTimestamp()
        modlogkanal.send(embed)


    }
}});

client.on('channelDelete', async channel => {
      let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
 let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Kanal Silindi")
    .addField(`Silinen Kanalın İsmi : `, `${channel.name}`)
    .addField(`Silinen Kanalın Türü : `, `Yazı`)
    .addField(`Kanalı Silen : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
      if (channel.type === "voice") {

        let embed = new Discord.MessageEmbed()
        .setColor("#fffa00")
        .setAuthor("Bir Kanal Silindi")
        .addField(`Silinen Kanalın İsmi : `, `${channel.name}`)
        .addField(`Silinen Kanalın Türü : `, `Ses`)
        .addField(`Kanalı Silen : `, `<@${user.id}>`)
        .setFooter(`${botadi} | Mod-Log Sistemi`)
        .setTimestamp()
        modlogkanal.send(embed)
       }
      }
    });

client.on('roleDelete', async role => {
 let modlogs =  db.get(`modlogkanaly_${role.guild.id}`)
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
 const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Rol Silindi")
    .addField(`Silinen Rolün İsmi : `, `${role.name}`)
    .addField(`Rolü Silen : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

client.on('emojiDelete', async emoji => {
 let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
 let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Emoji Silindi")
    .addField(`Silinen Emojinin İsmi : `, `${emoji.name}`)
    .addField(`Emojiyi Silen : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});
  

client.on('roleCreate', async role => {
let modlogs =  db.get(`modlogkanaly_${role.guild.id}`)
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Rol Oluşturuldu")
    .addField(`Oluşturulan Rolün İsmi : `, `${role.name}`)
    .addField(`Rolü Oluşturan : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});


client.on('emojiCreate', async emoji => {
 let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
 let entry = await role.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Emoji Oluşturuldu")
    .addField(`Oluşturulan Emojinin İsmi : `, `${emoji.name}`)
    .addField(`Emoji Silen : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

//MESAJ LOG

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  if (newMessage.content.startsWith(prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${newMessage.guild.id}`);
  let scbul = newMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
    .addField("Kullanıcı", newMessage.author)
    .addField("Eski Mesaj", "```" + oldMessage.content + "```")
    .addField("Yeni Mesaj", "```" + newMessage.content + "```")
    .addField("Kanal Adı", newMessage.channel.name)
    .addField("Mesaj ID", newMessage.id)
    .addField("Kullanıcı ID", newMessage.author.id)
    .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours() +
        3}:${newMessage.createdAt.getMinutes()}`
    );
  scbul.send(embed);
});

client.on("messageDelete", async deletedMessage => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  if (deletedMessage.content.startsWith(prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${deletedMessage.guild.id}`);
  let scbul = deletedMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL)
    .addField("Kullanıcı", deletedMessage.author)
    .addField("Silinen Mesaj", "```" + deletedMessage.content + "```")
    .addField("Kanal Adı", deletedMessage.channel.name)
    .addField("Mesaj ID", deletedMessage.id)
    .addField("Kullanıcı ID", deletedMessage.author.id)
    .setFooter(`Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours() +
        3}:${deletedMessage.createdAt.getMinutes()}`
    );
  scbul.send(embed);
});
//@Efe#9110 v12 modlog //CODARE <3

///////// MOD LOG //////////////////////

/////// TAG ////////////////////////////

client.on('guildMemberAdd', async member => {
  
  let emran = await db.fetch(`ototag.${member.guild.id}`);
  let tanersins;
  if (emran == null) tanersins = member.setNickname(`${member.user.username}`)
  else tanersins = member.setNickname(`${emran} ${member.user.username}`)
});

/////////////// TAG /////////////////

//////// AFK ////////

client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.reply(`Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`)
   }
 }
  if(msg.author.id === kisi){

       msg.reply(`Afk'lıktan Çıktınız`)
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});

//////////////// AFK ////////////

/////////////// OtoRol /////////////////

client.on("guildMemberAdd", async member => {
  let rol = db.fetch(`otorol_${member.guild.id}`)
  let kanal = db.fetch(`otorollog_${member.guild.id}`)

if (!rol) return;

member.roles.add(rol)

client.channels.cache.get(kanal).send(`Sunucuya ${member} Adlı Kullanıcı Katıldı. Otomatik Olarak Rolü Verildi!`)
})

//////////////// OtoRol ////////////////////////

//------------Seviye-------------------//
client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var id = message.author.id
  var gid = message.guild.id

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels.cache.get(kanal.id)
          .send(
            message.member.user.username +
              " Seviye Atladı! Yeni seviyesi** " +
              lvl +
              " **Tebrikler! "
          );

        
      }
   
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).roles.add(seviyerol);
        if (kanal) {
          client.channels.cache.get(kanal.id)
            .send(
              message.member.user.username +
                " Yeni Seviyesi** " +
                rollvl +
                " **ve** " +
                seviyerol +
                " **Rolünü kazandı!"
            );
        }
      }
    }
  }

  
});

//------------Seviye-------------------//

///// DM ////////

client.on("message", msg => {
var dm = client.channels.cache.get("782375125005762580")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.MessageEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL()}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
});

//////// DM ///////////