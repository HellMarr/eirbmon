const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');

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
  

// const findUsers = async user_name => {
//     const userss = await users.find({});
//     userss.map(users => users.user_name);
//     return userss
// }



app.get("/", (req, res) => {
    res.send("Hello From The Server!");
})


function validateUsername(username) {
    let errors = [];
    if (username.length == 0) {
        errors.push("Username Is Null");
    }

    if (username.length > 50) {
        errors.push("Username Length Can Not Exceed 50 Characters.");
    }

    return errors;
}

function validatePasswordconfirm(password,passwordconfirm) {
    let errors = [];
    if (password !== passwordconfirm || passwordconfirm === "") {
        errors.push("password confirmation is different from password.");
    }
    return errors;
}

function validatePassword(password) {
    let errors = [];

    // check whether contact no is empty or not
    if (password.length == 0) {
        errors.push("Password Is Null.");
    }

    return errors;
}

function validateEmail(email) {
    let errors = [];

    // checks whether email is empty or not
    if (email.length == 0) {
        errors.push("Email Is Null.");
    }

    // checks whether email length is more then 100 or not
    if (email.length > 100) {
        errors.push("Email Can not exceed 100 characters.");
    }


    // checks whether email is valid or not usinf regular expression
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email))) {
        errors.push("Email Is Not Valid");
    }

    return errors;
}

async function validateRegister(username,email) {   
    let errors = [];
    const users_db = await users.find({});
    //On parcourt les pseudos et les emails pour voir si ils sont déjà pris
    let test = false;
    for (const element of users_db) {
        if (element.user_mail ===email) {
            test = true;
        }
    }
    if (test){
        errors.push("The chosen email is already taken!"); 
    }
    test = false;
    for (const element of users_db) {
        if (element.user_name ===username) {
            test = true;
        }
    }
    if (test) {
        errors.push("The chosen username is already taken!");  
    }
    return errors;
}

async function ValidateUser_email(username_email) {   
    let errors = [];
    const users_db = await users.find({});
    let test = false;
    for (const element of users_db) {
        if (element.user_mail ===username_email) {
            console.log(element);
            test = true;
        }
    }
    for (const element of users_db) {
        if (element.user_name ===username_email) {
            test = true;
        }
    }
    if (!test){
            errors.push("There are no accounts linked to this email or username");
    }
    return errors;
}

async function ValidateMatchPassword(password,username_email) {   
    let errors = [];
    test = false;
    const good_user = await users.findOne({ $or: [ { user_mail: username_email } , { user_name: username_email } ] });
    if (good_user !== null){
        if (good_user.user_password === password) {
        test = true;
        }
        if (!test){
            errors.push("The password is wrong");
        }
    }
    return errors;
}

app.post("/api/signup", async(req, res) => {
    console.log("Sigining up...	");
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let passwordconfirm = req.body.passwordconfirm;

    let errFUsername = validateUsername(username); // will validate username
    let errEmail = validateEmail(email); // will validate email
    let errPassword = validatePassword(password); // will validate contact no
    let errPasswordconfirm = validatePasswordconfirm(password,passwordconfirm); // will validate passwordconfirm

    //On teste la database
    let errRegister = await validateRegister(username,email); //will validate final registration

    if (errFUsername.length || errEmail.length || errPassword.length || errPasswordconfirm.length || errRegister.length) {
        res.status(200).json({
            msg: "Validation Failed",
            errors: {
                username: errFUsername,
                email: errEmail,
                password: errPassword,
                passwordconfirm: errPasswordconfirm,
                register: errRegister
            }
        });
    }
    else {
        console.log("We add a new user to the database");
        console.log("We redirect to the home page");
        await createUser({ user_name: username, user_mail: email,user_password:password});
        req.session.logged = true; 
        res.status(200).send({
            msg: "Student Registered Succesfully",
        })
    }
});


// app.get("/api/signup", async(req, res) => {
    
//     const users_db = await users.find({});
//     console.log(users_db[1]);
//     res.status(200).send({
//         msg: "All the data fetched successfully",
//         data: users_db
//     })
// })

app.post("/api/signin", async(req, res) => {
    
    console.log("Signing in...	");
    let username_email = req.body.username_email;
    let password = req.body.password;

    let errFUsername_email = await ValidateUser_email(username_email); // will check database to confirm username or email
    let errPassword = await ValidateMatchPassword(password,username_email); // will check the match in the database

    if (errFUsername_email.length ||  errPassword.length) {
        res.status(200).json({
            msg: "Validation Failed",
            errors: {
                username_email: errFUsername_email,
                password: errPassword,
            }
        });
    }
    else {
        console.log("We redirect to the home page");
        req.session.logged = true;  
        res.status(200).send({
            msg: "Student Registered Succesfully",
        })
    }
});

// app.get("/api/signin", async(req, res) => {
//     const users_db = await users.find({})
//     console.log(users_db[1]);
//     res.status(200).send({
//         msg: "All the data fetched successfully",
//         data: users_db
//     })
// })

/*app.get("/api/marketplace/hightolow", async(req, res) => {

    console.log("Fetching Marketplace nft from high price to low price");
    const bees = await nft.find({nft_forsale:true}).sort({ nft_price: -1}).limit(60);
    // console.log(bees)
    res.status(200).send(bees)
});*/

/*app.get("/api/marketplace/lowtohigh", async(req, res) => {

    console.log("Fetching Marketplace nft from low price to high price");
    const bees = await nft.find({nft_forsale:true}).sort({ nft_price: 1}).limit(60);
    // console.log(bees)
    res.status(200).send(bees)
});*/

/*app.get("/api/marketplace/potential", async(req, res) => {

    console.log("Fetching Marketplace nft from high potential to low");
    const bees = await nft.find({nft_forsale:true}).sort({ nft_potential: -1}).limit(60);
    //console.log(bees)
    res.status(200).send(bees)
});*/

app.get("/api/marketplace", async(req, res) => {
    let page = 1
    if (req.query.page){
        page = req.query.page
    }
    let bees = 1
    if (req.query.type){
        console.log("Fetching Marketplace nft by type "+ req.query.type);
        bees = await nft.find({$and: [{ nft_type: req.query.type }, {nft_forsale:true}]}).sort({nft_id : 1}).limit(60*page)
        if (req.query.potential == "descending"){
            console.log("Fetching Marketplace nft from high potential to low");
            bees = await nft.find({$and: [{ nft_type: req.query.type }, {nft_forsale:true}]}).sort({nft_potential : -1}).limit(60*page)
        }
        if (req.query.potential == "ascending"){
            console.log("Fetching Marketplace nft from low potential to high");
            bees = await nft.find({$and: [{ nft_type: req.query.type }, {nft_forsale:true}]}).sort({nft_potential : -1}).limit(60*page)
        }
        if (req.query.price == "descending"){
            console.log("Fetching Marketplace nft from high price to low price");
            bees = await nft.find({$and: [{ nft_type: req.query.type }, {nft_forsale:true}]}).sort({nft_price : -1}).limit(60*page)
        }
        if (req.query.price == "ascending"){
            console.log("Fetching Marketplace nft from low price to high price");
            bees = await nft.find({$and: [{ nft_type: req.query.type }, {nft_forsale:true}]}).sort({nft_price : 1}).limit(60*page)
        }
        res.status(200).json(bees)
        return;
    }
    else if (req.query.potential == "descending"){
        console.log("Fetching Marketplace nft from high potential to low");
        bees = await nft.find({nft_forsale:true}).sort({ nft_potential: -1}).limit(60*page);
    }
    else if (req.query.potential = "ascending"){
        console.log("Fetching Marketplace nft from low potential to high");
        bees = await nft.find({nft_forsale:true}).sort({ nft_potential: 1}).limit(60*page);
    }
    else if (req.query.price == "descending"){
        console.log("Fetching Marketplace nft from high price to low price");
        bees = await nft.find({nft_forsale:true}).sort({ nft_price: -1}).limit(60*page);
    }
    else if (req.query.price = "ascending"){
        console.log("Fetching Marketplace nft from low price to high price");
        bees = await nft.find({nft_forsale:true}).sort({ nft_price: 1}).limit(60*page);
    }
    else {
        bees = await nft.aggregate([
            { $match: { nft_forsale: true } },
            { $sample: { size: 60*page } }
        ])
    }
    res.status(200).json(bees.slice((page-1)*60,page*60))
});

//Test
        app.get("/api/marketplace/?type=:type&sort_price=:sort_price&sort_potential=:sort_potential&minprice=:minprice&maxprice=:maxprice&minpotential=:minpotential&maxpotential=:maxpotential", async(req, res) => {
            console.log("Salut");
            console.log(req.params)
            const bees = await nft.find({$and: [{ nft_type: req.params.type }, {nft_forsale:true}]}).sort({nft_id : 1}).limit(60)
            // console.log(bees)
            res.status(200).send(bees)
        });

        app.get("/api/marketplace//api/marketplace/?type=null&sort_price=ascending&sort_potential=descending&minprice=0&maxprice=2&minpotential=0&maxpotential=200", async(req, res) => {
            console.log("Salut");
            console.log(req.params)
            const bees = await nft.find({$and: [{ nft_type: req.params.type }, {nft_forsale:true}]}).sort({nft_id : 1}).limit(60)
            // console.log(bees)
            res.status(200).send(bees)
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
    
    const user_db = await users.findOne({ user_wallet: _user_wallet });

    const nfts = await nft.find({nft_id: user_db.tokenIds });
    console.log(nfts);

    let nft_list = [];
    for await (const doc of nft.find({nft_id: {$in: user_db.tokenIds} })) {
        console.log(doc);
        nft_list[nft_list.length] = doc;
      }
      console.log(nft_list);
    
      res.send(nft_list)
});


// app.get("/api/profile", async(req, res) => {

//     let username = req.session.username;
//     const user_nfts = await nft.find({ user_name: username }, 'user_nft');

//     console.log("Sending profile info...");
 
//     res.status(200).send({
//         msg: 'nft info sent successfully',
//         lol : user_nfts,
//     })

// });




app.listen(3001, () => {
    console.log("Server started ...");
});


//Génération des métadata nft dans la database
/*for (let i = 1; i < 4001; i++) {
    let rawdata = fs.readFileSync('../bee_generator/abeilles/' + i +'.json');
    let bee = JSON.parse(rawdata);
    let price = Math.random() * 2;
    createNft({ nft_id: i, nft_accessory_list: bee.accessories,nft_price: price,nft_type:bee.type,nft_bg_color:bee.background,nft_pedicel_color:bee.pedicel,nft_wings_color:bee.wings,nft_forsale:true,nft_potential:bee.QI,nft_image:"https://masteronepiece.com/wp-content/uploads/eirbmon/"+ i +".svg"});
}*/