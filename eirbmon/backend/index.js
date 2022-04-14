const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());

const session = require('express-session');

const mongoose = require('mongoose');
let users = require('./users.js');
let nft = require('./nft.js');
mongoose.connect('mongodb+srv://eirbmon:eirbmon@cluster0.9jyvc.mongodb.net/eirbmon?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose")
  db.collection('users').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
  });
  db.collection('nft').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
  });
});

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

//Fonction d'appel à la database 

const createUser = async object => {
    const collection = db.collection('users');
    const user = await collection.insertOne(object);
    return user
}
  

const findUsers = async user_name => {
    const userss = await users.find({});
    userss.map(users => users.user_name);
    return userss
}

app.get("/", (req, res) => {
    res.send("Hello From The Server");
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
        errors.push("password confirmation is different from password");
    }
    return errors;
}

function validatePassword(password) {
    let errors = [];

    // check whether contact no is empty or not
    if (password.length == 0) {
        errors.push("Password Is Null");
    }

    return errors;
}

function validateEmail(email) {
    let errors = [];

    // checks whether email is empty or not
    if (email.length == 0) {
        errors.push("Email Is Null");
    }

    // checks whether email length is more then 100 or not
    if (email.length > 100) {
        errors.push("Email Can not exceed 100 Character");
    }


    // checks whether email is valid or not usinf regular expression
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email))) {
        errors.push("Email Is Not Valid");
    }

    return errors;
}

async function validateRegister(username,email){   
    let errors = [];
    const users = await findUsers()
    //On parcourt les pseudos et les emails pour voir si ils sont déjà pris
    let test = false
    for (let i = 0; i<users.length; i++){
        if (users[i].user_mail ===email) {
            test = true
        }
    }
    if (test){
        errors.push("The chosen email is already taken!"); 
    }
    test = false
    for (let i = 0; i<users.length; i++){
        if (users[i].user_name ===username) {
            test = true
        }
    }
    if (test){
        errors.push("The chosen username is already taken!");  
    }
    return errors;
}

async function ValidateUser_email(username_email){   
    let errors = [];
    const userss = await findUsers()
    let test = false;
    for (let i = 0; i<userss.length; i++){
        if (userss[i].user_mail ===username_email) {
            console.log(userss[i]);
            test = true
        }
    }
    for (let i = 0; i<userss.length; i++){
        if (userss[i].user_name ===username_email) {
            test = true
        }
    }
    if (!test){
            errors.push("There are no accounts linked to this email or username")
    }
    return errors;
}

async function ValidateMatchPassword(password,username_email){   
    let errors = [];
    test = false
    const good_user = await users.findOne({ $or: [ { user_mail: username_email } , { user_name: username_email } ] })
    if (good_user !== null){
        if (good_user.user_password === password) {
        test = true
        }
        if (!test){
            errors.push("The password is wrong")
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
        console.log("We add a new user to the database")
        console.log("We redirect to the home page")
        await createUser({ user_name: username, user_mail: email,user_password:password})
        req.session.logged = true; 
        res.status(200).send({
            msg: "Student Registered Succesfully",
        })
    }
});


app.get("/api/signup", async(req, res) => {
    
    const users = await findUsers()
    console.log(users[1]);
    res.status(200).send({
        msg: "All the data fetched successfully",
        data: users
    })
})

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
        console.log("We redirect to the home page")
        req.session.logged = true;  
        res.status(200).send({
            msg: "Student Registered Succesfully",
        })
    }
});

app.get("/api/signin", async(req, res) => {
    const users = await findUsers()
    console.log(users[1]);
    res.status(200).send({
        msg: "All the data fetched successfully",
        data: users
    })
})

app.get("/api/marketplace", async(req, res) => {
    
    console.log("Fetching Marketplace nft");
 
    req.session.logged = true;  
    res.status(200).send({nft_list:[
        {nft_id:1225,nft_price:0.001,nft_type:"elec",nft_bg_color:"rgb(218,247,166)",},
        {nft_id:1225,nft_price:9999,nft_type:"elec",nft_bg_color:"#FFF89A"},
        {nft_id:1225,nft_price:0.001,nft_type:"elec",nft_bg_color:"#FFB2A6"},
        {nft_id:1225,nft_price:1,nft_type:"elec",nft_bg_color:"#FF8AAE"},
        {nft_id:1225,nft_price:0.001,nft_type:"elec",nft_bg_color:"#FCF4DD"},
        {nft_id:1225,nft_price:0.001,nft_type:"elec",nft_bg_color:"#DDEDEA"},
        {nft_id:1225,nft_price:0.001,nft_type:"elec",nft_bg_color:"#9ADCFF"},
        {nft_id:1225,nft_price:9999,nft_type:"elec",nft_bg_color:"#FFF89A"},
        {nft_id:1225,nft_price:0.001,nft_type:"elec",nft_bg_color:"#FFB2A6",},
        {nft_id:1225,nft_price:1089,nft_type:"elec",nft_bg_color:"#FF8AAE"},
        {nft_id:1225,nft_price:0.001,nft_type:"elec",nft_bg_color:"#DDEDEA"},
        {nft_id:1225,nft_price:0.001,nft_type:"elec",nft_bg_color:"#FCF4DD"},
    ]})

});

app.post("/api/profile", async(req, res) => {
    console.log("Fetching Profile Nft")

    req.session.logged = true;
    const _user_wallet = req.body.user_wallet;
    
    
    const userss = await db.collection('users').findOne({user_wallet:_user_wallet});
    // console.log(userss.tokenIds)

    nft_list = [];
    for await (const doc of db.collection("nft").find({nft_id: {$in: userss.tokenIds} })) {
        console.log(doc);
        nft_list[nft_list.length] = doc;
      }
      console.log(nft_list)
    
      res.send(nft_list)
});


app.listen(3001, () => {
    console.log("Server started ...");
});