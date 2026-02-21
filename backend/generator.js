export async function generateProject(spec) {
  // Very simple starter generator:
  // Takes the user's text spec and produces a minimal project structure.

  const files = {
    "README.md": `# Generated Project\n\nSpec used:\n${spec}\n`,
    "src/index.js": `console.log("Project generated from spec: ${spec.replace(/`/g, "")}");`,
    "src/config.js": `export const config = { name: "Odin Forge AI Project" };`,
    "package.json": JSON.stringify(
      {
        name: "odin-forge-ai-project",
        version: "1.0.0",
        main: "src/index.js",
        scripts: {
          start: "node src/index.js",
        },
      },
      null,
      2
    ),
  };

  return files;
}
