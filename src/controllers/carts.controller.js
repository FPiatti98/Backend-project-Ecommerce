import { mongo } from "mongoose";
import Cartsrepository from "../service/repositories/carts.repository.js";
import Productsrepository from "../service/repositories/products.repository.js";
import Ticketrepository from "../service/repositories/tickets.repository.js";
import nodemailer from 'nodemailer'

//declarar los services

const prodController = new Productsrepository;

const ticketController = new Ticketrepository

//cartController
const controller = new Cartsrepository;

export const createCart = async(req, res) => {
    try {
        const cart = await controller.create()
        req.logger.info('Carrito creado')
        return res.status(200).send(cart);
    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
};

export const getCartById = async(req, res) => {
    try {
        const cart = await controller.getById(req.params.id)
        //popular el carrito de productos
        const newCart = await cart.populate('products._id');
        return res.status(200).send(newCart);
    } catch (error) { 
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
}

export const addProdToCart = async(req, res) => {
    try {
        const cart = await controller.getById(req.params.cid);
        //filtrar el array de productos por el id del producto especificado en el reqparams
        const arrprod = cart.products.filter(prod => prod._id.toString() === req.params.pid);
        //si el carrito no contiene el producto se le asigna la cantidad inicial y se agrega al carrito
        if(!arrprod[0]){

            cart.products.push({_id : new mongo.ObjectId(req.params.pid) , quantity : 1});
            const newCart = await cart.save();
            req.logger.info(`El producto con el id: ${req.params.pid} fue agregado al carrito exitosamente`)
            return res.status(200).send(newCart);

        } else {
        
            //en el caso contrario su actualiza la cantidad
            const newQuantity = arrprod[0].quantity + 1
            const updatedCart = controller.updateQuantity(cart._id, arrprod[0]._id, newQuantity)
            req.logger.info(`La cantidad del producto con el id: ${req.params.pid} fue actualizada correctamente`)
            return res.status(200).send({status: "success", message : "quantity updated successfully"});
        }

    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
}

export const deleteProdinCart = async(req, res) => {
    try {
        const cart = await controller.getById(req.params.cid);
        
        //se hace un foreach de los productos adentro del carrito y si coincide con el reqparams se elimina el mismo
        cart.products.forEach((prod) => {
            if(prod._id.toString() === req.params.pid){
                let index = cart.products.indexOf(prod)
                cart.products.splice(index, 1);
            }
        });

        //se guardan los cambios
        const newCart = await cart.save();
        req.logger.info(`El producto con el id: ${req.params.pid} fue eliminado del carrito exitosamente`)
        return res.status(200).send(newCart);

    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
};

export const updateProdQuantity = async(req, res) => {
    try {
        const cart = await controller.getById(req.params.cid);
        //se filtra el array de productos por el id del producto especificado en el reqparams
        const arrprod = cart.products.filter(prod => prod._id.toString() === req.params.pid);
        
        const newQuantity = req.body.quantity
        // si el body contiene la propiedad quantity se updatea la misma
        if(!newQuantity){
            return res.status(400).send({status: "error", message : "Quantity no existe en el body del request"});
        } else {
            const updatedCart = controller.updateQuantity(cart._id, arrprod[0]._id, newQuantity)
            req.logger.info(`La cantidad del producto con el id: ${req.params.pid} fue actualizada correctamente`)
            return res.status(200).send({status: "success", message : "quantity updated successfully"});
        }

    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
};

export const deleteProdsInCart = async(req, res) => {
    try {
        const cart = await controller.getById(req.params.cid);
        //se vacia el carrito
        const updatedCart = await controller.deleteProds(cart._id)

        req.logger.info(`Los productos del carrito ${req.params.cid} fueron eliminados correctamente`)
        return res.status(200).send(updatedCart);
    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
};

export const generatePurchase = async(req, res) => {
    try {
        const cart = await controller.getById(req.params.cid);
        const user = req.session.user
        const productsPurchased = [];
        const productsRetained = [];
        let totalPurchasePrice = 0;

        if(cart.products.length == 0){
            return res.status(404).send({status: "error", message : "El carrito esta vacio"});
        }
        
        //por cada producto dentro del carrito se actualiza el stock, se guarda en el ticket generado y se suma al precio total de la compra
        for (let i = 0; i < cart.products.length; i++){
            const productInDB = await prodController.getById(cart.products[i]._id)
            if(cart.products[i].quantity<=productInDB.stock){
                //actualizar stock
                const newStock = productInDB.stock - cart.products[i].quantity
                await prodController.updateStock(cart.products[i]._id, newStock)
                //agregar el producto comprado
                productsPurchased.push(cart.products[i]._id.toString())
                //sumar el amount
                const totalPriceProduct = productInDB.price * cart.products[i].quantity
                totalPurchasePrice = totalPurchasePrice + totalPriceProduct
            } else {
                productsRetained.push(cart.products[i]._id.toString());
                req.logger.warn(`El producto con el id ${cart.products[i]._id} no se pudo agregar a la compra`)
            }
        }
        //eliminar el producto del carrito
        productsPurchased.forEach((prodId) => {
            for (let i = 0; i < cart.products.length; i++){
                let index = cart.products.indexOf(prodId)
                cart.products.splice(index, 1);
            }
        })

        //actualizar carrito
        await cart.save()
        
        // si hay productos sin stock sufiente
        if(productsRetained.length>0){
            return res.status(500).send({status: "error", message : "La compra no se pudo completar debido a que hay productos que no tienen stock suficiente", products:productsRetained});
        }
        
        //generar ticket
        const ticket = {
            amount:totalPurchasePrice,
            purchaser:user.email,
            productsPurchased:productsPurchased
        }

        const newTicket = await ticketController.create(ticket);

        req.logger.info("ticket creado correctamente");
        //armado del transporter para el mail
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 587,
            auth: {
                user: '61k4r16@gmail.com',
                pass: 'mbfucnhibzjxniik',
            },
        });
        
        //envio de mail
        const mailOptions = {
            from: '61k4r16@gmail.com',
            to: user.email, 
            subject: 'Gracias por su compra!',
            html: 
            `
            <div>Gracias por su compra</div>
            <div>
            <p>codigo del ticket de compra: ${newTicket.code}</p>
            <p>Subtotal: ${newTicket.amount}</p>
            <p>Realizar la transferencia bancaria a este CBU: eccomerce.backend.proyect.00443355</p>
            <p>Saludos Cordiales.</p>
            </div>
            `,
        };
        
        await transporter.sendMail(mailOptions);

        return res.status(200).send({status: "success", message : "Se ha generado el ticket exitosamente", ticket: newTicket});

    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : "No se pudo generar el ticket de compra, error:" + error.message});
    }
}