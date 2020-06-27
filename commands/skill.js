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

  var targetChannel = message.guild.channels.find(ch => ch.name == "tc-skills");

  if(message.channel != targetChannel) {
    message.reply(`Invalid channel! Please run in ${targetChannel}!`);
    return;
  };

  // Clear channel
/*  let fetched;
  fetched = await targetChannel.fetchMessages(100);
//    console.log(`Fetched ${fetched.size} messages.`);
  fetched.forEach(f => {
//      console.log("deleting messasge...");
    f.delete();
  });
  if(fetched.size > 1)
    return;
*/
//    console.log("done!");
//return;
  var type = "";
  var msg = "";

  // Load TCR
  ndx = client.tcrTroops.worksheets.findIndex(n => n.title === "Skills");
  client.tcrTroops.getRows(ndx+1, {offset: 1}, function (err, rows) {
//  client.tcrTroops.getRows(ndx+1, {query: `skill = "${com}"`}, function (err, rows) {
    //console.log(rows.length);
    if(rows.size << 1) {
      message.reply("Cannot find that skill!");
      err=1;
    }
//    else console.log(`==> Commander: ${rows[0].name}`);
    rows.forEach(rr => {
//      console.log(`==> Skill: ${rr.skill}`);
      console.log(`==> Skill: ${rr.skill}\n\tImgSrc: ${rr.imgurl}`);

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

      // Sure Hit?
      var isSureHit;
      if(rr.surehit == "Y") isSureHit = "Yes"
      else if(rr.surehit == "N") isSureHit = "No"
      else isSureHit = "???";

      // iTS?
      var isIts;
      if(rr.tiersuppressionexempt == "Y") isIts = "Yes"
      else if(rr.tiersuppressionexempt == "N") isIts = "No"
      else isIts = "???";

      // Defensive Stance Exempt?
      var isIds;
      if(rr.defensivestanceexempt == "Y") isIds = "Yes"
      else if(rr.defensivestanceexempt == "N") isSIds = "No"
      else isIds = "???";

      // stacks?
      var isStackable;
      if(rr.stacks == "Y") isStackable = "Yes"
      else if(rr.stacks == "N") isStackable = "No"
      else isStackable = "???";
//console.log(`rr.imgurl=${rr.imgurl}`);
      msg = new Discord.RichEmbed()
        .setTitle(`${rr.skill||""} (${type})`)
//         .setTitle(type)
//        .setTitle(`${rr.name||""} (${rr.class||""})`)
//        .setThumbnail(rr.imgurl||"https://docs.google.com/uc?export=download&confirm=no_antivirus&id=1YYkvsz_VrmfBPGkQ7md72YAV2vh7pbMb")
        .setThumbnail(rr.imgurl||"")
        .setColor(color)
        .setDescription(rr.description)
        .addField("Scale", `${rr.scale} (${parseFloat(rr.scale) * 60}% @ Lv.60)` )
        .addField("Sure Hit?", isSureHit)
        .addField("Ignore Tier Suppression? (iTS)", isIts)
        .addField("Defensive Stance Exempt?", isIds)
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
