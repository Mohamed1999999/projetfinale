const express= require('express')
const mongoose= require('mongoose')
const cors= require("cors")
require('dotenv').config()

const app= express()

const routes= require('./routes/ToDoRouter')

const PORT= process.env.PORT || 5000


mongoose
.connect(process.env.MONGODB_URL)
.then(()=>console.log("connected to the MongoDB"))
.catch((err) => console.log(err))

app.use(express.json())
app.use(cors())

app.use(routes)


app.listen(PORT, ()=> console.log(`listening the port: ${PORT}`))
