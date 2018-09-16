exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
//  message.reply(`Your permission level is: ${level} - ${friendly}`);

  // get server
  let g = message.guild;
//  message.channel.send(`Server: ${message.guild.name}`);

  // get #tc-bot-feedback
  let tcFeedback = g.channels.find("name", "tc-bot-feedback");
//    .then(updated => message.channel.send(`Channel (Bulletin): ${mBulletin}`));
//  message.channel.send(`Merge bulletin channel: ${mBulletin.toString()}`);

  tcFeedback.send(`${message.author}: ${args.join(" ")}`);
  message.channel.send("Feedback submitted to @Theorycrafter group. Thank you!");

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "feedback",
  category: "Contribute!",
  description: "Send feedback/suggestion/comment to @Theorycrafter group",
  usage: "feedback <message>"
};
