const fs = require('fs');
var async = require("async");

function changeBeeColor(files,changes,color){
    let caracteristics ={
        telecom: [],
        info: [],
        matmeca: [],
        elec: [],
    }
    for (let k=0;k<files.length;k++){
        let xmlFile = fs.readFileSync(files[k], 'utf8');
        for (let i=0;i<changes.length;i++){
            randomindex = Math.floor(Math.random() * 5)
            while (xmlFile.includes(changes[i])){
                xmlFile = xmlFile.replace(changes[i],color[i][randomindex])
            }
            if (k==0){
                caracteristics.telecom.push(color[i][randomindex])
            }
            if (k==1){
                caracteristics.info.push(color[i][randomindex])
            }
            if (k==2){
                caracteristics.matmeca.push(color[i][randomindex])
            }
            if (k==3){
                caracteristics.elec.push(color[i][randomindex])
            }
        }
        fs.writeFileSync("./abeilles/abeille_sortie" + k + ".svg",xmlFile)  
    }
    return caracteristics
}

function randomAccessories(files,accessoiries,odds){
    let listaccesories = [[],[],[],[]]
    for (let k=0;k<files.length;k++){
        let xmlFile = fs.readFileSync("./abeilles/abeille_sortie" + k + ".svg", 'utf8');
        for (let i=0;i<accessoiries[k].length;i++){
            random = Math.random()
            if (random>odds[k][i]){
                listaccesories[k].push(accessoiries[k][i])
                while (xmlFile.includes(accessoiries[k][i])){
                    xmlFile = xmlFile.replace(accessoiries[k][i],"none")
                }
            }
        }
        fs.writeFileSync("./abeilles/abeille_sortie_accessories" + k + ".svg",xmlFile)
    }
    return listaccesories
}

let files = ["./abeilles/abeille_telecom.svg","./abeilles/abeille_info.svg","./abeilles/abeille_matmeca.svg","./abeilles/abeille_elec.svg"]
let changes = ["BACKGROUND","WINGS","PEDICEL"]
let color = [["DAF7A6","FFFFFF","74E38C","F16F6F","CEAEF6"],["FFEDED","59675E","B9930E","355C8C","5FBB52"],["FFFF00","FF00D1","00FF04","FF0000","00FF64"]]
console.log(changeBeeColor(files,changes,color))
let accessoiries = [["SIGNAL","SLEEP","DOLLAR"],["KEYBOARD","BINARY","CROWN"],["RULE","PEN","GLASSES","PI"],["FLASH","ROBOT","CANNONBALL"]]
let odds = [[0.5,0.5,0.5],[0.5,0.5,0.5],[0.5,0.5,0.5,0.5],[0.5,0.5,0.5]]
console.log(randomAccessories(files,accessoiries,odds))



