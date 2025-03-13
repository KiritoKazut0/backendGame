import { updateStatusLevel } from "../controllers/ChangeStatusLevel.controller";
import { InsertLevel } from "../controllers/createLevels.controller";
import { createUser } from "../controllers/createUser.controller";
import { listLevels } from "../controllers/listLevel.controller";
import { Login } from "../controllers/Login.controller";
import { Router } from "express";

const router = Router();

router.post('/levelCreate', InsertLevel);
router.put('/changeStatus', updateStatusLevel)
router.get('/listLevel/:id', listLevels);
router.post('/create', createUser);
router.post('/login', Login)


export default router;
