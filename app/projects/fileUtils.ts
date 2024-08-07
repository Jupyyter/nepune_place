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

  if (!("showSaveFilePicker" in window)) {
    alert(
      "Your browser doesn't support file saving. The file will be downloaded directly."
    );
    handleDownload([url]);
    setIsLoading(false);
    return;
  }

  try {
    const saveHandle = await (window as any).showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: "ZIP Archive",
          accept: { "application/zip": [".zip"] },
        },
      ],
    });

    // Start the download
    const response = await fetch(url);
    const blob = await response.blob();

    // Create a writable stream
    const writable = await saveHandle.createWritable();

    // Write the blob to the file
    await writable.write(blob);

    // Close the file and show immediate feedback
    writable.close();

    // Show immediate feedback
    alert("File download started. It will be saved shortly.");
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.log("File save cancelled by user");
    } else {
      console.error("Error saving file:", err);
      alert(
        "There was an error saving the file. It will be downloaded directly."
      );
      handleDownload([url]);
    }
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

    if (!saveHandle) throw new Error("File picker not supported");

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
      }. Files will be downloaded separately.`
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
