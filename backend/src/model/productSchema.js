const mongoose  = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:String,
    Price: String,
    category: String,
    userID: String,
    company:String
})

const  ProductModel = new mongoose.model("Product",ProductSchema)

module.exports = ProductModel