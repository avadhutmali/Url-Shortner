const express = require("express")
const dotenv = require("dotenv")
const {connectMongoose} = require("./connect")
const routeUrl = require("./routes/url")
const routeUser = require("./routes/user")
const cors = require("cors")

dotenv.config()
const app = express()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

connectMongoose(MONGO_URI)
    .then(()=>{console.log("MongoDB is connected to url: "+MONGO_URI)})
    
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/url",routeUrl)
app.use("/api/user",routeUser)

app.listen(PORT,()=>{console.log("Server is starting at port: "+PORT)})

