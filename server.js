require('dotenv').config({ path: './config/.env' })
const express = require('express')
const app = express()
const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db=mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))


app.use(express.json())
//Getting all
app.get('/',async(res,req)=>{
    try{
        const users= await User.find()
        res.json(users)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
// Getting one
app.get('/:id',getUser,async(res,req)=>{
    res.send(req.user.name)
})
//Creating one
app.post('/',async(res,req)=>{
    const user= new User({
        name:req.body.name,
        age:req.body.age,
        mail:req.body.mail,
        password:req.body.password,
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
//Updating one
app.patch('/:id',getUser,async (res,req)=>{
    if(req.body.name != null){
        res,user.name=req.body.name
    }
    if(req.body.age != null){
        res,user.age=req.body.age
    }
    if(req.body.mail != null){
        res,user.mail=req.body.mail
    }
    if(req.body.password!= null){
        res,user.password=req.body.password
    }
    try{
        const updateUser = await user.save()
        res.json(updateUser)
    }catch(err){
        res.status(400).json({message:err.message})
    }

})
//Deleting one
app.delete('/:id',getUser,async(res,req)=>{
    try{
        await res.user.remove()
        res.json({message:"Deleted User"})
    }catch (err){
        res.status(500).json({message:err.message})
    }

})

async function getUser(req,res,next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user==null){
            return res.status(404).json({message:'cannot find user'})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
    res.user = user
    next()
}


app.listen(2345,()=>{console.log('server started')})
