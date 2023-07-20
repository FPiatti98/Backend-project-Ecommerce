import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = 'products';

const stringReq = {
    type : String,
    require : true
};

const numReq = {
    type : Number,
    require : true
};

const productSchema = new mongoose.Schema({
    title : stringReq,
    description : String,
    price : numReq,
    thumbnail : Array,
    code : stringReq,
    stock : numReq,
    status : {
        type : Boolean,
        default : true
    },
    category : stringReq
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productsCollection, productSchema);