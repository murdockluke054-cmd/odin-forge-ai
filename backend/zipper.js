import JSZip from "jszip";

export async function createZip(files) {
  const zip = new JSZip();

  // Loop through the file tree and add each file
  for (const filePath in files) {
    zip.file(filePath, files[filePath]);
  }

  // Generate ZIP as a Node buffer
  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

  return zipBuffer;
}
