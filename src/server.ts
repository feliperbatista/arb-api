import express from "express";
import "dotenv/config";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://payables-wizard.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // only if you use cookies/auth
}));

app.use(express.json());


app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 API rodando na porta 3000");
});
