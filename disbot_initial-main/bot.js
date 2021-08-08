require('dotenv').config();
const fetch= require("node-fetch")

const { Client, MessageFlags }=require('discord.js')

const client =new  Client();

const PREFIX="$"




// fetch quotes from an api
function getQuote(){
    return fetch("https://zenquotes.io/api/random")
  
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      return data[0]["q"]+" _"+data[0]["a"] //quote and then author
    })
  }

// bot ready
client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`)
});


// BOT ACTIVITIES( MESSAGE REPLY)
client.on('message', async(msg)=>{

      // as bot don't have to respond to it's own messages 
    if(msg.author.bot) return;

     //to check the prefx
    if(msg.content.startsWith(PREFIX)){ 
        const [CMD_NAME,...args] =msg.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)

          // normal check for a command
        if(CMD_NAME==='depressed'){
            msg.channel.send(" hang in there")
        }

         //  bot sending back a remote file to server 
        if(CMD_NAME==='isaak'){
            message.channel.send({
                files: ['https://deadspace.fandom.com/wiki/Isaac_Clarke']
              })
                .then(console.log)
                .catch(console.error);

            }    

          // bot sending back a local file to server  
        if(CMD_NAME==='sadman'){
            message.channel.send({
                files: [{
                  attachment: 'E:/exercise_lab_online/sadman-donkey.jpg',
                  name: 'sadman-donkey.jpg'
                }]
              })
                .then(console.log)
                .catch(console.error);

        }
         //for returning quotes
        if(CMD_NAME==="inspire"){
            getQuote().then(quote=>msg.channel.send(quote))
          }
 

    } 

   
    
})

client.login("ODcxMzAwMzU0NjQ0NTA4Njky.YQZTsA.gM7bh4YsJn21ZKbw3La1x4qa6Gs");
