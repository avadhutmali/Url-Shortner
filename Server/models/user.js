const mongooose = require("mongoose")

const userSchema = mongooose.Schema({
    userName :{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    urls:[{type:mongooose.Schema.Types.ObjectId, ref:"url"}]
},{ timestamps: true })

const userModel = mongooose.model("user",userSchema)

module.exports = userModel