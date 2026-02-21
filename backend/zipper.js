import JSZip from "jszip";

export async function zipProject(files) {
  const zip = new JSZip();

  for (const [filename, content] of Object.entries(files)) {
    zip.file(filename, content);
  }

  return await zip.generateAsync({ type: "nodebuffer" });
}
