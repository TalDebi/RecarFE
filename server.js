import expressApp from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";
import https from "https";
const __filename = fileURLToPath(import.meta.url);
const privateKey = fs.readFileSync("client-key.pem");
const certificate = fs.readFileSync("client-cert.pem");
const __dirname = dirname(__filename);
const app = expressApp();
const PORT = 443;

app.use(expressApp.static(path.join(__dirname, "dist")));

// Handle other routes by serving the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const server = https.createServer({ key: privateKey, cert: certificate }, app);

server.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT} (HTTPS)`);
});
