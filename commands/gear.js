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

  if (message.channel.name != "tc-gear") {
    message.reply(`Invalid channel! Please run in #tc-gear!`);
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
    n => n.title === "Gear"
  );
  //  client.tcrTroops.getRows(ndx+1, {query: `name = "${com}"`}, function (err, rows) {
  client.tcrTroops.getRows(ndx + 1, { offset: 1, orderby: 'col1' }, function(err, rows) {
    console.log(rows.length);

    console.log("Keys: " + Object.keys(rows[0]));

    rows.forEach(async rr => {
      console.log(`==> Gear: ${rr.name}\n\tImgSrc: ${rr.imagesource}`);

      var color;
      // gear rarity color
      if (rr.rarity == "Legendary")
        color = 0xD50FD8;
      else if (rr.rarity == "Epic")
        color = 0xF7BF12;
      else if (rr.rarity == "Rare")
        color = 0x31E6DD;
      else if (rr.rarity == "Common")
        color = 0x7EE637;
      else if (rr.rarity == "Bargain")
        color = 0xCDCBCE;
      else color = 0;

      //console.log(`${rr.description1}`);
      
      //if (rr.name == "Gift of the Valkyrie") {
//      if (rr.name == "Thalmus Booster.3") {
      

      var gearStats = `${rr.filter} ${rr.stat || ""} ${rr.valuemin >= 0  ? "+" : ""}${rr.valuemin || "_"}% ${rr.valuemax != rr.valuemin ? " ~ "+(rr.valuemax >= 0 ? "+" : "")+rr.valuemax+"%" : ""}`
      if (rr.filter_2)
        gearStats += `\n${rr.filter_2} ${rr.stat_2 || ""} ${rr.valuemin_2 >= 0  ? "+" : ""}${rr.valuemin_2 || "_"}% ${rr.valuemax_2 != rr.valuemin_2 ? " ~ "+(rr.valuemax_2 >= 0 ? "+" : "")+rr.valuemax_2+"%" : ""}`
      if (rr.filter_3)
        gearStats += `\n${rr.filter_3} ${rr.stat_3 || ""} ${rr.valuemin_3 >= 0  ? "+" : ""}${rr.valuemin_3 || "_"}% ${rr.valuemax_3 != rr.valuemin_3 ? " ~ "+(rr.valuemax_3 >= 0 ? "+" : "")+rr.valuemax_3+"%" : ""}`

      msg = new Discord.RichEmbed()

//        .setAuthor(`${rr.type || ""}`)
//        .setTitle(`**${rr.name}**\n*${rr.rarity}*`)
        .setTitle(`**${rr.name}**`)
        .setThumbnail(rr.imagesource || "")
        .setColor(color)
        .addField(
          `${rr.rarity}\n${rr.type}`, `${gearStats}`
        )
      //      console.log(msg);
      message.channel.send(msg);
//    }
    }); // forEach

    //    console.log("Com Keys: " + Object.keys(rows[0]));
    //  console.log(msg);
  }); // getRows
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "gear",
  category: "TCR Info",
  description: "Gear Info",
  usage: "gear"
};
