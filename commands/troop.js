exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

  chan = message.guild.channels.find("name","tc-troops");
  if(message.channel.id != chan.id) {
    message.reply(`TCR Troops stat dump is restricted to ${chan}!`);
    return;
  }

  // Load TCR
  ndx = client.tcrTroops.worksheets.findIndex(n => n.title === "REF_Troops");
  client.tcrTroops.getRows(ndx+1, {offset: 3}, function (err, rows) {
//    console.log(`==> Keys: ${Object.keys(rows[0])}`);

    rows.forEach(rr => {
      console.log();

      // abbreviate troop types
      var type1 = rr.type.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');
      var type2 = "";
      if(rr._cre1l)
        type2 = " / " + rr.ndtype.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');

      // build output
      msg = `
Troop    : ${rr.troop||""}
Type     : ${type1}${type2}
Tier     : ${rr.tier||""}
Units    : ${rr.units||""}
Capacity : ${rr.capacity||""}
HP       : ${rr.hp||""}
ATK      : ${rr.atk||""}
DEF      : ${rr.def||""}
CRIT     : ${rr.crit||""}
ACC      : ${rr.acc||""}
DOD      : ${rr.dod||""}
Food     : ${rr.food||""}
Parts    : ${rr.parts||""}
Electric : ${rr.ele||""}
Gas      : ${rr.gas||""}
Cash     : ${rr.cash||""}
SM       : ${rr.sm||""}
Rep      : ${rr.rep||""}
UC       : ${rr.uc||""}
Power    : ${rr.power||""}
KE       : ${rr.ke||""}`;

//      console.log(message);
        message.channel.send(`\`\`\`\n${msg}\n\`\`\``);
    }); // forEach
  }); // getRows
}; // command

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "troop",
  category: "Reference",
  description: "Get troop stats",
  usage: "troop"
};
