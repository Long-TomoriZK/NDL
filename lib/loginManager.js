const speed = require("./speedOptimizer");

async function retry(fn,max=5){

  let delay=1000;

  for(let i=0;i<max;i++){

    try{
      return await fn();
    }catch(e){

      if(i===max-1) throw e;

      await new Promise(r=>setTimeout(r,delay));
      delay*=2;

    }

  }

}

async function loginManager(loginFunc,cookie){

  const api = await retry(()=>loginFunc({

    appState:cookie,
    userAgent:speed.getUA()

  }));

  return api;

}

module.exports = loginManager;