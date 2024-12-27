const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({
    shortId :{
        type:String,
        required:true,
        unique:true,
    },
    redireUrl:{
        type:String,
        required:true,
        unique:true,
    },
    visitHistory:[{timeStamp:{type:Number}}]
},{ timestamps: true })

const model = mongoose.model("url",urlSchema);

module.exports = model