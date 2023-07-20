import { Router } from "express";
import { addLogger } from "../config/logger.js";

const router = Router();

router.use(addLogger);

router.get('/debug', (req, res) => {
    req.logger.debug('prueba del logger nivel debug')
    res.send("Prueba de logger debug")
})

router.get('/http', (req, res) => {
    req.logger.http('prueba del logger nivel http')
    res.send("Prueba de logger http")
})

router.get('/info', (req, res) => {
    req.logger.info('prueba del logger nivel info')
    res.send("Prueba de logger info")
})

router.get('/warning', (req, res) => {
    req.logger.warn('prueba del logger nivel warning')
    res.send("Prueba de logger warning")
})

router.get('/error', (req, res) => {
    req.logger.error('prueba del logger nivel error')
    res.send("Prueba de logger error")
})

router.get('/fatal', (req, res) => {
    req.logger.error('prueba del logger nivel fatal')
    res.send("Prueba de logger fatal")
})

export default router


