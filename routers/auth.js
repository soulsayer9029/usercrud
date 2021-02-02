const express=require('express');

const router=express.Router()
const {register,login}=require('../controllers/auth.js')

//Signup/register
router.post('/register',register)

router.post('/login',login)

module.exports=router