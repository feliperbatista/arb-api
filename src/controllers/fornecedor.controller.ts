import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getPool } from "../config/db";

export async function listarCategorias(req: AuthRequest, res: Response) {
  const { base, cliente } = req.user!;

  const tabela = `${cliente}_Fornecedores`;

  try {
    const pool = await getPool(base);

    const result = await pool.query(`
      SELECT Nome,
        Nome_Fantasia
      FROM ${tabela}
      ORDER BY Nome
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}

export async function criarFornecedor(req: AuthRequest, res: Response) {
  const { base, cliente } = req.user!;
  const { nome, nomeFantasia } = req.body as {
    nome?: string;
    nomeFantasia?: string;
  };

  if (!nome) {
    return res.status(400).json({ error: "Campo 'nome' é obrigatório" });
  }

  const tabela = `${cliente}_Fornecedores`;

  try {
    const pool = await getPool(base);

    await pool
      .request()
      .input("Nome", nome)
      .input("Nome_Fantasia", nomeFantasia ?? null)
      .query(`
        INSERT INTO ${tabela} (Nome, Nome_Fantasia)
        VALUES (@Nome, @Nome_Fantasia);
      `);

    return res.status(201).json({ message: "Fornecedor criado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar fornecedor" });
  }
}
