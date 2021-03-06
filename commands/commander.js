// Load up the discord.js library
const Discord = require("discord.js");
//const RichEmbed = require('discord.js');

exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

  let com = args[0];
  if (args.length >>> 1) {
    com = args.join(" ");
    //    message.channel.send(troop);
    //    return;
  }

  var targetChannel = message.guild.channels.find(
    ch => ch.name == "tc-commanders"
  );

  if (message.channel != targetChannel) {
    message.reply(`Invalid channel! Please run in ${targetChannel}!`);
    return;
  }

  /*  // Clear channel
  let fetched;
  fetched = await targetChannel.fetchMessages(100);
//    console.log(`Fetched ${fetched.size} messages.`);
  fetched.forEach(f => {
//      console.log("deleting messasge...");
    f.delete();
  });
  if(fetched.size > 1)
    return;
//    console.log("done!");
//return;
*/
  var type = "";
  var msg = "";

  // Load TCR
  var ndx = client.tcrTroops.worksheets.findIndex(
    n => n.title === "Commander Info"
  );
  //  client.tcrTroops.getRows(ndx+1, {query: `name = "${com}"`}, function (err, rows) {
  client.tcrTroops.getRows(ndx + 1, { offset: 1 }, function(err, rows) {
    console.log(rows.length);

    console.log("Keys: " + Object.keys(rows[0]));

    rows.forEach(rr => {
      console.log(`==> Commander: ${rr.name}\n\tImgSrc: ${rr.imgsrc}`);

      type = rr.triggertype3;
      var event10chance = "";
      var color;
      // troop type color
      if (type == "Infantry")
        //        color = 0x3C700C; // dark green
        color = 0x489a1a;
      // light green
      else if (type == "Walker")
        //        color = 0x216894; // dark blue
        color = 0x399fc7;
      // light blue
      else if (type == "Airship")
        //        color = 0x9B2928; // dark red
        color = 0xec5b58;
      // light red
      else color = 0;
      if (rr.r10event) event10chance = " (" + rr.r10event + ")";

      //console.log(`${rr.description1}`);
      
      msg = new Discord.RichEmbed()

        //.setAuthor(`${rr.name || ""} (${rr.class || ""})`)
        .setTitle(`${rr.name || ""} (${rr.class || ""})`)
        .setDescription(rr.lore)
        //        .setTitle(`${rr.name||""} (${rr.class||""})`)
        .setThumbnail(rr.imgsrc || "https://docs.google.com/uc?export=download&confirm=no_antivirus&id=1YYkvsz_VrmfBPGkQ7md72YAV2vh7pbMb")
        .setColor(color)
        //        .addField(`${rr.skill1}`,`**Lv. 1**\n__**${rr.triggertype1}**__ ${rr.description1}`)
        //        .addField(`${rr.skill2}`,`**Lv. 1**\n__**${rr.triggertype2}**__ ${rr.description2}`)
        //        .addField(`${rr.skill3}`,`**Lv. 1**\n__**${rr.triggertype3}**__ ${rr.description3}`)
        .addField(
          `1 - ${rr.skill1} <${rr.triggertype1 || ""}> (Lv.1)`,
          `${rr.description1 || "_"}`
        )
        .addField(
          `2 - ${rr.skill2} <${rr.triggertype2 || ""}> (Lv.1)`,
          `${rr.description2 || "_"}`
        )
        .addField(
          `3 - ${rr.skill3} <${rr.triggertype3 || ""}> (Lv.1)`,
          `${rr.description3 || "_"}`
        )
        .addField(`How to Obtain:`, `${rr.howtoobtain + event10chance || "?"}`);
      //      console.log(msg);
      message.channel.send(msg);
    }); // forEach

    //    console.log("Com Keys: " + Object.keys(rows[0]));
    //  console.log(msg);
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
