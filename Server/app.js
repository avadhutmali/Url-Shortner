const express = require("express")
const dotenv = require("dotenv")
const {connectMongoose} = require("./connect")
const routeUrl = require("./routes/url")
const routeUser = require("./routes/user")
const cors = require("cors")

dotenv.config()
const app = express()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

connectMongoose(MONGO_URL)
    .then(()=>{console.log("MongoDB is connected to url: "+MONGO_URL)})
    
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/url",routeUrl)
app.use("/api/user",routeUser)

app.listen(PORT,()=>{console.log("Servver is starting at port: "+PORT)})

