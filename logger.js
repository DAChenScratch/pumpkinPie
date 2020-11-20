const fs = require("fs");
const p = require("./params");


function readall (stream){

  return new Promise ((resolve, reject) => {
    const chunks = [];
    stream.on ('error', (error) => reject (error));
    stream.on ('data',  (chunk) => chunk && chunks.push (chunk));
    stream.on ('end',   ()      => resolve (Buffer.concat (chunks)));
  });
}

function readfile (filename){

  return readall (fs.createReadStream (filename));
}

let log = "";
let exLog = "############################# EXCEPTIONS\n";



const initGameLogs = () => {
  log = "";
  exLog = "############################# EXCEPTIONS\n";
}

async function logGame(chunk, id){
  let content = await readfile('index.html').catch ((e) => {})
  if (content);
  /*
  htmlTxt = content.toString()
  
  
  fs.writeFile(`logs/${id}.txt`, chunk, function (err){
    if (err) throw err;
    console.log("File created!")
  })
    
  fs.writeFile(`index.html`, `${htmlTxt}<br><a href="/logs/${id}.txt">Game ${id}</a>`, function (err) {
    if (err) throw err;
    console.log('HTML updated!');
    //console.log(htmlTxt)
  })
  */
}

// write logs for game to file and update the index of logs
const writeLogs = (data) => {
  if (p.CONSOLE_LOG) console.log(exLog);
  const gameId = data.game.id;
  // append game exeptions to end of log for easy viewing
  //gameDatata = ""
  //gameDatata = "\n" + log;
  console.log("Done")
  //console.log(typeof gameDatata)
  //logGame(gameDatata, gameId)
  //console.log(gameDatata)
}



// debug levels
const error = (message, turn = null) => {
  log += `ERROR: ${message}\n`
  if (p.CONSOLE_LOG) console.log(`ERROR: ${message}`);
  exLog += `EX ON TURN ${turn != null ? turn : "none"}: ${message}\n`
}
const status = message => {
  log += `${message}\n`
  if (p.CONSOLE_LOG) console.log(`${message}`);
}
const debug = message => {
  log += `DEBUG: ${message}\n`
  if (p.CONSOLE_LOG) console.log(`DEBUG: ${message}`);
}



module.exports = {
  initGameLogs: initGameLogs,
  writeLogs: writeLogs,
  error: error,
  status: status,
  debug: debug
}
/***********************************************************************

Hullo people viewing this how did you even get here?

**********************************************************************/