import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080')

describe('Testing router de session', () =>  {
    describe('Test API de session', () => {
        it("Registrar usuario: El API POST /api/sessions/register debe registrar un usuario", async() => {
            const userMock = {
                first_name: "Jorge",
                last_name: "Martin",
                email: "jorgemartin@gmail.com",
                age: 24,
                password : "hola1234",
            };
            const {
                statuscode,
                ok,
                _body
            } = await requester.post('/api/sessions/register').send(userMock);

            expect(statuscode).is.eqls(201);
            expect(_body.payload).is.ok.and.to.have.property('message');
        });
        it("Registrar usuario que ya existe: El API POST /api/sessions/register debe enviar un status 500 si el usuario ya existe", async() => {
            const userMock = {
                first_name: "Jorge",
                last_name: "Martin",
                email: "jorgemartin@gmail.com",
                age: 24,
                password : "hola1234",
            };
            const {
                statuscode,
                ok,
                _body
            } = await requester.post('/api/sessions/register').send(userMock);

            expect(statuscode).is.eqls(400);
            expect(_body.payload).is.ok.and.to.have.property('message');
        });
        it("Loguear usuario: El API POST /api/sessions/login debe loguear un usuario", async() => {
            const userMock = {
                email: "jorgemartin@gmail.com",
                password : "hola1234",
            };
            const {
                statuscode,
                ok,
                _body
            } = await requester.post('/api/sessions/register').send(userMock);

            expect(statuscode).is.eqls(201);
            expect(_body.payload).is.ok.and.to.have.property('message');
        });
        it("Loguear usuario con credenciales incorrectas: El API POST /api/sessions/login debe enviar un status 401 si las credenciuales son incorrectas", async() => {
            const userMock = {
                email: "hola1234@gmail.com",
                password : "hola1234",
            };
            const {
                statuscode,
                ok,
                _body
            } = await requester.post('/api/sessions/register').send(userMock);

            expect(statuscode).is.eqls(401);
            expect(_body.payload).is.ok.and.to.have.property('error');
        });
    })
})