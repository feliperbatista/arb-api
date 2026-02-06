import { Router } from "express";
import authRoutes from "./auth.routes";
import centroCustoRoutes from "./centroCusto.routes";
import fornecedorRoutes from "./fornecedor.routes";
import formaPagamentoRoutes from "./formaPagamento.routes";
import subcategoriaDespesaRoutes from "./subcategoriaDespesa.routes";
import contaCaixaRoutes from "./contaCaixa.routes";

const router = Router();

router.use(authRoutes);
router.use(centroCustoRoutes);
router.use(fornecedorRoutes);
router.use(formaPagamentoRoutes);
router.use(subcategoriaDespesaRoutes);
router.use(contaCaixaRoutes);

export default router;
