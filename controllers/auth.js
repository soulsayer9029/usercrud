const User=require('../models/User.js')
const {reg_validation,login_validation}=require('../validation.js')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
var transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'nodeforme@gmail.com',
        pass:process.env.PASSWORD

    },
    port:465
})

const register=async(req,res)=>{
    //data input validation
    const {error}=reg_validation(req.body)
    if(error){
        return res.status(404).send(error.details[0].message)
    }
    //checking for duplicate user
    const emailExists=await User.findOne({email:req.body.email})
    if(emailExists){
        return res.status(400).send("Email already exists")
    }
    //hashing the password 
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    //creating new user
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    //saving new user
    try{
        user.save()
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }
   
}
const login=async(req,res)=>{
    //input validation
    const {error}=login_validation(req.body)
    if(error){
        return res.status(404).send(error.details[0].message)
    }
    //finding user
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send("Invalid credentials")
    }
    const validPassword = await bcrypt.compare(req.body.password ,user.password)
    if(!validPassword){
        return res.status(400).send("Invalid Credentials")
    }
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)
    
}
const contactForm=async(req,res)=>{
    const message=req.body.message
    transporter.sendMail({
        from:'nodeforme@gmail.com',
        to:'myknot.gaming@gmail.com',
        subject:'Query',
        text:req.body.message
    },(error,info)=>{
        if(error){
            res.status(400).send(error)
        }else{
           res.status(200).send("mail sent")
        }
    })
}
module.exports={register,login,contactForm}