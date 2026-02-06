import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getPool } from "../config/db";

export async function listarCategorias(req: AuthRequest, res: Response) {
  const { base, cliente } = req.user!;

  const tabela = `${cliente}_Centro_Custo`;

  try {
    const pool = await getPool(base);

    const result = await pool.query(`
      SELECT Categoria
      FROM ${tabela}
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}
