import { Router } from "express";
import { listarCategorias } from "../controllers/fornecedor.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/fornecedor",
  authMiddleware,
  listarCategorias
);

export default router;
