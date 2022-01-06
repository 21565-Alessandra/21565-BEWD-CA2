//CONTINUOUS ASSESSMENT II - BSC30921
//STUDENT ID: 21565
//STUDENT NAME: ALESSANDRA SILVA DOS REIS

// requesting mongoose and Schema so the class can be defined
const mongoose = require('mongoose')
const { Schema } = mongoose;
//setting up the Rules for my class using schema
const singerSchema = new Schema({

    name: String,
    age: Number,
    nationality: String,
    grammyWinner: Boolean
})
//constructor for our class 
const Singer = mongoose.model('Singer', singerSchema);

//export the class, also called a model or a document, to use in different files
module.exports = Singer
