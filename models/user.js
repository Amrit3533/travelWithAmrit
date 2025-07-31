const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
    email : {
        type : String,
        required : true,
    }
});

userSchema.plugin(passportLocalMongoose);//used bcz it automatically generate username password in salted and hashed form 

module.exports = mongoose.model("User",userSchema);