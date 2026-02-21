export async function generateProject(spec) {
  return {
    "README.md": `# Generated Project\n\nSpec:\n${spec}\n`,
    "index.js": `console.log("Project generated from spec: ${spec}");`
  };
}
