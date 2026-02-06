import { Router } from "express";
import { listarCategorias } from "../controllers/centroCusto.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/centro-custo",
  authMiddleware,
  listarCategorias
);

export default router;
