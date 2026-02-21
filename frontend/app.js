const generateBtn = document.getElementById("generateBtn");
const statusBox = document.getElementById("status");

generateBtn.addEventListener("click", async () => {
  const spec = document.getElementById("spec").value.trim();

  if (!spec) {
    statusBox.textContent = "Please enter a project description.";
    return;
  }

  statusBox.textContent = "Forging your project...";

  try {
    const response = await fetch("http://localhost:5050/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spec }),
    });

    if (!response.ok) {
      statusBox.textContent = "Error generating project.";
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "project.zip";
    a.click();

    window.URL.revokeObjectURL(url);

    statusBox.textContent = "Project forged successfully!";
  } catch (err) {
    console.error(err);
    statusBox.textContent = "Failed to connect to backend.";
  }
});
