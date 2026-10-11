// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var port = Number(process.env.PORT) || 3e3;
app.use(express.json());
var distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Maulana Shamsuddin Spiritual Services Portal" });
});
app.get("*", (_req, res) => {
  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send("Application is building, please refresh in a moment.");
  }
});
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
