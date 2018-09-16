exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

 /* if(args.length <<< 1) {
    message.channel.send(`Missing argument!`)
  }
*/
  let troop = args[0];
  if(args.length >>> 1) {
    troop = args.join(" ")
//    message.channel.send(troop);
//    return;
  };

  // get troop stats from TCR
  var request = require("request")

  var url = "http://arkofwarguide.com/" + client.config.tckey + "/gen/" + troop;

  var err = 0;

  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (!body.trpname) {
      const cmd = client.commands.get("help");
      message.channel.send(`Invalid troop name.`, {code:""});
      cmd.run(client, message, ['troop'], level);
      err = 1;
      return;
    }

    if (!error && response.statusCode === 200) {
      console.log(body); // Print the json response
      body.trpname = body.trpname.trim();
//      message.channel.send(`${body.trpname}`);
/*      let title = '='.repeat(19 - body.trpname.trim().length / 2)
        + ' ' + body.trpname.trim() + ' ' + '='.repeat(40 - (19 - body.trpname.trim().length / 2) - body.trpname.trim().length - 2);
      troopType = troopType.substring(0,9);
      let data1 = '    Tier | ' + body.tier.trim() + ' '.repeat(10 - body.tier.trim().length) + '    Type | ' + troopType;
      let data1 = '    Tier | ' + body.tier.trim() + ' '.repeat(10 - body.tier.trim().length) + '    Type | ' + troopType;
      message.channel.send(`${title}\n${data1}`, {code:"asciidoc"});
*/
      body.trptype = body.trptype.replace('Infantry','INF');
      body.trptype = body.trptype.replace('Walker','WLK');
      body.trptype = body.trptype.replace('Airship','AIR');

      body.sectype = body.sectype.replace('Infantry','INF');
      body.sectype = body.sectype.replace('Walker','WLK');
      body.sectype = body.sectype.replace('Airship','AIR');

//      let secondaryRss = 

      let secType = "";
      if(body.sectype) {
        secType = " / " + body.sectype.trim();
      }
      if (err===0)
        message.channel.send(`${message.author}
\`\`\`
Troop    : ${body.trpname.trim()}
Type     : ${body.trptype.trim()}${secType}
Tier     : ${body.tier.trim()}
Units    : ${body.trpunits.trim()}
Capacity : ${body.capacity.trim()}
HP       : ${body.trphp.trim()}
ATK      : ${body.atk.trim()}
DEF      : ${body.def.trim()}
CRIT     : ${body.critpercent.trim()}
ACC      : ${body.accpercent.trim()}
DOD      : ${body.dodpercent.trim()}
Food     : ${body.food.trim()}
Parts    : ${body.parts.trim()}
Electric : ${body.ele.trim()}
Gas      : ${body.gas.trim()}
Cash     : ${body.cash.trim()}
SM       : ${body.sm.trim()}
Rep      : ${body.rep.trim()}
UC       : ${body.ic.trim()}
Power    : ${body.eventpower.trim()}
KE       : ${body.killevent.trim()}
\`\`\``);
    }
  })

//  message.channel.send(`base = ${ba}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "troop",
  category: "Reference",
  description: "Get troop stats",
  usage: "troop <troop name>"
};
