"use client";
// utils/fileUtils.ts
import JSZip from "jszip";

interface Project {
  title: string;
  downloadUrls: string[];
}

export async function combineAndDownload(
  project: Project,
  setIsLoading: (isLoading: boolean) => void
) {
  setIsLoading(true);

  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    console.error('This function can only be run in a browser environment');
    setIsLoading(false);
    return;
  }

  if (!("showSaveFilePicker" in window)) {
    alert(
      "Your browser doesn't support this feature. Files will be downloaded separately."
    );
    handleDownload(project.downloadUrls);
    setIsLoading(false);
    return;
  }

  let saveHandle;
  try {
    // Call showSaveFilePicker immediately after user interaction
    saveHandle = await (window as any).showSaveFilePicker({
      suggestedName: `${project.title}.zip`,
      types: [
        {
          description: "ZIP Archive",
          accept: { "application/zip": [".zip"] },
        },
      ],
    });
  } catch (err) {
    // User cancelled the save dialog
    if (err instanceof Error && err.name === "AbortError") {
      console.log("File save cancelled by user");
    } else {
      console.error("Error opening file picker:", err);
      alert(
        "Unable to open file picker. Files will be downloaded separately."
      );
      handleDownload(project.downloadUrls);
    }
    setIsLoading(false);
    return;
  }

  try {
    const mainZip = new JSZip();
    // Fetch all files, extract their contents, and add to the main zip
    await Promise.all(
      project.downloadUrls.map(async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        // Read the zip file
        const zip = await JSZip.loadAsync(blob);
        // Extract and add each file from the zip to the main zip
        await Promise.all(
          Object.keys(zip.files).map(async (filename) => {
            const content = await zip.files[filename].async("blob");
            mainZip.file(filename, content);
          })
        );
      })
    );
    // Generate the final zip file
    const content = await mainZip.generateAsync({ type: "blob" });
    // Use the previously obtained file handle to save the file
    const writable = await saveHandle.createWritable();
    await writable.write(content);
    await writable.close();
    alert("Files combined and saved successfully!");
  } catch (err) {
    console.error("Error saving file:", err);
    alert(
      "There was an error saving the combined file. Files will be downloaded separately."
    );
    handleDownload(project.downloadUrls);
  } finally {
    setIsLoading(false);
  }
}

function handleDownload(downloadUrls: string[]) {
  downloadUrls.forEach((url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "";
    link.click();
  });
}