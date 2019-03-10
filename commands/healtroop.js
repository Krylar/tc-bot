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
    filter = `tier = ${troopTier} AND type = "${troopType}" AND npc = "N"`;
  }
  else {
    let troopName = args[1];
    filter = `troop = "${troopName}`;
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

      msg = `\`\`\`\nHealing ${quantity}x ${rr.troop} (T${rr.tier} ${rr.type}):`;
      msg += '\nTotal Units: '
          + numberWithCommas(totalUnits)
          + ` @ ${modifier*100}% of training costs`;
      if(rr.food) {
        n = Math.ceil(parseInt(rr.food.replace(/,/g,'')) * quantity * modifier);
        msg += '\nFood: ' + numberWithCommas(n);
      }
      if(rr.parts) {
        n = Math.ceil(parseInt(rr.parts.replace(/,/g,'')) * quantity * modifier);
        msg += '\nParts: ' + numberWithCommas(n);
      }
      if(parseInt(rr.ele) > 0) {
        n = Math.ceil(parseInt(rr.ele.replace(/,/g,'')) * quantity * modifier);
        msg += '\nEle: ' + numberWithCommas(n);
      }
      if(parseInt(rr.gas) > 0) {
        n = Math.ceil(parseInt(rr.gas.replace(/,/g,'')) * quantity * modifier);
        msg += '\nGas: ' + numberWithCommas(n);
      }
      if(parseInt(rr.cash) > 0) {
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

      // Cost to heal with Meta Crystals
      n = Math.ceil(parseInt(rr.mchealcost.replace(/,/g,'')) * quantity);
      msg += "\n\n==> MC Heal: " + numberWithCommas(n);

      // Hull dmg incurred from massacred troops
      n = Math.ceil(parseInt(rr.arkhp.replace(/,/g,'')) * quantity);
      msg += "\nMassacre Dmg: " + numberWithCommas(n);

      // power
      n = Math.ceil(parseInt(rr.power.replace(/,/g,'')) * quantity);
      msg += "\nPower: " + numberWithCommas(n);



      // healing optimization advisor
      if(rr.units < 201) {optModifier = 0.10; optUnits = 200;}
      else if(rr.units < 501) {optModifier = 0.15; optUnits = 500;}
      else if(rr.units < 901) {optModifier = 0.17; optUnits = 900;}
      else if(rr.units < 1501) {optModifier = 0.19; optUnits = 1500;}
      else if(rr.units < 3501) {optModifier = 0.22; optUnits = 3500;}
      else {optModifier = 0.25; optUnits = -1;};

      if(optModifier < modifier) {

//        msg += '\n\nrr.units: ' + rr.units;
//        msg += '\noptModifier: ' + optModifier;
//        msg += '\noptUnits: ' + optUnits;
        optQty = Math.floor(optUnits / rr.units);
//        msg += '\noptQty: ' + optQty;

        msg += `\n\nTIP: Heal ${optQty}x troop`;
        if(optQty > 1) msg += 's';
        msg += ` at a time to heal at ${optModifier*100}% of training costs:`;
        if(rr.food) {
          n = Math.ceil(parseInt(rr.food.replace(/,/g,'')) * quantity * optModifier);
          msg += '\nFood: ' + numberWithCommas(n);
        }
        if(rr.parts) {
          n = Math.ceil(parseInt(rr.parts.replace(/,/g,'')) * quantity * optModifier);
          msg += '\nParts: ' + numberWithCommas(n);
        }
        if(parseInt(rr.ele) > 0) {
          n = Math.ceil(parseInt(rr.ele.replace(/,/g,'')) * quantity * optModifier);
          msg += '\nEle: ' + numberWithCommas(n);
        }
        if(parseInt(rr.gas) > 0) {
          n = Math.ceil(parseInt(rr.gas.replace(/,/g,'')) * quantity * optModifier);
          msg += '\nGas: ' + numberWithCommas(n);
        }
        if(parseInt(rr.cash) > 0) {
          n = Math.ceil(parseInt(rr.cash.replace(/,/g,'')) * quantity * optModifier);
          msg += '\nCash: ' + numberWithCommas(n);
        }
        if(rr.sm) {
          n = Math.ceil(parseInt(rr.sm.replace(/,/g,'')) * quantity * optModifier);
          msg += '\nSM: ' + numberWithCommas(n);
        }
        if(rr.uc) {
          n = Math.ceil(parseInt(rr.uc.replace(/,/g,'')) * quantity * optModifier);
          msg += '\nUC: ' + numberWithCommas(n);
        }
        if(rr.hc) {
          n = Math.ceil(parseInt(rr.hc.replace(/,/g,'')) * quantity * optModifier);
          msg += '\nHC: ' + numberWithCommas(n);
        }
      }



      msg += "\n```"; // end code segment markdown
      message.reply(msg);
    }); // forEach

  }); // getRows
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ht","healtroops","troopheal"],
  permLevel: "User"
};

exports.help = {
  name: "healtroop",
  category: "Calculators",
  description: "Calculate cost to heal troops",
  usage: "healtroop <#> <tier> <type>"
};
