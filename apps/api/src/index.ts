import { config } from "dotenv"; 
import { fileURLToPath } from "node:url";
import express from "express";

config({ path: fileURLToPath(new URL("../../../.env", import.meta.url)) });

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const port = Number(process.env["PORT"] ?? 3000);

app.listen(port, () => {
  console.log(`ClientFlow API listening on http://localhost:${port}`)
});
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
