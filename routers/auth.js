const express=require('express');

const router=express.Router()
const {register,login,contactForm}=require('../controllers/auth.js')

//Signup/register
router.post('/register',register)

router.post('/login',login)

router.post('/contact',contactForm)

module.exports=router