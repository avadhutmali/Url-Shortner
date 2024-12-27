const mongoose = require("mongoose")

async function connectMongoose(url){
    return mongoose.connect("mongodb+srv://maliavadhut7:5hP7NiRAx0AgLk4N@cluster0.lz3jb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports = {connectMongoose}