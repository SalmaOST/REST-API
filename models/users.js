const mongoose=require('mongoose')
const UsersSchema=new mongoose.Schema({
    name:{ type: String, required: true },
})

module.exports = mongoose.model('Users', UsersSchema)