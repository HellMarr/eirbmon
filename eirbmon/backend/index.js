const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

const session = require('express-session');

const mongoose = require('mongoose');
let users = require('./db/users.js');
let nft = require('./db/nft.js');
mongoose.connect('mongodb+srv://eirbmon:eirbmon@cluster0.9jyvc.mongodb.net/eirbmon?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose");
});

const config = {
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

const sendNft = require("./blockchain.js")

//Fonction d'appel à la database 

const createUser = async object => {
    const collection = db.collection('users');
    return await collection.insertOne(object);
}

const createNft = async object => {
    const collection = db.collection('nft');
    return await collection.insertOne(object);
}

app.get("/", (req, res) => {
    res.send("Hello From The Server!");
})


app.get("/api/marketplace", async(req, res) => {
    console.log(req.query);
    let page = 1
    if (req.query.page){
        page = req.query.page
    }
    let bees = 1
    if (req.query.type!="null"){
        console.log("Fetching Marketplace nft by type "+ req.query.type);
        if (req.query.potential == "descending" && req.query.price == "descending"){
            console.log("Typed // Potential descending // Price descending");
            bees = await nft.find({$and: [{ nft_type: req.query.type }, {nft_forsale:true}]}).where('nft_price').gte(parseInt(req.query.minprice)).lte(parseInt(req.query.maxprice)).where('nft_potential').gte(parseInt(req.query.minpotential)).lte(parseInt(req.query.maxpotential)).sort({nft_potential : -1}).sort({nft_price : -1}).limit(60*page);
        }
        if (req.query.potential == "ascending" && req.query.price == "descending"){
            console.log("Typed // Potential ascending // Price descending");
            bees = await nft.find({$and: [{ nft_type: req.query.type }, {nft_forsale:true}]}).where('nft_price').gte(parseInt(req.query.minprice)).lte(parseInt(req.query.maxprice)).where('nft_potential').gte(parseInt(req.query.minpotential)).lte(parseInt(req.query.maxpotential)).sort({nft_potential : 1}).sort({nft_price : -1}).limit(60*page);
        }
        if (req.query.potential == "descending" && req.query.price == "ascending"){
            console.log("Typed // Potential descending // Price ascending");
            bees = await nft.find({$and: [{ nft_type: req.query.type }, {nft_forsale:true}]}).where('nft_price').gte(parseInt(req.query.minprice)).lte(parseInt(req.query.maxprice)).where('nft_potential').gte(parseInt(req.query.minpotential)).lte(parseInt(req.query.maxpotential)).sort({nft_potential : -1}).sort({nft_price : 1}).limit(60*page);
        }
        if (req.query.potential == "ascending" && req.query.price == "ascending"){
            console.log("Typed // Potential ascending // Price ascending");
            bees = await nft.find({$and: [{ nft_type: req.query.type }, {nft_forsale:true}]}).where('nft_price').gte(parseInt(req.query.minprice)).lte(parseInt(req.query.maxprice)).where('nft_potential').gte(parseInt(req.query.minpotential)).lte(parseInt(req.query.maxpotential)).sort({nft_potential : 1}).sort({nft_price : 1}).limit(60*page);
        }
        res.status(200).json(bees.slice((page-1)*60,page*60))
        return;
    }
    else if (req.query.potential == "descending" && req.query.price == "descending"){
        console.log("Not typed // Potential descending // Price descending");
        bees = await nft.find({nft_forsale:true}).where('nft_price').gte(parseInt(req.query.minprice)).lte(parseInt(req.query.maxprice)).where('nft_potential').gte(parseInt(req.query.minpotential)).lte(parseInt(req.query.maxpotential)).sort({nft_potential : -1}).sort({nft_price : -1}).limit(60*page);
    }
    else if (req.query.potential == "ascending" && req.query.price == "descending"){
        console.log("Not typed // Potential ascending // Price descending");
        bees = await nft.find({nft_forsale:true}).where('nft_price').gte(parseInt(req.query.minprice)).lte(parseInt(req.query.maxprice)).where('nft_potential').gte(parseInt(req.query.minpotential)).lte(parseInt(req.query.maxpotential)).sort({nft_potential : 1}).sort({nft_price : -1}).limit(60*page);
    }
    else if (req.query.potential == "descending" && req.query.price == "ascending"){
        console.log("Not typed // Potential descending // Price ascending");
        bees = await nft.find({nft_forsale:true}).where('nft_price').gte(parseInt(req.query.minprice)).lte(parseInt(req.query.maxprice)).where('nft_potential').gte(parseInt(req.query.minpotential)).lte(parseInt(req.query.maxpotential)).sort({nft_potential : -1}).sort({nft_price : 1}).limit(60*page);
    }
    else if (req.query.potential == "ascending" && req.query.price == "ascending"){
        console.log("Not typed // Potential ascending // Price ascending");
        bees = await nft.find({nft_forsale:true}).where('nft_price').gte(parseInt(req.query.minprice)).lte(parseInt(req.query.maxprice)).where('nft_potential').gte(parseInt(req.query.minpotential)).lte(parseInt(req.query.maxpotential)).sort({nft_potential : 1}).sort({nft_price : 1}).limit(60*page);
    }
    else {
        bees = await nft.aggregate([
            { $match: { nft_forsale: true } },
            { $sample: { size: 60*page } }
        ])
    }
    res.status(200).json(bees.slice((page-1)*60,page*60))
});

app.get("/api/eirbmon/:id", async(req, res) => {
    // await createNft({nft_id:1225,nft_price:9999,nft_type:"elec",nft_bg_color:"#FFF89A"});
    const id = req.params.id;
    const nft_info = await nft.findOne({ nft_id: id});
    console.log(nft_info);
    res.status(200).send(nft_info)
});


app.get("/api/profile/:user_wallet", async(req, res) => {
    console.log("Fetching Profile Nft");
    const user_wallet = req.params.user_wallet;
    console.log('user wallet : ' + user_wallet);
    
    // const user_db = await users.findOne({ user_wallet: _user_wallet });

    const nfts = await nft.find({ nft_owner: user_wallet });
    // console.log(nfts);

    // let nft_list = [];
    // for await (const doc of nft.find({nft_id: {$in: user_db.tokenIds} })) {
    //     console.log(doc);
    //     nft_list[nft_list.length] = doc;
    //   }
    //   console.log(nft_list);
    
    res.send(nfts) 
});

app.post("/api/profile/sell", async (req,res) => {
    console.log("selling");
    const _user_wallet = req.body.user_wallet;
    const _nft_id = req.body.token_id
    const price = parseInt(req.body.price)
    const marketAddr = "0x1568aa48477086083237153bbd6faf38a1697182"

    try{
        const response = await nft.updateOne({nft_id: _nft_id}, {nft_forsale: true, nft_price: price, nft_owner: marketAddr})
        // console.log(response)
        res.send("db succesfully updated")

    }catch(err){
        res.send(err)
    }
})

app.post("/api/marketplace/buy", async (req,res) => {
    console.log("buying")
    const _user_wallet = req.body.user_wallet;
    const _nft_id = req.body.token_id
    console.log("id ",_nft_id," user_wallet ", _user_wallet)

    try{
        const response = await nft.updateOne({nft_id: _nft_id}, {nft_forsale: false, nft_price: 0, nft_owner: _user_wallet})
        console.log("db succesfully updated")
        res.send("db succesfully updated when buying")

    }catch(err){
        res.send(err)
    }
})

// app.get("/api/profile", async(req, res) => {

//     let username = req.session.username;
//     const user_nfts = await nft.find({ user_name: username }, 'user_nft');

//     console.log("Sending profile info...");
 
//     res.status(200).send({
//         msg: 'nft info sent successfully',
//         lol : user_nfts,
//     })

// });


app.post("/game/position", async(req, res) => {
    //send user position to the game
    console.log("recuperer la position");
    const user_wallet = req.body.user_wallet;
    console.log("wallet:",user_wallet);
    const position = await users.findOne({user_wallet: user_wallet}, 'user_x user_y');
    console.log(position)
    res.status(200).send({
        user_x: position.user_x,
        user_y: position.user_y,
    })
});


function resizeID(arr, size) {
    while (arr.length > size) { arr.pop(); }
    while (arr.length < size) { arr.push({nft_id:0}); }
}

function resizeHP(arr, size) {
    while (arr.length > size) { arr.pop(); }
    while (arr.length < size) { arr.push({nft_hp:0}); }
}

function resizeLevel(arr, size) {
    while (arr.length > size) { arr.pop(); }
    while (arr.length < size) { arr.push({nft_level:0}); }
}

function resizeImage(arr, size) {
    while (arr.length > size) { arr.pop(); }
    while (arr.length < size) { arr.push({nft_image:0}); }
}


app.post("/game/dataEirbeesID", async(req, res) => {
    //send eirbees id user to the game
    console.log("recuperer les ID eirbees");
    const nft_wallet = req.body.user_wallet;
    console.log("wallet:",nft_wallet);
    const nftDataID = await nft.find({nft_owner: nft_wallet}, 'nft_id');
    resizeID(nftDataID,6);
    console.log(nftDataID)
    let send = {};
    send.id0 = nftDataID[0].nft_id;
    send.id1 = nftDataID[1].nft_id;
    send.id2 = nftDataID[2].nft_id;
    send.id3 = nftDataID[3].nft_id;
    send.id4 = nftDataID[4].nft_id;
    send.id5 = nftDataID[5].nft_id;
    console.log(send)
    res.status(200).send(send)
});

app.post("/game/dataEirbeesHP", async(req, res) => {
    //send eirbees id user to the game
    console.log("recuperer les HP eirbees");
    const nft_wallet = req.body.user_wallet;
    console.log("wallet:",nft_wallet);
    const nftDataHP = await nft.find({nft_owner: nft_wallet}, 'nft_hp');
    resizeHP(nftDataHP,6);
    console.log(nftDataHP)
    let send = {};
    send.hp0 = nftDataHP[0].nft_hp;
    send.hp1 = nftDataHP[1].nft_hp;
    send.hp2 = nftDataHP[2].nft_hp;
    send.hp3 = nftDataHP[3].nft_hp;
    send.hp4 = nftDataHP[4].nft_hp;
    send.hp5 = nftDataHP[5].nft_hp;
    console.log(send)
    res.status(200).send(send)
});



app.post("/game/dataEirbeesLevel", async(req, res) => {
    //send eirbees id user to the game
    console.log("recuperer les levels eirbees");
    const nft_wallet = req.body.user_wallet;
    console.log("wallet:",nft_wallet);
    const nftDataLevel = await nft.find({nft_owner: nft_wallet}, 'nft_level');
    resizeLevel(nftDataLevel,6);
    console.log(nftDataLevel)
    let send = {};
    send.lvl0 = nftDataLevel[0].nft_level;
    send.lvl1 = nftDataLevel[1].nft_level;
    send.lvl2 = nftDataLevel[2].nft_level;
    send.lvl3 = nftDataLevel[3].nft_level;
    send.lvl4 = nftDataLevel[4].nft_level;
    send.lvl5 = nftDataLevel[5].nft_level;
    console.log(send)
    res.status(200).send(send)
});

app.post("/game/dataEirbeesImages", async(req, res) => {
    //send eirbees id user to the game
    console.log("recuperer les images eirbees");
    const nft_wallet = req.body.user_wallet;
    console.log("wallet:",nft_wallet);
    const nftDataImage = await nft.find({nft_owner: nft_wallet}, 'nft_image');
    resizeImage(nftDataImage,6);
    // console.log(nftDataImage)
    let send = {};

    for(let i=0;i<6;i++){
        if(nftDataImage[i].nft_image!=0){
            const first = nftDataImage[i].nft_image.split("/")
            const second = first[6].split(".")
            const id = second[0]
            nftDataImage[i].nft_image = id;
        }
    }
    
    send.img0 = nftDataImage[0].nft_image;
    send.img1 = nftDataImage[1].nft_image;
    send.img2 = nftDataImage[2].nft_image;
    send.img3 = nftDataImage[3].nft_image;
    send.img4 = nftDataImage[4].nft_image;
    send.img5 = nftDataImage[5].nft_image;
    console.log(send)
    res.status(200).send(send)
});

app.get("/game/catchables", async(req, res) => {

    const nfts = await nft.find({nft_owner: "0x23ec543f995d80ad727cf2284ec448e55bf769fb", nft_forsale:false},'nft_potential nft_hp nft_id nft_level nft_image');
    // console.log(nfts)
    const num = Math.floor(Math.random() * (nfts.length-1))
    console.log(nfts[num])
    const first = nfts[num].nft_image.split("/")
    const second = first[6].split(".")
    const id = second[0]
    nfts[num].nft_image = id;
    console.log(nfts[num])
    res.status(200).send(nfts[num])

});

app.post("/game/savePosition", async(req, res) => {
    //save position of the user in the game
    const user_wallet = req.body.user_wallet;
    const user_x = req.body.user_x;
    const user_y = req.body.user_y;
    console.log("------------POSITION-------------");
    console.log(user_x);
    console.log(user_y);
    await users.updateOne({user_wallet: user_wallet}, {user_x: user_x, user_y: user_y});

});

app.post("/game/save", async (req, res) => {
    const data = req.body;
    console.log(data);
})

app.post("/api/game/nft_catch", async(req, res) => {

    const user_wallet = req.body.user_wallet;
    const new_nft = req.body.nft_id;
    
    await nft.updateOne({ nft_id: new_nft}, {nft_owner: user_wallet});

});


app.post("/api/game/nft_update", async(req, res) => {

    const nft_id = req.body.nft_id;
    const nft_level = req.body.nft_level;
    const nft_hp = req.body.nft_hp;
    await nft.updateOne({ nft_id: nft_id}, {nft_level: nft_level, nft_hp: nft_hp});

});


// ===========  TEST COMM UNITY ===============
app.post("/unity/catching", async(req, res) => {

    console.log('from unity received:')
    console.log(req.body)
    
    sendNft(req.body.user_wallet, req.body.nft_id);
    await nft.updateOne({ nft_id: req.body.nft_id}, {nft_owner: req.body.user_wallet});

    res.status(200).send({received: true})
 
 });
//==============================================
 
app.listen(3001, () => {
    console.log("Server started ...");
});


//Génération des métadata nft dans la database


/*for (let i = 1; i < 4000; i++) {
    const collection = db.collection('nft_compare');
    const real_url = "https://masteronepiece.com/wp-content/uploads/eirbmon/" + i +".svg"
    collection.findOne({nft_img : real_url}).then((new_nft) => {
        
        if(new_nft){
            console.log(new_nft.nft_id)
            const collection2 = db.collection('nft');
            collection2.findOneAndUpdate({nft_image : real_url},{$set :{nft_id:new_nft.nft_id}}).then((nft_) => {
            console.log("old id: " + i + " new id: " + new_nft.nft_id);
            })
        }
        
    });
    //const nft_old = await nft.findOneAndUpdate({});
    
   }*/

/*for (let i = 1; i < 4001; i++) {
    const collection = db.collection('users');
    const real_url = "https://masteronepiece.com/wp-content/uploads/eirbmon/" + i +".svg"
    collection.findOne({nft_img : real_url}).then((new_nft) => {
        console.log(i)
        collection.findOneAndUpdate({nft_image : real_url},{$set :{nft_forsale:false, nft_level:1, nft_hp:1}}).then((nft_) => {
            console.log(i);
        })
        
    });
    
//const nft_old = await nft.findOneAndUpdate({});

}*/
