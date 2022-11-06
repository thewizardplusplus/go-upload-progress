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
  return new Tag("dl", [
    ...CreateFilePropertyViews(
      "Name",
      new Tag("a", { href: `/files/${fileInfo.Name}` }, [
        new Text(fileInfo.Name),
      ])
    ),
    ...CreateFilePropertyViews("Size", new Text(`${fileInfo.Size} B`)),
    ...CreateFilePropertyViews(
      "ModTime",
      new Tag("time", { datetime: fileInfo.ModTime }, [
        new Text(ReformatDatetime(fileInfo.ModTime)),
      ])
    ),
    new Tag("hr"),
  ]);
}

function CreateFilePropertyViews(name, valueTag) {
  return [new Tag("dt", [new Text(name)]), new Tag("dd", [valueTag])];
}

function ReformatDatetime(datetime) {
  const options = { dateStyle: "full", timeStyle: "full" };

  const parsedDatetime = new Date(datetime);
  return new Intl.DateTimeFormat("en-US", options).format(parsedDatetime);
}
