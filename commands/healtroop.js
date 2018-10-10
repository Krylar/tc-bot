exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  if(args.length < 2 || args.length > 3) {
    message.reply(`Need 2-3 arguments!`);
    return;
  };
  let quantity = args[0];
  filter = "";
  if(args[2]) {
    let troopTier = args[1].match(/\d+/);
    let troopType = args[2]
      .replace(/^air$/i,"Airship")
      .replace(/^a$/i,"Airship")
      .replace(/^inf$/i,"Infantry")
      .replace(/^i$/i,"Infantry")
      .replace(/^w$/i,"Walker")
      .replace(/^walk$/i,"Walker")
      .replace(/^wlk$/i,"Walker");
    filter = `tier = ${troopTier} AND  type = "${troopType}"`;
  }
  else {
    let troopName = args[1];
    filter = `troop = "${troopName}"`;
  }
//  message.reply(`filter: ${filter}`);


  // Load TCR
  ndx = client.tcrTroops.worksheets.findIndex(n => n.title === "REF_Troops");
  client.tcrTroops.getRows(ndx+1, {query: filter}, function (err, rows) {
    console.log(rows.length);
    rows.forEach(rr => {
      totalUnits = quantity * rr.units;
      if(totalUnits >= 3501) modifier = 0.25;
      else if(totalUnits >= 1501) modifier = 0.22;
      else if(totalUnits >= 901) modifier = 0.19;
      else if(totalUnits >= 501) modifier = 0.17;
      else if(totalUnits >= 201) modifier = 0.15;
      else modifier = 0.10;

      msg = `Healing ${quantity}x ${rr.troop} (T${rr.tier} ${rr.type}):`;
      msg += `\nTotal Units: ${totalUnits} @ ${modifier*100}% of training costs`;
      if(rr.food) {
        n = Math.ceil(parseInt(rr.food.replace(/,/g,'')) * quantity * modifier);
        msg += '\nFood: ' + numberWithCommas(n);
      }
      if(rr.parts) {
        n = Math.ceil(parseInt(rr.parts.replace(/,/g,'')) * quantity * modifier);
        msg += '\nParts: ' + numberWithCommas(n);
      }
      if(rr.ele) {
        n = Math.ceil(parseInt(rr.ele.replace(/,/g,'')) * quantity * modifier);
        msg += '\nEle: ' + numberWithCommas(n);
      }
      if(rr.gas) {
        n = Math.ceil(parseInt(rr.gas.replace(/,/g,'')) * quantity * modifier);
        msg += '\nGas: ' + numberWithCommas(n);
      }
      if(rr.cash) {
        n = Math.ceil(parseInt(rr.cash.replace(/,/g,'')) * quantity * modifier);
        msg += '\nCash: ' + numberWithCommas(n);
      }
      if(rr.sm) {
        n = Math.ceil(parseInt(rr.sm.replace(/,/g,'')) * quantity * modifier);
        msg += '\nSM: ' + numberWithCommas(n);
      }
      if(rr.uc) {
        n = Math.ceil(parseInt(rr.uc.replace(/,/g,'')) * quantity * modifier);
        msg += '\nUC: ' + numberWithCommas(n);
      }
      if(rr.hc) {
        n = Math.ceil(parseInt(rr.hc.replace(/,/g,'')) * quantity * modifier);
        msg += '\nHC: ' + numberWithCommas(n);
      }

      message.reply(msg);
    }); // forEach

  }); // getRows
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ht","healtroops"],
  permLevel: "User"
};

exports.help = {
  name: "healtroop",
  category: "Calculators",
  description: "Calculate cost to heal troops",
  usage: "healtroop <#> <tier> <type>"
};
