import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080')

describe('Testing router de carts', () =>  {
    describe('Test API de carts', () => {
        it("Crear cart: El API POST /mongodb/api/carts debe crear un nuevo carrito correctamente", async() => {
            const {
                statuscode,
                ok,
                _body
            } = await requester.post('/mongodb/api/carts')

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        });
        it("obtener cart: El API GET /mongodb/api/carts/:id debe enviar el carrito con el id especificado en el param", async() => {

            const mockCartId = "641501090cd3fa0a61861a7c"

            const {
                statuscode,
                ok,
                _body
            } = await requester.get(`/mongodb/api/carts/${mockCartId}`)

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        });
        it("Agregar un producto a un carrito: El API POST /mongodb/api/carts/:cid/product/:pid debe agregar un producto al carrito con el id especificado en el param", async() => {

            const mockCartId = "641501090cd3fa0a61861a7c"
            const mockProductId = "640e4104446bd20294ff83d4"

            const {
                statuscode,
                ok,
                _body
            } = await requester.post(`/mongodb/api/carts/${mockCartId}/product/${mockProductId}`)

            expect(statuscode).is.eqls(200);
        });
        it("Eliminar un producto a un carrito: El API DELETE /mongodb/api/carts/:cid/product/:pid debe eliminar un producto al carrito con el id especificado en el param", async() => {

            const mockCartId = "641501090cd3fa0a61861a7c"
            const mockProductId = "640e4104446bd20294ff83d4"

            const {
                statuscode,
                ok,
                _body
            } = await requester.delete(`/mongodb/api/carts/${mockCartId}/product/${mockProductId}`)

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        });
        it("Actualizar la cantidad de un producto en un carrito: El API PUT /mongodb/api/carts/:cid/product/:pid debe actualizar la cantidad de un producto al carrito con el id especificado en el param", async() => {

            const mockCartId = "641501090cd3fa0a61861a7c"
            const mockProductId = "640e4104446bd20294ff83d4"
            const mockQuantity = {
                quantity: 5
            }

            const {
                statuscode,
                ok,
                _body
            } = await requester.put(`/mongodb/api/carts/${mockCartId}/product/${mockProductId}`).send(mockQuantity)

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('message');
        });
        it("Actualizar la cantidad erronea de un producto en un carrito: El API PUT /mongodb/api/carts/:cid/product/:pid debe enviar un satus 400 si la quantity no se encuentra en el req.body", async() => {

            const mockCartId = "641501090cd3fa0a61861a7c"
            const mockProductId = "640e4104446bd20294ff83d4"
            const mockQuantity = undefined

            const {
                statuscode,
                ok,
                _body
            } = await requester.put(`/mongodb/api/carts/${mockCartId}/product/${mockProductId}`).send(mockQuantity)

            expect(statuscode).is.eqls(400);
            expect(_body).is.ok.and.to.have.property('message');
        });
        it("Eliminar un carrito: El API DELETE /mongodb/api/carts/:cid debe eliminar el carrito con el id especificado en el param", async() => {

            const mockCartId = "641501090cd3fa0a61861a7c"

            const {
                statuscode,
                ok,
                _body
            } = await requester.delete(`/mongodb/api/carts/${mockCartId}/product/${mockProductId}`).send(mockQuantity)

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        });
        it("Crear un ticket: El API GET /mongodb/api/carts/:cid/purchase debe crear un ticket con los productos que se encuentran en el carrito con el id especificado en el param", async() => {

            const mockCartId = "641501090cd3fa0a61861a7c"

            const {
                statuscode,
                ok,
                _body
            } = await requester.get(`/mongodb/api/carts/${mockCartId}/purchase`)

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        });
        it("Crear un ticket con productos que non tienen stock: El API GET /mongodb/api/carts/:cid/purchase debe enviar un status 500 si se intentan comprar productos que no tienen suficiente stock", async() => {

            const mockCartId = "641501090cd3fa0a61861a7c"

            const {
                statuscode,
                ok,
                _body
            } = await requester.get(`/mongodb/api/carts/${mockCartId}/purchase`)

            expect(statuscode).is.eqls(400);
            expect(_body).is.ok.and.to.have.property('message');
        });
    })
})