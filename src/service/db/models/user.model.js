import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type: String,
        unique: true
    },
    age:Number,
    password:String, 
    cart:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "carts",
    },
    role:{
        type: String,
        default: "user"
    },
    lastLogin: {
        type: Date,
        default: null,
      }
})

userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(userCollection, userSchema);