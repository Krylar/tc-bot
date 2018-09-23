exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

  if(args.length < 3 || args.length > 3) {
    message.channel.send(`Need exactly 3 arguments!`);
    return;
  };
  let skillLevel = args[0];
  let leadership = args[1];
  let targetTier = args[2];
  var numKills = 0;
  var type = "";
  var msg = "";

  // Load TCR
  ndx = client.tcrTroops.worksheets.findIndex(n => n.title === "REF_Troops");
  client.tcrTroops.getRows(ndx+1, {query: `_cokwr = ${targetTier}`}, function (err, rows) {
//    console.log(rows.length);
    rows.forEach(rr => {
//      console.log(rr._cn6ca);
      numKills = Math.floor(0.005 * leadership * skillLevel / rr._chk2m);
//      console.log(`numKills: ${numKills}`);
      type = rr._cpzh4.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');
//      console.log(`type: ${type}`);
      msg += `\n- ${numKills}x ${rr._cn6ca} \(T${targetTier} ${type}\)`;
//      console.log(msg);
    }); // forEach
//  console.log(msg);

  message.reply(`${leadership} leadership with level ${skillLevel} iTS skill can kill:${msg}`);
  }); // getRows
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "its",
  category: "Calculators",
  description: "How many troops can I kill?",
  usage: "its <skill level> <leadership> <target tier>"
};
