const express = require('express');
const app = express()
const port = 4000

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const session = require('express-session');
//const { strict } = require('node:assert');
//const SQLiteStore = require('connect-sqlite3')(session);

const config = {
    //store: new SQLiteStore,
    secret: 'secret key',
    resave: true,
    rolling: true,
    cookie: {
      maxAge: 1000 * 3600//ms
    },
    saveUninitialized: true
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  app.use(session(config))

app.set('views', './Views');
app.use(express.static(__dirname + '/Views'));
app.set('view engine', 'jade');
app.use('/abeilles', express.static('abeilles'));


const fs = require('fs');
var async = require("async");

function changeBeeColor(files,changes,color){
    for (let k=0;k<files.length;k++){
        let xmlFile = fs.readFileSync(files[k], 'utf8');
        for (let i=0;i<changes.length;i++){
            randomindex = Math.floor(Math.random() * 5)
            while (xmlFile.includes(changes[i])){
                xmlFile = xmlFile.replace(changes[i],color[i][randomindex])
            }
        }
        fs.writeFileSync("./abeilles/abeille_sortie" + k + ".svg",xmlFile)
    }
}

function randomAccessories(files,accessoiries,odds){
    for (let k=0;k<files.length;k++){
        let xmlFile = fs.readFileSync("./abeilles/abeille_sortie" + k + ".svg", 'utf8');
        for (let i=0;i<accessoiries.length;i++){
            random = Math.random()
            if (random>odds[k][i]){
                while (xmlFile.includes(accessoiries[k][i])){
                    xmlFile = xmlFile.replace(accessoiries[k][i],"none")
                }
            }
        }
        fs.writeFileSync("./abeilles/abeille_sortie_accessories" + k + ".svg",xmlFile)
    }
}

app.get("/generate",async(req,res)=> {
    let files = ["./abeilles/abeille_telecom.svg","./abeilles/abeille_info.svg","./abeilles/abeille_matmeca.svg","./abeilles/abeille_elec.svg"]
    let changes = ["BACKGROUND","WINGS","PEDICEL"]
    let color = [["DAF7A6","FFFFFF","74E38C","F16F6F","CEAEF6"],["FFEDED","59675E","B9930E","355C8C","5FBB52"],["FFFF00","FF00D1","00FF04","FF0000","00FF64"]]
    changeBeeColor(files,changes,color)
    let accessoiries = [["SIGNAL","SLEEP","DOLLAR"],["KEYBOARD","BINARY","CROWN"],["RULE","PEN","GLASSES","PI"],["FLASH","ROBOT","CANNONBALL"]]
    let odds = [[0.5,0.5,0.5],[0.5,0.5,0.5],[0.5,0.5,0.5,0.5],[0.5,0.5,0.5]]
    randomAccessories(files,accessoiries,odds)
    const data = {
      filiere:req.query.filiere,
    }
    res.render("projet",data)
});

app.post("/generate",async(req,res)=> {
  let files = ["./abeilles/abeille_telecom.svg","./abeilles/abeille_info.svg","./abeilles/abeille_matmeca.svg","./abeilles/abeille_elec.svg"]
  let changes = ["BACKGROUND","WINGS","PEDICEL"]
  let color = [["DAF7A6","FFFFFF","74E38C","F16F6F","CEAEF6"],["FFEDED","59675E","B9930E","355C8C","5FBB52"],["FFFF00","FF00D1","00FF04","FF0000","00FF64"]]
  changeBeeColor(files,changes,color)
  let accessoiries = [["SIGNAL","SLEEP","DOLLAR"],["KEYBOARD","BINARY","CROWN"],["RULE","PEN","GLASSES","PI"],["FLASH","ROBOT","CANNONBALL"]]
  let odds = [[0.5,0.5,0.5],[0.5,0.5,0.5],[0.5,0.5,0.5,0.5],[0.5,0.5,0.5]]
  randomAccessories(files,accessoiries,odds)
  const data = {
    filiere:req.query.filiere,
  }
  console.log(data.filiere)
  res.render("projet",data)
});


app.get("/",async(req,res)=> {
  const data = {
  }
  res.render("projet",data)
});


app.listen(port,() => {
    console.log("Listening on port ", port)
  })