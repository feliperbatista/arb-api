import express from "express";
import "dotenv/config";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, () => {
  console.log("🚀 API rodando na porta 3000");
});
