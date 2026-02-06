import { Router } from "express";
import { listarCategorias } from "../controllers/formaPagamento.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/forma-pagamento",
  authMiddleware,
  listarCategorias
);

export default router;
