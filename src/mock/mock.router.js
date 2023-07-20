import { sendProds } from "./mock.controller.js";
import { Router } from "express";

const router = Router();

router.get('/', sendProds);

export default router