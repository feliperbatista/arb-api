import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getPool } from "../config/db";

export async function listarCategorias(req: AuthRequest, res: Response) {
  const { base, cliente } = req.user!;

  const tabelaCaixas = `${cliente}_Caixas_Financeiros`;
  const tabelaContas = `${cliente}_Lista_Bancos`;

  try {
    const pool = await getPool(base);



    
    const result = await pool.query(`
        SELECT CAIXA, 'Caixa' AS Tipo FROM ${tabelaCaixas}
        UNION ALL
        SELECT Nome, 'Conta' AS Tipo FROM ${tabelaContas}
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}
