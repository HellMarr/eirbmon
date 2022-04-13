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

function randomG(v){ 
    var r = 0;
    for(var i = v; i > 0; i --){
        r += Math.random();
    }
    return r / v;
}

function generateAll(files,changes,color,accessoiries){
    let compteur = 0;
    for (let a=0;a<4;a++){
        for(let b=0;b<125;b++){
            for (let c=0;c<8;c++){  

                let tab = { 
                    QI: 0,
                    type: "", 
                    accessories: [],
                    background: "",
                    pedicel: "",
                    wings: "",

                };

                if (a==0){
                    tab.type = "Telecom"
                }
                if (a==1){
                    tab.type = "Info"
                }
                if (a==2){
                    tab.type = "Matmeca"
                }

                if (a==3){
                    tab.type = "Elec"
                }


                let xmlFile = fs.readFileSync(files[a], 'utf8');
                compteur = compteur+1 
                if (b % 5 === 0){
                    while (xmlFile.includes(changes[0])){
                        xmlFile = xmlFile.replace(changes[0],color[0][0])
                        tab.background = color[0][0]
                    }
                }
                else if (b % 5 === 1){
                    while (xmlFile.includes(changes[0])){
                        xmlFile = xmlFile.replace(changes[0],color[0][1])
                        tab.background = color[0][1]
                    }
                }
                else if (b % 5 === 2){
                    while (xmlFile.includes(changes[0])){
                        xmlFile = xmlFile.replace(changes[0],color[0][2])
                        tab.background = color[0][2]
                    }
                }
                else if (b % 5 === 3){
                    while (xmlFile.includes(changes[0])){
                        xmlFile = xmlFile.replace(changes[0],color[0][3])
                        tab.background = color[0][3]
                    }
                }
                else if (b % 5 === 4){
                    while (xmlFile.includes(changes[0])){
                        xmlFile = xmlFile.replace(changes[0],color[0][4])
                        tab.background = color[0][4]
                    }
                }
                if (b % 5 === 0){
                    while (xmlFile.includes(changes[1])){
                        xmlFile = xmlFile.replace(changes[1],color[1][0])
                        tab.wings = color[1][0]
                    }
                }
                else if (b % 5 === 1){
                    while (xmlFile.includes(changes[1])){
                        xmlFile = xmlFile.replace(changes[1],color[1][1])
                        tab.wings = color[1][1]
                    }
                }
                else if (b % 5 === 2){
                    while (xmlFile.includes(changes[1])){
                        xmlFile = xmlFile.replace(changes[1],color[1][2])
                        tab.wings = color[1][2]
                    }
                }
                else if (b % 5 === 3){
                    while (xmlFile.includes(changes[1])){
                        xmlFile = xmlFile.replace(changes[1],color[1][3])
                        tab.wings = color[1][3]
                    }
                }
                else if (b % 5 === 4){
                    while (xmlFile.includes(changes[1])){
                        xmlFile = xmlFile.replace(changes[1],color[1][4])
                        tab.wings = color[1][4]
                    }
                }
                if (b % 5 === 0){
                    while (xmlFile.includes(changes[2])){
                        xmlFile = xmlFile.replace(changes[2],color[2][0])
                        tab.pedicel = color[2][0]
                    }
                }
                else if (b % 5 === 1){
                    while (xmlFile.includes(changes[2])){
                        xmlFile = xmlFile.replace(changes[2],color[2][1])
                        tab.pedicel = color[2][1]
                    }
                }
                else if (b % 5 === 2){
                    while (xmlFile.includes(changes[2])){
                        xmlFile = xmlFile.replace(changes[2],color[2][2])
                        tab.pedicel = color[2][2]
                    }
                }
                else if (b % 5 === 3){
                    while (xmlFile.includes(changes[2])){
                        xmlFile = xmlFile.replace(changes[2],color[2][3])
                        tab.pedicel = color[2][3]
                    }
                }
                else if (b % 5 === 4){
                    while (xmlFile.includes(changes[2])){
                        xmlFile = xmlFile.replace(changes[2],color[2][4])
                        tab.pedicel = color[2][4]
                    }
                }
                if (c===0){
                    //enlève rien
                    tab.accessories.push(accessoiries[a][0]);
                    tab.accessories.push(accessoiries[a][1]);
                    tab.accessories.push(accessoiries[a][2]);
                }
                if (c===1){

                    while (xmlFile.includes(accessoiries[a][2])){
                    xmlFile = xmlFile.replace(accessoiries[a][2],"none")
                    }
                    tab.accessories.push(accessoiries[a][0]);
                    tab.accessories.push(accessoiries[a][1]);
                }
                if (c===2){
                    while (xmlFile.includes(accessoiries[a][1])){
                    xmlFile = xmlFile.replace(accessoiries[a][1],"none")
                    }
                    tab.accessories.push(accessoiries[a][0]);
                    tab.accessories.push(accessoiries[a][2]);
                }
                if (c===3){
                    while (xmlFile.includes(accessoiries[a][0])){
                        xmlFile = xmlFile.replace(accessoiries[a][0],"none")
                    }
                    tab.accessories.push(accessoiries[a][1]);
                    tab.accessories.push(accessoiries[a][2]);

                }
                if (c===4){
                    while (xmlFile.includes(accessoiries[a][1])){
                        xmlFile = xmlFile.replace(accessoiries[a][1],"none")
                        }
                        while (xmlFile.includes(accessoiries[a][2])){
                            xmlFile = xmlFile.replace(accessoiries[a][2],"none")
                        }
                    tab.accessories.push(accessoiries[a][0]);
                }
                if (c===5){
                    while (xmlFile.includes(accessoiries[a][0])){
                        xmlFile = xmlFile.replace(accessoiries[a][0],"none")
                    }
                    while (xmlFile.includes(accessoiries[a][1])){
                        xmlFile = xmlFile.replace(accessoiries[a][1],"none")
                        }
                    tab.accessories.push(accessoiries[a][2]);

                }
                if (c===6){
                    while (xmlFile.includes(accessoiries[a][0])){
                        xmlFile = xmlFile.replace(accessoiries[a][0],"none")
                    }
                    while (xmlFile.includes(accessoiries[a][2])){
                        xmlFile = xmlFile.replace(accessoiries[a][2],"none")
                        }
                    tab.accessories.push(accessoiries[a][1]);
                }
                if (c===7){
                    while (xmlFile.includes(accessoiries[a][0])){
                        xmlFile = xmlFile.replace(accessoiries[a][0],"none")
                    }
                    while (xmlFile.includes(accessoiries[a][2])){
                        xmlFile = xmlFile.replace(accessoiries[a][2],"none")
                        }
                    while (xmlFile.includes(accessoiries[a][1])){
                        xmlFile = xmlFile.replace(accessoiries[a][1],"none")
                        }
                }
                tab.QI = Math.floor(randomG(10)*200)
                var str = "" + compteur
                var pad = "0000"
                var ans = pad.substring(0, pad.length - str.length) + str
                fs.writeFileSync("./abeilles/" + ans + ".svg",xmlFile) 
                console.log(ans)
                 
                let data = JSON.stringify(tab,null,2);
                JSON.parse(data)
                fs.writeFileSync("./abeilles/" + ans + ".json", data);

            }
        }
    }
}

let files = ["./abeilles/abeille_telecom.svg","./abeilles/abeille_info.svg","./abeilles/abeille_matmeca.svg","./abeilles/abeille_elec.svg"]
let changes = ["BACKGROUND","WINGS","PEDICEL"]
let color = [["DAF7A6","FFFFFF","74E38C","F16F6F","CEAEF6"],["FFEDED","59675E","B9930E","355C8C","5FBB52"],["FFFF00","FF00D1","00FF04","FF0000","00FF64"]]
console.log(changeBeeColor(files,changes,color))
let accessoiries = [["SIGNAL","SLEEP","DOLLAR"],["KEYBOARD","BINARY","CROWN"],["CASE","GLASSES","PI"],["FLASH","ROBOT","CANNONBALL"]]
let odds = [[0.5,0.5,0.5],[0.5,0.5,0.5],[0.5,0.5,0.5,0.5],[0.5,0.5,0.5]]
console.log(randomAccessories(files,accessoiries,odds))

generateAll(files,changes,color,accessoiries)

