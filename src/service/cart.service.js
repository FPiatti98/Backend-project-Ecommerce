import { cartModel } from "./db/models/cart.model.js";

export const getNewCartId = async() => {
    try {
        const newcart = new cartModel
        const cart = await newcart.save();
        console.log(cart._id)
        return cart._id.toString();
    } catch (error) {
        console.error("No se pudo crear el carrito, error " + error)
    }
}
