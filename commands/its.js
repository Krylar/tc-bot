exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  if(args.length < 3 || args.length > 4) {
    message.channel.send("`Invalid syntax! See help below:`");
    client.commands.get("help").run(client, message, ["its"], level);
    return;
  };
  let skillLevel = args[0];
  let leadership = args[1];
  let targetTier = args[2];
  let tdr = args[3] || 0;
  var numKills = 0;
  var type = "";
  var msg = "";

  if(skillLevel > 60) {
    message.reply(`You entered skill level ${skillLevel}. Was that intended? Because it's not possible, but it would be REALLY nice if it were...`);
  };
  // Load TCR
  ndx = client.tcrTroops.worksheets.findIndex(n => n.title === "REF_Troops");
  client.tcrTroops.getRows(ndx+1, {query: `tier = ${targetTier}`}, function (err, rows) {
//    console.log(rows.length);
    rows.forEach(rr => {
//      console.log(rr._cn6ca);
      numKills = Math.floor(0.005 * leadership * skillLevel * (100 - tdr)/100 / (rr.units||-1));
//      console.log(`numKills: ${numKills}`);
      type = rr.type.replace('Infantry','INF').replace('Walker','WLK').replace('Airship','AIR');
//      console.log(`type: ${type}`);
      msg += `\n- ${numKills<0 ? "??" : numberWithCommas(numKills)}x ${rr.troop} \(T${targetTier} ${type}\)`;
//      console.log(msg);
    }); // forEach
//  console.log(msg);

  message.reply(`${numberWithCommas(leadership)} leadership with level ${skillLevel} iTS skill vs ${tdr}% TDR can kill:${msg}`);
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
  usage: "its <skill level> <leadership> <target tier> <total damage reduction>"
};
