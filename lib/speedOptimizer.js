const dns = require("dns");
const https = require("https");

const cache = new Map();

const agent = new https.Agent({
  keepAlive:true,
  maxSockets:50
});

const userAgents = [
"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
"Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36"
];

function getUA(){
  return userAgents[Math.floor(Math.random()*userAgents.length)];
}

function dnsLookup(host){

  if(cache.has(host)) return Promise.resolve(cache.get(host));

  return new Promise((resolve,reject)=>{

    dns.lookup(host,(err,addr)=>{

      if(err) return reject(err);

      cache.set(host,addr);

      setTimeout(()=>{
        cache.delete(host);
      },60000);

      resolve(addr);

    });

  });

}

async function waitInternet(){

  let ok=false;

  while(!ok){

    try{

      await dnsLookup("facebook.com");
      ok=true;

    }catch{

      console.log("[NDL] waiting network...");
      await new Promise(r=>setTimeout(r,3000));

    }

  }

}

function heartbeat(api){

  setInterval(()=>{

    try{
      api.getCurrentUserID();
    }catch{}

  },300000);

}

module.exports = {
  agent,
  getUA,
  waitInternet,
  heartbeat
};