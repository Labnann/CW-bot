 require('dotenv').config();
 const environment=require('./.env')

 


const fetch= require("node-fetch")
const { Client, MessageFlags }=require('discord.js');
const client =new  Client();


//PREFFIX
const PREFIX="$"


//fetch weather data from an api
function getWeather(msg){
  
  const splitted_data= msg.content.split(/ +/g)
  console.log(splitted_data);
   fetch("http://127.0.0.1:8001/getWeather/hourly",
  {
    method:'post',
    body: JSON.stringify({city:splitted_data[1]}),
    headers: { 'Accept':'application/json','content-type': 'application/json' }

  }).then(res=>{

    return res.json()

   })


     // this is the actual section where discord bot send back the reply to the server
    .then(data=>{        
      console.log(data)
  
    const bot_message= "\`\`\`\n"+"Temperature  : "+data.currently.temperature+" °C"+"\n"+
                        "Air-pressure  : "+data.currently.pressure+" mbar"+"\n"+
                        "Windspeed  : "+data.currently.windSpeed+" mph"+"\n"+
                        "Humidity  : "+data.currently.humidity+"\n"+
                        "Skyview  : "+data.currently.icon+
                        "\`\`\`\n"

    
    msg.channel.send((bot_message))
    
    //msg.channel.send(JSON.stringify(data))


    })
 
  }

//fetch quotes from api
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

         //for returning quotes
        if(CMD_NAME==="inspire"){
            getQuote().then(quote=>msg.channel.send(quote))
          }


        
        //weather data show
        if(CMD_NAME==="weather"){
          console.log("weather called")
          getWeather(msg)
          
        }
 

    } 

   
    
})

client.login(environment.DISCORD);
