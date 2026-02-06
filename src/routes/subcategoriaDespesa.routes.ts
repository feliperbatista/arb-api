import { Router } from "express";
import { listarCategorias } from "../controllers/subcategoriaDespesa.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/subcategoria-despesa",
  authMiddleware,
  listarCategorias
);

export default router;
