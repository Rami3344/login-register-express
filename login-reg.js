import express from 'express'
import bcrypt from "bcrypt"
const app = express();

app.use(express.json());

const users=[];
let id = 0
app.get("/",(req,res)=>{
    res.status(200).send("welcome home")
})

app.get("/login/:ide",(req,res)=>{
    const {ide} = req.params
    const userIndex = users.findIndex((x)=> x.id == ide)
    if(userIndex==-1){
        res.status(400).send("user not found!")
    }else{
        res.send(`You have logged in with email ${users[userIndex].email}`)
    }
})

app.post("/register", async(req,res)=>{
    const {email,password} = req.body
    if(users.findIndex((x)=> x.email == email)!=-1){
        res.status(400).send("this email already used")
    }else{
        id+=1
        const hashedPwd = await bcrypt.hash(password,10)
        users.push({id,email,password:hashedPwd})
        res.send("Account created!");

    }
})
app.get("/register",(req,res)=>{
    res.send(users)
})


app.listen(3000)