exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

 /* if(args.length <<< 1) {
    message.channel.send(`Missing argument!`)
  }
*/
  chan = message.guild.channels.find("name","tc-troops");
  message.reply(`tctroop is no longer interactive. See ${chan}`);

if(level >= 9) {
  let troop = args[0];
  if(args.length >>> 1) {
    troop = args.join(" ")
//    message.channel.send(troop);
//    return;
  };

  // get troop stats from TCR
  // Get all of the rows from the spreadsheet.
  client.tcrTroops.getRows(9, {offset: 3}, function (err, rows) {
    rows.forEach(rr => {
      console.log();

      // abbreviate troop types
      var type1 = rr._cpzh4.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');
      var type2 = "";
      if(rr._cre1l)
        type2 = " / " + rr._cre1l.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');
      // 2nd type?
//      type2 = "";
//      if(rr._cre1l)
//        type2 = " / " + rr._cre1l;

      // build output
      msg = `
Troop    : ${rr._cn6ca||""}
Type     : ${type1}${type2}
Tier     : ${rr._cokwr||""}
Units    : ${rr._chk2m||""}
Capacity : ${rr._ciyn3||""}
HP       : ${rr._ckd7g||""}
ATK      : ${rr._clrrx||""}
DEF      : ${rr._cyevm||""}
CRIT     : ${rr._cztg3||""}
ACC      : ${rr._d180g||""}
DOD      : ${rr._d2mkx||""}
Food     : ${rr._cx0b9||""}
Parts    : ${rr._d9ney||""}
Electric : ${rr._db1zf||""}
Gas      : ${rr._dcgjs||""}
Cash     : ${rr._ddv49||""}
SM       : ${rr._d415a||""}
Rep      : ${rr._d5fpr||""}
UC       : ${rr._d6ua4||""}
Power    : ${rr._dw4je||""}
KE       : ${rr._dxj3v||""}`;

//      console.log(message);
        message.channel.send(`\`\`\`\n${msg}\n\`\`\``);
    }); // forEach
  }); // getRows
//});

}

//  message.channel.send(`base = ${ba}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Admin"
};

exports.help = {
  name: "troop",
  category: "Reference",
  description: "Get troop stats",
  usage: "troop"
};
