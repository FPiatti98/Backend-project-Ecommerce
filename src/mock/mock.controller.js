import {faker} from '@faker-js/faker'

faker.locale = 'es';

export const sendProds = async(req, res) => {
    try {
        const products = []
        for (let i=1; i<=100; i++){
            const product = {
                _id: faker.random.alphaNumeric(20),
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: Number(faker.commerce.price(5000, 500000)),
                thumbnail: [faker.image.abstract(720, 1080)],
                code: faker.random.alphaNumeric(6),
                stock: Number(faker.random.numeric(2)),
                status: true,
                category: faker.commerce.department()
            }
            products.push(product);
        };
        const payload = {
            products: products,
            cantidadDeProductos: products.length
        }
        res.status(200).send(payload)
    } catch (error) {
        res.status(500).send({status: 'error', mesage: 'error: ' + error})
    }
}