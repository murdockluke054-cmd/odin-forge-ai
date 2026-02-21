import express from "express";
import cors from "cors";
import { generateProject } from "./generator.js";
import { zipProject } from "./zipper.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { spec } = req.body;

    if (!spec) {
      return res.status(400).json({ error: "Missing spec" });
    }

    const projectFiles = await generateProject(spec);
    const zipBuffer = await zipProject(projectFiles);

    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=project.zip"
    });

    res.send(zipBuffer);
  } catch (err) {
    console.error("Error generating project:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5050, () => {
  console.log("Odin Forge AI backend running on port 5050");
});
