import { cartModel } from "../db/models/cart.model.js";

class Cartsrepository {
    create = async() => {
        const newcart = new cartModel
        const cart = await newcart.save();
        return cart;
    }

    getById = async(id) => {
        const cart = await cartModel.findById(id)
        return cart;
    }

    updateQuantity = async(id, prodId, quantity) => {
        //se busca el producto seleccionado en el param para updatearle la cantidad
        const updatedCart = await cartModel.updateOne(
            {
                "_id" : id,
                "products": {"$elemMatch": { "_id": prodId }}
            },
            {
                "$set": { "products.$.quantity": quantity}
            }
        );

        return updatedCart;
    }

    deleteProds = async(id) => {
        const updatedCart = await cartModel.updateOne({_id : id}, {products : []});

        return updatedCart;
    }

}

export default Cartsrepository;