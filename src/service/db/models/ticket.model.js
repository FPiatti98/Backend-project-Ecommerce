import mongoose, { mongo } from "mongoose";

const ticketCollection = "tickets"

const generateCode = () => {
    //se genera un codigo de compra
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let counter = 0;
    while (counter <= 10) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    return result;
};

//se genera la fecha de compra
const dateObj = new Date();

const currentDate =  dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds() + " " +  ("0" + dateObj.getDate()).slice(-2) + "-" +  ("0" + (dateObj.getMonth() + 1)).slice(-2) + "-" + dateObj.getFullYear()

const ticketSchema = new mongoose.Schema({
    code:{
        type:String,
        unique:true,
        default:generateCode()
    },
    purchase_datetime:{
        type:String,
        default: currentDate
    },
    amount:Number,
    purchaser:String,
    productsPurchased:Array
})

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);