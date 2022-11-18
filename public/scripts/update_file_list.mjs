import { withErrorDisplaying } from "./show_toast.mjs";
import * as api from "./libs/api.mjs";
import { Tag, removeAllChildren } from "./libs/markup.mjs";
import { FileInfoView } from "./components/FileInfoView.mjs";

const defaultFileListUpdatingTimeout = 1000;

export async function updateFileList() {
  await withErrorDisplaying(async () => {
    const fileInfos = await api.getFiles();

    const fileListView = document.querySelector(".file-list");
    removeAllChildren(fileListView);

    fileInfos.forEach((fileInfo) => {
      const fileInfoView = new Tag("li", [
        FileInfoView({
          fileInfo,
          onFileDeleting: async () => {
            await withErrorDisplaying(async () => {
              await api.deleteFile(fileInfo.Name);
              await updateFileList();
            });
          },
        }),
      ]);
      fileListView.appendChild(fileInfoView.toDOM());
    });
  });
}

export async function startFileListUpdating() {
  while (true) {
    const startUnixTimeInMs = new Date().getTime();
    await updateFileList();

    const elapsedTimeInMs = new Date().getTime() - startUnixTimeInMs;
    const fileListUpdatingTimeout = Math.max(
      defaultFileListUpdatingTimeout - elapsedTimeInMs,
      0
    );
    await new Promise((resolve) => {
      setTimeout(resolve, fileListUpdatingTimeout);
    });
  }
}
