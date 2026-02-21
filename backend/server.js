import express from "express";
import cors from "cors";
import { generateProject } from "./generator.js";
import { createZip } from "./zipper.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.post("/generate", async (req, res) => {
  try {
    const { spec } = req.body;

    if (!spec) {
      return res.status(400).json({ error: "Missing spec" });
    }

    // Generate file structure + code
    const files = await generateProject(spec);

    // Create ZIP buffer
    const zipBuffer = await createZip(files);

    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=project.zip",
    });

    return res.send(zipBuffer);
  } catch (err) {
    console.error("Generation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Odin Forge AI backend running on ${PORT}`));
