import express from "express";
import cors from "cors";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Enable CORS for all origins
app.use(cors());

// 🔁 Endpoint to generate + send PDF
app.get("/generate-pdf", (req, res) => {
  exec("node generatePDF.cjs", (err, stdout, stderr) => {
    if (err) {
      console.error("PDF generation error:", stderr);
      return res.status(500).send("Failed to generate PDF");
    }
    console.log(stdout);
    const filePath = path.join(__dirname, "inzighted_report.pdf");
    res.download(filePath);
  });
});

app.listen(port, () => {
  console.log(`✅ PDF server running at http://localhost:${port}`);
});
