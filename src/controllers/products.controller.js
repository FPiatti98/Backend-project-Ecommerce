import { productModel } from "../service/db/models/product.model.js";
import Productsrepository from "../service/repositories/products.repository.js";
import CustomError from "../service/errors/CustomError.js";
import EErrors from "../service/errors/enum-errors.js";
import { generateProductErrorInfo } from "../service/errors/messages/product-creation-error.message.js";

const controller = new Productsrepository

export const createProduct = async(req, res) => {
    try {
        const {title, description, price, thumbnail, code, stock, category} = req.body;

            //si faltan los campos requeridos para creae el producto se genera un errror controlado
            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                //Create Custom Error
                CustomError.createError({
                    name: "Product Creation Error",
                    cause: generateProductErrorInfo({title, description, price, thumbnail, code, stock, category}),
                    message: "Error tratando de crear el producto",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            };
    
        const producto = await controller.create(req.body);
        
        req.logger.info('Producto creado')
        return res.status(200).send(producto)
        
    } catch (error) {
        if(error.code === EErrors.INVALID_TYPES_ERROR) {
            res.status(400).send({status: "error", message: error.cause})
        } else {
            req.logger.error(error)
            return res.status(500).send({status: "error", message : error.message});
        }
    }
}

export const getAllProducts = async(req, res) => {

    try {

        let Products = {};
        let limit = req.query.limit;
        let page = req.query.page;
        const sort = req.query.sort;
        const category = req.query.category;
        const stock = req.query.stock;

        if ( !limit || !page ){
            limit = 10;
            page = 1;
        };

        //se evalua si en la query hay un stock o una categoria por la cual filtrar los productos
        if (category && stock){
            Products = await productModel.paginate({category : category, stock: {$gt: stock}},{limit: limit, page: page, sort: {price: sort}});
        } else if (category && !stock){
            Products = await productModel.paginate({category : category},{limit: limit, page: page, sort: {price: sort}});
        } else if (!category && stock){
            Products = await productModel.paginate({stock: {$gt: stock}},{limit: limit, page: page, sort: {price: sort}});
        } else {
            Products = await productModel.paginate({},{limit: limit, page: page, sort: {price: sort}});
        }

        Products.prevLink = Products.hasPrevPage? `/products?page=${Products.prevPage}`:'';
        Products.nextLink = Products.hasNextPage? `/products?page=${Products.nextPage}`:'';

        return res.status(200).send(Products)

    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
}

export const getProductById = async(req, res) => {
    try {
        const prod = await controller.getById(req.params.id);
        if(prod === undefined){
            return res.status(400).send({status: "error", messsage: `El producto con el id ${req.params.id} no existe`})
        }
        return res.status(200).send(prod)
    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
};

export const updateProduct = async(req, res) => {
    try {
        //se updatea el producto con las propiedades recibidas del body
        const updatedProd = await controller.update(req.params.id, req.body)
        return res.status(200).send(updatedProd);
    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
};

export const deleteProduct = async(req, res) => {
    try {
        const deletedProd = await controller.delete(req.params.id);
        req.logger.info('Producto eliminado')
        return res.status(200).send(deletedProd);
    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
};