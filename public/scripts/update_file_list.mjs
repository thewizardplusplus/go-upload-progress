import * as api from "./api.mjs";
import { Text, Tag, removeAllChildren } from "./markup.mjs";
import { FilePropertyViews } from "./components/FilePropertyViews.mjs";

export async function updateFileList() {
  const fileInfos = await api.getFiles();

  const fileListView = document.querySelector(".file-list");
  removeAllChildren(fileListView);

  fileInfos.forEach((fileInfo) => {
    const fileInfoView = new Tag("li", [CreateFileInfoView(fileInfo)]);
    fileListView.appendChild(fileInfoView.toDOM());
  });
}

window.addEventListener("DOMContentLoaded", updateFileList);

function CreateFileInfoView(fileInfo) {
  return new Tag("div", { class: "card mb-3" }, [
    new Tag("div", { class: "card-body d-flex" }, [
      new Tag("dl", { class: "flex-grow-1 me-3 mb-0" }, [
        ...FilePropertyViews({
          name: "Name:",
          valueIcon: "bi-link",
          valueTag: new Tag("a", { href: `/files/${fileInfo.Name}` }, [
            new Text(fileInfo.Name),
          ]),
        }),
        ...FilePropertyViews({
          name: "Size:",
          valueIcon: "bi-file-earmark",
          valueTag: new Text(FormatSize(fileInfo.SizeInB)),
        }),
        ...FilePropertyViews({
          name: "Modification time:",
          valueIcon: "bi-calendar",
          valueTag: new Tag("time", { datetime: fileInfo.ModTime }, [
            new Text(FormatDatetime(fileInfo.ModTime)),
          ]),
          isLast: true,
        }),
      ]),
      new Tag(
        "button",
        {
          class: "btn btn-outline-secondary align-self-start",
          onclick: async () => {
            await api.deleteFile(fileInfo.Name);
            await updateFileList();
          },
        },
        [new Tag("i", { class: "bi-trash" })]
      ),
    ]),
  ]);
}

function FormatSize(sizeInB) {
  const units = ["byte", "kilobyte", "megabyte", "gigabyte"];

  let size = sizeInB;
  let unitIndex = 0;
  while (size > 1024) {
    size /= 1024;
    unitIndex++;
  }

  const formatOptions = { style: "unit", unit: units[unitIndex] };
  return new Intl.NumberFormat("en-US", formatOptions).format(size);
}

function FormatDatetime(datetime) {
  const parsedDatetime = new Date(datetime);

  const formatOptions = { dateStyle: "full", timeStyle: "long" };
  return new Intl.DateTimeFormat("en-US", formatOptions).format(parsedDatetime);
}
