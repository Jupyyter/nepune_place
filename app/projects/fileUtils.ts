"use client";
import JSZip from "jszip";

interface Project {
  title: string;
  downloadUrls: string[];
}

export async function downloadSingleFile(
  url: string,
  fileName: string,
  setIsLoading: (isLoading: boolean) => void
) {
  setIsLoading(true);

  if (typeof window === "undefined") {
    console.error("This function can only be run in a browser environment");
    setIsLoading(false);
    return;
  }

  try {
    // Fetch the file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();

    // Create a URL for the blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.download = fileName;

    // Append to the document and trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

    // Show feedback
    alert("File downloaded successfully!");
  } catch (err) {
    console.error("Error downloading file:", err);
    alert("There was an error downloading the file. Please try again.");
  } finally {
    setIsLoading(false);
  }
}

export async function combineAndDownload(
  project: Project,
  setIsLoading: (isLoading: boolean) => void
) {
  setIsLoading(true);
  try {
    if (typeof window === "undefined")
      throw new Error("Browser environment required");

    const saveHandle =
      "showSaveFilePicker" in window
        ? await (window as any).showSaveFilePicker({
            suggestedName: `${project.title}.zip`,
            types: [
              {
                description: "ZIP Archive",
                accept: { "application/zip": [".zip"] },
              },
            ],
          })
        : null;

    if (!saveHandle) {
      handleDownload(project.downloadUrls, `${project.title}.zip`);
      return;
    }

    const mainZip = new JSZip();
    await Promise.all(
      project.downloadUrls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(
            `HTTP error! status: ${response.status} for file: ${url}`
          );
        const zip = await JSZip.loadAsync(await response.blob());
        await Promise.all(
          Object.keys(zip.files).map(async (filename) => {
            mainZip.file(filename, await zip.files[filename].async("blob"));
          })
        );
      })
    );

    const writable = await saveHandle.createWritable();
    await writable.write(await mainZip.generateAsync({ type: "blob" }));
    await writable.close();
    alert("Files combined and saved successfully!");
  } catch (err) {
    console.error("Error:", err);
    alert(
      `Error: ${
        err instanceof Error ? err.message : "Unknown error"
      }. The download has been cancelled.`
    );
  } finally {
    setIsLoading(false);
  }
}

function handleDownload(downloadUrls: string[], fileName?: string) {
  downloadUrls.forEach((url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || url.split("/").pop() || "";
    link.click();
  });
}