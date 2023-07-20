import {response, Router} from 'express';
import { cartModel } from '../../service/db/models/cart.model.js';
import { checkAuth } from '../../config/passport.config.js';

const router = Router();

router.get('/carts/:id',checkAuth, async(req, res) => {
    try {
        //se popula el carrito para traer la informacion de los productos
        const cart = await cartModel.findById(req.params.id).populate('products._id').lean();
        return res.render('cart', {cart : cart});
    } catch (error) {
        return res.status(500).send({status: "error", message : error.message});
    }
})

export default router
