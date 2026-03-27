import { Router } from "express";
import {
  listarCategorias,
  criarFornecedor,
} from "../controllers/fornecedor.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/fornecedor", authMiddleware, listarCategorias);

router.post("/fornecedor", authMiddleware, criarFornecedor);

export default router;
