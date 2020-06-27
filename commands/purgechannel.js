// Load up the discord.js library
const Discord = require("discord.js");
//const RichEmbed = require('discord.js');

exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  //message.reply(`Your permission level is: ${level} - ${friendly}`);

  if (args[0] != "theorycrafter") return;

  var targetChannel = message.channel;
  if (targetChannel.name.substring(0, 3) != "tc-") {
    message.reply("Invalid channel! Please run in a Theorycrafters channel.");
    return;
  }

  // Clear channel
  let fetched;
/*  fetched = await targetChannel.fetchMessages({ limit: 100 });
  message.channel.bulkDelete(fetched, true)
    .catch(error => message.channel.send(`Error: ${error}`));
*/
 fetched = await targetChannel.fetchMessages({ limit: 100 });
  fetched.forEach(f => {
    f.delete()
      .catch(error => message.channel.send(`Error: ${error}`));
  });


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pc"],
  permLevel: "Administrator"
};

exports.help = {
  name: "purgechannel",
  category: "Admin",
  description: "Delete all messages in current channel",
  usage: "purgechannel theorycrafter"
};
