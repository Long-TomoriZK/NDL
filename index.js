const speed = require("./lib/speedOptimizer");
const loginManager = require("./lib/loginManager");
const cookieManager = require("./lib/cookieManager");

async function start(loginFunc){

  await speed.waitInternet();

  const cookie = cookieManager.load();

  const api = await loginManager(loginFunc,cookie);  //login

  speed.heartbeat(api);

  return api;

}

module.exports = {
  start
};