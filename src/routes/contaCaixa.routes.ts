import { Router } from "express";
import { listarCategorias } from "../controllers/contaCaixa.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/conta-caixa",
  authMiddleware,
  listarCategorias
);

export default router;
