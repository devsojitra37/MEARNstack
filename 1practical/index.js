// const exp=require('./index2')
// const dmp=require('./index3')
// console.log("first project")
// console.log(exp)
// console.log(dmp)

// const fs=require('fs')
// console.log("files handling")
// console.log("befor function")
// const demo=fs.readFileSync('first.txt','utf-8')
// console.log(demo)
// console.log("after function")
// console.log("hope you understood this")

// for server call and respons
// const http=require("http")
// const url=require("url")
// const fs=require("fs")
// const { request } = require("https")
// const path = require("path")
// const myserver=http.createServer((req,res)=>{
//     const log=${new Date()}:$(req,url):requested\n 
//     // (``=this cll back cot)
//     fs.appendFile('log.txt',log,()=>{})
//     switch(req.url)
//     {

//         case '/nw':
//             fs.readFile(path.join(__dirname,'index.html'),(err,content)=>(res.end(content)))
//             break;
//         case '/home':
//             res.end("Welcome to this ")
//             break;
//         case '/about':
//             res.end("heloo guyyy")
//             break;
//         default:
//             res.end("404 page not found")
//     }
//     // res.end("Who is there??")
//     // console.log("requested")
// })
// myserver.listen(8000,()=>{
//     console.log("server created")
// })


// hoe to mongoose connect using Schema 
// const express=require('express')
// const app=express()
// const mongoose=require('mongoose')
// const Users = require('./schema.js')
// mongoose.connect('mongodb://127.0.0.1:27017/clg')
// const {initiolizepassport} = require('./passport')
// .then (()=>console.log('Mongodb Connected'))
// .catch(()=>console.log('your connection is faild',error))
// app.use((req,res,next)=>
// {
//     console.log('it is worthy')
//     next()
// })
// app.use((err, req, res, next) => {
//     console.error(err,stack);
//     res.status(500).send('someting broke!');
// });
// app.use(express.static('public'))
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/public/index1.html')
// })

// app.get('/home',(req,res)=>{
//     res.sendFile(__dirname+'/public/home.html')
// })
// app.get('/about',(req,res)=>{
//     res.sendFile(__dirname+'/public/about.html')
// })
// app.get('/register',(req,res)=>{
//     res.sendFile(__dirname+'/public/register.html')
// })
// app.post('/register',(req,res)=> { 
//     const NewUser = new user({
//     fullname : req.body.fullname,
//     email : req.body.email,
// })})
// NewUser.save()
// .then(()=> {res.send('users has been register')})
// .catch((err)=>res.status(5000).send('User has not resgisterd'))
// app.listen('8000',()=>{
//     console.log('server created')
// })
// app.get('/loginejs',(req,res)=>{
//     res.sendFile(__dirname + '/public/loginejs.html')
// })
// app.post('/loginejs',(req,res)=> { 
//    res.send('Welcome ${req.user.username}')})
// app.get('/contect',(req,res)=>{
//     res.send('oure about ppage')
// })
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./schema'); 
const session = require('express-session');
const passport = require('passport');
const { initializePassport } = require('./passportConfig');


mongoose.connect('mongodb://127.0.0.1:27017/ITB')
  .then(() => { console.log('MongoDB is Connected') })
  .catch((err) => { console.log('Problem connecting to MongoDB', err) });

app.use(express.static('public'));
app.use(session({
  secret:'your_secret_key',
  resave:false,
  saveUninitialized:false
  }))
app.use(passport.initialize())
app.use(passport.session())
initializePassport(passport)


app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/public/index.html');
});

app.get('/about', (req, res) => {
  return res.sendFile(__dirname + '/public/about.html');
});

app.get('/register', (req, res) => {
  return res.sendFile(__dirname + '/public/register.html');
});

app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const NewUser = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    UserName: req.body.UserName,
    password: req.body.password
  });
  NewUser.save()
    .then(() => { res.send('User saved successfully') })
    .catch(err => res.status(500).send('Error saving Data: ' + err.message));
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),(req, res) => {
  const {username} = req.body
  res.send(`Welcome ${username}`);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});