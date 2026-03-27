import sql from "mssql";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { getPool } from "../config/db";
import { StringValue } from "ms";

export async function login(req: any, res: any) {
  console.log("HEADERS:", req.headers);
  console.log("RAW BODY:", req.rawBody);
  console.log("BODY:", req.body);

  const { usuario, senha } = req.body;


  if (!usuario || !senha) {
    return res.status(400).json({ error: "Usuário e senha obrigatórios" });
  }

  try {
    const pool = await getPool(process.env.DB_NAME!);

    const result = await pool
      .request()
      .input("usuario", sql.VarChar, usuario)
      .input("senha", sql.VarChar, senha)
      .query(`
        SELECT
          Nome_Usuario,
          Base,
          Empresa
        FROM Login_Novo
        WHERE Usuario = @usuario
          AND Senha = @senha
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const user = result.recordset[0];

    const jwtSecret = process.env.JWT_SECRET as Secret;
    const jwtOptions: SignOptions = {
      expiresIn: process.env.JWT_EXPIRES as StringValue || "8h"
    };

    const token = jwt.sign(
      {
        usuario,
        base: user.Base,
        cliente: user.Empresa
      },
      jwtSecret,
      jwtOptions
    );

    return res.json({
      token,
      usuario: user.Nome_Usuario,
      empresa: user.Empresa
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno" });
  }
}
