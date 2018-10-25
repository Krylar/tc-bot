exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

  chan = message.guild.channels.find(c => c.name === "tc-troops");
  if(message.channel.id != chan.id) {
    message.reply(`TCR Troops stat dump is restricted to ${chan}!`);
    return;
  }

  // Load TCR
  ndx = client.tcrTroops.worksheets.findIndex(n => n.title === "REF_Troops");
  client.tcrTroops.getRows(ndx+1, {offset: 40}, function (err, rows) {
//    console.log(`==> Keys: ${Object.keys(rows[0])}`);

    rows.forEach(rr => {
//      console.log();

      // abbreviate troop types
      var type1 = rr.type.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');
      var type2 = "";
      if(rr.type2)
        type2 = " / " + rr.type2.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');

      // build output
      msg = `
Troop    : ${rr.troop||""}
Type     : ${type1}${type2}
Tier     : ${rr.tier||""}
Units    : ${rr.units||""}
Capacity : ${rr.capacity.trim()||""}
HP       : ${rr.hp.trim()||""}
ATK      : ${rr.atk.trim()||""}
DEF      : ${rr.def.trim()||""}
CRIT     : ${rr.crit.trim()||""}
ACC      : ${rr.acc.trim()||""}
DOD      : ${rr.dod.trim()||""}
Food     : ${rr.food||""}
Parts    : ${rr.parts||""}`
      if(rr.ele) msg += `\nElectric : ${rr.ele||""}`
      if(rr.gas) msg += `\nGas      : ${rr.gas||""}`
      if(rr.cash) msg += `\nCash     : ${rr.cash||""}`
      if(rr.sm) msg += `\nSM       : ${rr.sm||""}`
      if(rr.rep) msg += `\nRep      : ${rr.rep||""}`
      if(rr.uc) msg += `\nUC       : ${rr.uc||""}`
      if(rr.hc) msg += `\nHC       : ${rr.hc||""}`
      msg += `\nPower    : ${rr.power||""}
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
