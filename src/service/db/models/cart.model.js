import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products : {
        type : [
            {
                _id:{
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "products"
                },
                quantity:{
                    type:Number,
                    default:0
                }
            }
        ],
        default : []
    }
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);