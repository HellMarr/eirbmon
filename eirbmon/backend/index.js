const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());

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


app.post("/api/profile", async(req, res) => {
    console.log("Fetching Profile Nft");

    req.session.logged = true;
    const _user_wallet = req.body.user_wallet;
    console.log('user wallet : ' + _user_wallet);
    
    // const user_db = await users.findOne({ user_wallet: _user_wallet });

    const nfts = await nft.find({ nft_owner: _user_wallet });
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

    try{
        const response = await nft.updateOne({nft_id: _nft_id}, {nft_forsale: true, nft_price: price})
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


app.get("/api/game", async(req, res) => {

    const user_wallet = req.body.user_wallet;
    const position = await users.findOne({user_wallet: user_wallet}, 'user_x user_y');
    const nfts = await nft.find({nft_owner: user_wallet}, 'nft_potential nft_hp nft_');
    res.status(200).send({
        user_x: position.user_x,
        user_y: position.user_y,
        nfts: nfts,
    })
});

app.post("/api/game/position", async(req, res) => {

    const user_wallet = req.body.user_wallet;
    const user_x = req.body.user_x;
    const user_y = req.body.user_y;
    await users.updateOne({user_wallet: user_wallet}, {user_x: user_x, user_y: user_y});
    

});

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


app.listen(3001, () => {
    console.log("Server started ...");
});


//Génération des métadata nft dans la database
/*for (let i = 1; i < 4001; i++) {
    let rawdata = fs.readFileSync('../bee_generator/abeilles/sorties/jsonabeilles/' + i +'.json');
    let bee = JSON.parse(rawdata);
    let price = Math.floor(Math.random() * 100)+1;
    createNft({ nft_id: i, nft_accessory_list: bee.accessories,nft_price: price,nft_type:bee.type,nft_bg_color:bee.background,nft_pedicel_color:bee.pedicel,nft_wings_color:bee.wings,nft_forsale:true,nft_potential:bee.QI,nft_image:"https://masteronepiece.com/wp-content/uploads/eirbmon/"+ i +".svg"});
}*/