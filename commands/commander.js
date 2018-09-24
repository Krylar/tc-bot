// Load up the discord.js library
const Discord = require("discord.js");
//const RichEmbed = require('discord.js');

exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

  if(args.length != 1) {
    message.channel.send(`Need exactly 1 argument!`);
    return;
  };
  let com = args[0];
  var type = "";
  var msg = "";

  // Load TCR
  ndx = client.tcrTroops.worksheets.findIndex(n => n.title === "REF_Commanders");
  client.tcrTroops.getRows(ndx+1, {query: `name = ${com}`}, function (err, rows) {
//    console.log(rows.length);
    rows.forEach(rr => {
//      console.log(rr._cn6ca);
      type = rr.triggertype3.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');
//      console.log(`type: ${type}`);
//      msg += `\n- ${numKills}x ${rr._cn6ca} \(T${targetTier} ${type}\)`;
      msg = new Discord.RichEmbed()
        .setTitle(`${rr.name} (${rr.class})`)
        .addField(`[1] ${rr.skill1} <${rr.triggertype1}>`,`${rr.description1}`)
        .addField(`[2] ${rr.skill2} <${rr.triggertype2}>`,`${rr.description2}`)
        .addField(`[3] ${rr.skill3} <${rr.triggertype3}>`,`${rr.description3}`)
        .addField(`How to Obtain:`, `${rr.howtoobtain}`)
        .setThumbnail(rr.imgsrc)
        ;
//      console.log(msg);
    }); // forEach

    console.log("Com Keys: " + Object.keys(rows[0]));
//  console.log(msg);

    message.reply(msg);
  }); // getRows
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["com"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "commander",
  category: "TCR Info",
  description: "Commander info",
  usage: "commander <commander name>"
};
