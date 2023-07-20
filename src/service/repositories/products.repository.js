import { productModel } from "../db/models/product.model.js";

class Productsrepository {
    
    create = async(prod) => {
        const newProduct = new productModel(prod);
        const producto = await newProduct.save();
        return producto;
    }

    getById = async(id) => {
        const prod = await productModel.findById(id);
        return prod;
    }

    update = async(id, body) => {
        const prod = await productModel.findById(id);
        //validacion de las propiedades
        if(body.title){prod.title = body.title}
        if(body.description){prod.description = body.description}
        if(body.price){prod.price = body.price}
        if(body.thumbnail){prod.thumbnail = body.thumbnail}
        if(body.stock){prod.stock = body.stock}

        const updatedProd = await prod.save();
        return updatedProd;
    }

    delete = async(id) => {
        const deletedProd = await productModel.deleteOne({ _id: id});
        return deletedProd;
    }

    updateStock = async(id, newStock) => {
        const prod = await productModel.findById(id);
        prod.stock = newStock;
        const updatedProd = await prod.save()
        return updatedProd;
    }
}

export default Productsrepository