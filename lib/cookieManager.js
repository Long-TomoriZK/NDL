const fs = require("fs");
const path = require("path");

const file = path.join(__dirname,"../data/appstate.json");

function load(){

  try{

    if(!fs.existsSync(file)) return null;

    const data = fs.readFileSync(file,"utf8");

    return JSON.parse(data);

  }catch{

    return null;

  }

}

function save(appState){

  fs.writeFileSync(file,JSON.stringify(appState,null,2));

}

module.exports = {
  load,
  save
};