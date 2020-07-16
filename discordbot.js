const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Connected as ' + client.user.tag);
    client.user.setActivity("Youtube", {type: "WATCHING"})

    client.guilds.cache.forEach(guild => {
        console.log(guild.name);
        const channels = [];

        guild.channels.cache.forEach(
            ({name, type, id}, i) => channels.push({name, type, id})
        )
        
        const lastChannel = client.channels.cache.get(channels.pop().id);
        lastChannel.send('Hello World!'); 
    });
}) 

// Bot reply and react to any direct message
client.on('message', receivedMsg => {
    if(receivedMsg.author == client.user) return;
    receivedMsg.channel.send('Message received '+ receivedMsg.author.toString() +' :' + receivedMsg.content);

    receivedMsg.react("😁"); 
    // if custom react exists
    receivedMsg.guild.emojis.forEach(customEmoji => {
        // console.log(`${customEmoji.name} ${customEmoji.id}`) ===> for conditional selection if you wish
        receivedMsg.react(customEmoji);
    })
})


client.login(env.discord_login_key)