async function UpdateFileList() {
  const response = await fetch("/api/v1/files");
  const fileInfos = await response.json();

  const fileListView = document.querySelector(".file-list");
  RemoveAllChildren(fileListView);

  fileInfos.forEach((fileInfo) => {
    const fileInfoView = new Tag("li", [CreateFileInfoView(fileInfo)]);
    fileListView.appendChild(fileInfoView.toDOM());
  });
}

window.addEventListener("DOMContentLoaded", UpdateFileList);

// https://developer.mozilla.org/en-US/docs/Web/API/Node#remove_all_children_nested_within_a_node
function RemoveAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function CreateFileInfoView(fileInfo) {
  return new Tag("div", { class: "card mb-3" }, [
    new Tag("div", { class: "card-body" }, [
      new Tag("dl", { class: "mb-0" }, [
        ...CreateFilePropertyViews(
          "Name:",
          "bi-link",
          new Tag("a", { href: `/files/${fileInfo.Name}` }, [
            new Text(fileInfo.Name),
          ])
        ),
        ...CreateFilePropertyViews(
          "Size:",
          "bi-file-earmark",
          new Text(FormatSize(fileInfo.Size))
        ),
        ...CreateFilePropertyViews(
          "Modification time:",
          "bi-calendar",
          new Tag("time", { datetime: fileInfo.ModTime }, [
            new Text(FormatDatetime(fileInfo.ModTime)),
          ]),
          true
        ),
      ]),
    ]),
  ]);
}

function CreateFilePropertyViews(name, valueIcon, valueTag, isLast = false) {
  return [
    new Tag("dt", [new Text(name)]),
    new Tag("dd", isLast ? { class: "mb-0" } : undefined, [
      new Tag("i", { class: valueIcon }),
      new Text("\u00a0"),
      valueTag,
    ]),
  ];
}

function FormatSize(size) {
  const units = ["byte", "kilobyte", "megabyte", "gigabyte"];

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
