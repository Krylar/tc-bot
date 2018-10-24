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
  ndx = client.tcrTroops.worksheets.findIndex(n => n.title === "REF_Skills");
  client.tcrTroops.getRows(ndx+1, {offset: 1}, function (err, rows) {
//  client.tcrTroops.getRows(ndx+1, {query: `skill = "${com}"`}, function (err, rows) {
    //console.log(rows.length);
    if(rows.size << 1) {
      message.reply("Cannot find that skill!");
      err=1;
    }
//    else console.log(`==> Commander: ${rows[0].name}`);
    rows.forEach(rr => {
      console.log(`==> Commander: ${rr.skill}`);

      type = rr.triggertype;
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
      else if(type == "All")
        color = 0xF0DA8E; // yellow
      else color = 0; // black

      // stacks?
      var isStackable;
      if(rr.stacks == "Y") isStackable = "Yes"
      else if(rr.stacks == "N") isStackable = "No"
      else isStackable = "???";

      msg = new Discord.RichEmbed()
        .setAuthor(`${rr.skill||""}`)
        .setTitle(type)
//        .setTitle(`${rr.name||""} (${rr.class||""})`)
        .setThumbnail(rr.imgurl||"")
        .setColor(color)
        .setDescription(rr.description)
        .addField("Scale", `${rr.scale} (${parseFloat(rr.scale) * 60}% @ Lv.60)` )
        .addField("Sure Hit?", `${rr.surehit.replace(/.+/,"Yes")||"No"}`)
        .addField("Ignore Tier Suppression? (iTS)", `${rr.tiersuppressionexempt.replace(/.+/,"Yes")||"No"}`)
        .addField("Defensive Stance Exempt?", `${rr.defensivestanceexempt.replace(/.+/,"Yes")||"No"}`)
        .addField("Stacks?", isStackable)
        ;
      message.channel.send(msg);
    }); // forEach

  }); // getRows
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sk"],
  permLevel: "Administrator"
};

exports.help = {
  name: "skill",
  category: "TCR Info",
  description: "Skill info",
  usage: "skill <skill name>"
};
