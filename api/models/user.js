const mongoose = require('mongoose');


// db에 넣을 때는 약자로 안넣는것이 좋다
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    email: {type: String, require: true},
    password: {type: String, require: true}
});





module.exports = mongoose.model("User", userSchema);