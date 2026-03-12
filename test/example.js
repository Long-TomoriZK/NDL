const login = require("fca-unofficial");
const NDL = require("../index");

async function start(){

  const api = await NDL.start(login);

  api.listenMqtt((err,event)=>{

    if(err) return;

    if(event.body){
      console.log(event.body);
    }

  });

}

start();