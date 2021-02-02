const express=require('express')

const app=express()
const cors=require('cors')
const mongoose  =require('mongoose')

require('dotenv/config')
app.use(cors())
const bodyParser=require('body-parser')
app.use(bodyParser.json())

const authRoutes=require('./routers/auth.js')
app.use('/api/users',authRoutes)
const port=process.env.PORT || 3000





mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(port,()=>console.log("DB Connected")))
    .catch((e)=>console.log(e.message))

mongoose.set('useFindAndModify',false);