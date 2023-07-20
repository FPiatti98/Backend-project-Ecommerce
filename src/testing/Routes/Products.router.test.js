import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080')

describe('Testing router de products', () =>  {
    describe('Test API de products', () => {
        it("Crear producto: El API POST /mongodb/api/products debe crear un nuevo producto correctamente", async() => {
            const productMock = {
                title: "teclado akko",
                description : "inhalambrico, 75%, ANSI",
                price : 80000,
                thumbnail : ["/images/tecladoakko.png"],
                stock : 9,
                category : "Teclado"
            }
            const {
                statuscode,
                ok,
                _body
            } = await requester.post('/mongodb/api/products').send(productMock);

            expect(statuscode).is.eqls(200);
            expect(_body.payload).is.ok.and.to.have.property('_id');
        });
        it("Crear producto incompleto: El API POST /mongodb/api/products debe retornar un status 400 si el producto se envia incompleto", async() => {
            const productMock = {
                title: "teclado akko",
                price : 80000,
                thumbnail : ["/images/tecladoakko.png"],
                stock : 9,
                category : "Teclado"
            }
            const {
                statuscode,
                ok,
                _body
            } = await requester.post('/mongodb/api/products').send(productMock);

            expect(statuscode).is.eqls(400);
            expect(_body).is.ok.and.to.have.property('message');
        })
        it("Obtener productos: El API GET /mongodb/api/products debe enviar todos los productos con un paginate aplicado", async() => {
            const {
                statuscode,
                ok,
                _body
            } = await requester.get('/mongodb/api/products')

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('docs');
        });
        it("Obtener producto: El API GET /mongodb/api/products/id debe enviar el producto con el mismo id que el param", async() => {

            const prodIdMock = '640e4104446bd20294ff83d4'

            const {
                statuscode,
                ok,
                _body
            } = await requester.get(`/mongodb/api/products/${prodIdMock}`)

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        });
        it("Obtener un producto inexistente: El API GET /mongodb/api/products/id debe enviar un status 400 si el id del producto no existe", async() => {

            const prodIdMock = '12345'

            const {
                statuscode,
                ok,
                _body
            } = await requester.get(`/mongodb/api/products/${prodIdMock}`)

            expect(statuscode).is.eqls(400);
            expect(_body).is.ok.and.to.have.property('message');
        });
        it("updatear producto: El API PUT /mongodb/api/products/id debe actualizar el producto con el id mismo id que el param", async() => {

            const prodIdMock = '640e4104446bd20294ff83d4'

            const updatedProdMock = {
                price : 12000,
                stock : 12
            }

            const {
                statuscode,
                ok,
                _body
            } = await requester.put(`/mongodb/api/products/${prodIdMock}`).send(updatedProdMock)

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        });
        it("Eliminar un producto: El API DELETE /mongodb/api/products/id debe eliminar el producto que tenga el mismo id que el param", async() => {

            const prodIdMock = '640e4104446bd20294ff83d4'

            const {
                statuscode,
                ok,
                _body
            } = await requester.delete(`/mongodb/api/products/${prodIdMock}`)

            expect(statuscode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        });
    })
})