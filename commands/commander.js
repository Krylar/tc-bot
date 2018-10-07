// Load up the discord.js library
const Discord = require("discord.js");
//const RichEmbed = require('discord.js');

exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

  let com = args[0];
  if(args.length >>> 1) {
    com = args.join(" ");
//    message.channel.send(troop);
//    return;
  };

  var chSkill = message.guild.channels.find(ch => ch.name == "tc-skills");

   var type = "";
  var msg = "";

  // Load TCR
  ndx = client.tcrTroops.worksheets.findIndex(n => n.title === "REF_Commanders");
  client.tcrTroops.getRows(ndx+1, {query: `name = "${com}"`}, function (err, rows) {
    //console.log(rows.length);
    if(rows.size << 1) {
      message.reply("Cannot find that commander!");
      err=1;
    }
//    else console.log(`==> Commander: ${rows[0].name}`);
    rows.forEach(rr => {
      console.log(`==> Commander: ${rows[0].name}`);

      // find skill post in #tc-skills
      chSkill.fetchMessages()
        .then(messages => {
          link1 = messages.filter(m => m.embeds[0].author == rr.skill1);
          message.reply("Skill link: " + Object.keys(link1));
        })
        .catch(console.error);

//      type = rr.triggertype3.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');
      type = rr.triggertype3;
      event10chance = "";

      // troop type color
      if(type == "Infantry")
//        color = 0x3C700C; // dark green
        color = 0x489A1A; // light green
      else if(type == "Walker")
//        color = 0x216894; // dark blue
        color = 0x399FC7; // light blue
      else if(type == "Airship")
//        color = 0x9B2928; // dark red
        color = 0xEC5B58; // light red

      else color = 0;
      if(rr.r10event)
        event10chance = " (" + rr.r10event + ")";

      msg = new Discord.RichEmbed()
/*        .setAuthor('TCR',
//            "https://docs.google.com/uc?export=download&id=1_sfdmtlUF9EhsrMZ-6258LVTDwBMRQV_",
            "",
            'https://docs.google.com/spreadsheets/d/1ymnFE-wVxEqNV4CkoEHVowKcGHZYGouOUk_wCRBNzL4/edit?usp=sharing')
*/
//        .setFooter("TCR")
        .setAuthor(`${rr.name||""} (${rr.class||""})`)
//        .setTitle(`${rr.name||""} (${rr.class||""})`)
        .setThumbnail(rr.imgsrc||"")
        .setColor(color)
//        .addField(`${rr.skill1}`,`**Lv. 1**\n__**${rr.triggertype1}**__ ${rr.description1}`)
//        .addField(`${rr.skill2}`,`**Lv. 1**\n__**${rr.triggertype2}**__ ${rr.description2}`)
//        .addField(`${rr.skill3}`,`**Lv. 1**\n__**${rr.triggertype3}**__ ${rr.description3}`)
        .addField(`1 - ${rr.skill1} <${rr.triggertype1}>`,`${rr.description1}`)
        .addField(`2 - ${rr.skill2} <${rr.triggertype2}>`,`${rr.description2}`)
        .addField(`3 - ${rr.skill3} <${rr.triggertype3}>`,`${rr.description3}`)
        .addField(`How to Obtain:`, `${rr.howtoobtain + event10chance||"?"}`)
        ;
//      console.log(msg);
    }); // forEach

//    console.log("Com Keys: " + Object.keys(rows[0]));
//  console.log(msg);

    message.channel.send(msg);

  }); // getRows
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["com"],
  permLevel: "Administrator"
};

exports.help = {
  name: "commander",
  category: "TCR Info",
  description: "Commander info",
  usage: "commander <commander name>"
};
