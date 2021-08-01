const Discord = require("discord.js");
const client = new Discord.Client();
const canvas = require("discord-canvas");
const { Token, Prefix, LeaveMsg, WelMsg, WelImg, LeaveImg, WelChan, LeaveChan } = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const colors = require('colors');
var randomColor = require('randomcolor');
var color = randomColor();
client.on("ready", () => {
  client.user.setActivity(`Discord+ | ${Prefix}help`)
  console.log(`Bot : ${client.user.tag}\nBot Is Active Now!`)
  });

  const keepAlive = require('./alive.js')
  keepAlive();

  client.on("guildMemberAdd", async member => {
    let Channel = WelChan
    if (!Channel) return;
    
    if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
    if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
    
    let Msg = WelMsg.replace("<user>", `<@${member.user.id}>`) || `**<@${member.user.id}> just joined!**`
    let Welcomed = new canvas.Welcome();
    let Image = await Welcomed
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setGuildName(member.guild.name)
    .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
    .setMemberCount(member.guild.memberCount)
    .setBackground(WelImg || "https://i.redd.it/vda9rbt01en01.png")
    .toAttachment();
    
    let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
    return client.channels.cache.get(Channel).send(Msg, Attachment);
  });
  
  client.on("guildMemberRemove", async member => {
    let Channel = LeaveChan
    if (!Channel) return;
  
    if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
    if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
    
    let Msg = LeaveMsg.replace("<user>", member.user.tag) || `**${member.user.tag} just left the server :(**`
    let Leaved = new canvas.Goodbye();
    let Image = await Leaved
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setGuildName(member.guild.name)
    .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
    .setMemberCount(member.guild.memberCount)
    .setBackground(LeaveImg || "https://i.redd.it/vda9rbt01en01.png")
    .toAttachment();
    
    let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
    return client.channels.cache.get(Channel).send(Msg, Attachment);
  });

client.on("message", async message => {
 if (!message.content.startsWith(Prefix) || message.author.bot) return;
 const args = message.content.slice(Prefix.lenght).trim().split(/ +/g);
 const command = args.shift().toLowerCase();

 if(command === 'help' || (command === '?')) {
  const exampleEmbed = new Discord.MessageEmbed()
  const pf = (Prefix)
  .setTitle('Discord+ Commands\n')
    .setDescription(`
 
**Growtopia Commands**
${prefix}hostmaker (ip), ${pf}serverdata (ip), ${pf}renderworld,

**Moderations**
${pf}ban, ${pf}kick

**General**
${pf}userinfo, ${pf}avatar (mention), ${pf}math, ${pf}texttotxt

**Server Manages**
${pf}sinfo, ${pf}nick, ${pf}invite, ${pf}clearchat
`)
.setColor(color)
  message.channel.send(exampleEmbed)
  }
});
client.login(Token).catch(() => console.log(`Invalid Token Is Provided - Please Give Valid Token!`));
