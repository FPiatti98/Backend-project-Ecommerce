import { Router } from "express";
import { updateUser , deleteUser , deleteMany } from '../controllers/users.controller.js';
import { addLogger } from "../config/logger.js";
import { checkAdmin } from "../config/passport.config.js";

const router = Router();

router.use(addLogger);

//Controller
router.delete('/:email', checkAdmin, deleteUser);
router.put('/:email', checkAdmin, updateUser);
router.get('/deletemany', checkAdmin, deleteMany);

export default router