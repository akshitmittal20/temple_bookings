const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://akshitmittal20:pSD9tpjvHdOlEVax@290224.dl6gadx.mongodb.net/temple")

//schmema
//user- {
// username: string,
// password: string,
// firstname: string,
// lastname: string
//} 

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const Users = mongoose.model("temple_users", userSchema)


const PoojaSchema = new mongoose.Schema({
    name: String,
    date: Date,
    time: String,
    price: Number,
    description: String,
  });
  
const Poojas = mongoose.model("Poojas",PoojaSchema)

module.exports= {
    Users,
    Poojas
}