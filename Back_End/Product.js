const mongoose= require('mongoose');
const productSchema=mongoose.Schema({
    ProductID:Number,
    ProductName:String,
    ProductPrice:Number,
    ProductImg:String,
}, { timestamps: true });
module.exports = mongoose.model("Product",productSchema);