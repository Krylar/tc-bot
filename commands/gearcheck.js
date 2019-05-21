exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

  if(args.length < 2 || args.length > 2) {
    message.channel.send("`Invalid syntax! See help below:`");
    client.commands.get("help").run(client, message, ["gearcheck"], level);
    return;
  };
  let statvalue = args[0];
  let gearLevel = args[1];
  let base = 1.0 * statvalue / (1 + gearLevel / 10);
  base = base.toFixed(2);
  let base10 = base * 2;
  base10 = base10.toFixed(2);
  let base20 = base * 3;
  base20 = base20.toFixed(2);
  let base30 = base * 4;
  base30 = base30.toFixed(2);
  let base40 = base * 5;
  base40 = base40.toFixed(2);
  let base50 = base * 6;
  base50 = base50.toFixed(2);

//  base = base.toFixed(2);
//  message.channel.send(`base = ${ba}`);
  message.channel.send(`${message.author} Current: ${statvalue}% @ +${gearLevel}
\`\`\`asciidoc
Base stat:: ${base}%
  @ +10:: ${base10}%
  @ +20:: ${base20}%
  @ +30:: ${base30}%
  @ +40:: ${base40}%
  @ +50:: ${base50}%
\`\`\``);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["gc"],
  permLevel: "User"
};

exports.help = {
  name: "gearcheck",
  category: "Calculators",
  description: "Calculate stat at base and +10/20/30/40/50. (gc)",
  usage: "gearcheck <stat> <level>"
};
