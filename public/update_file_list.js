async function UpdateFileList() {
  const response = await fetch("/api/v1/files");
  const fileInfos = await response.json();

  const fileListView = document.querySelector(".file-list");
  RemoveAllChildren(fileListView);

  for (const fileInfo of fileInfos) {
    const fileInfoView = CreateFileInfoView(fileInfo);
    const itemView = CreateElementWrapper("li", fileInfoView);
    fileListView.appendChild(itemView);
  }
}

window.addEventListener("DOMContentLoaded", UpdateFileList);

// https://developer.mozilla.org/en-US/docs/Web/API/Node#remove_all_children_nested_within_a_node
function RemoveAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function CreateFileInfoView(fileInfo) {
  const container = document.createElement("dl");

  const linkView = CreateElementWithText("a", fileInfo.Name);
  linkView.setAttribute("href", `/files/${fileInfo.Name}`);
  AppendFilePropertyView(container, "Name", linkView);

  const sizeView = document.createTextNode(`${fileInfo.Size} B`);
  AppendFilePropertyView(container, "Size", sizeView);

  const reformattedModTime = ReformatDatetime(fileInfo.ModTime);
  const timeView = CreateElementWithText("time", reformattedModTime);
  timeView.setAttribute("datetime", fileInfo.ModTime);
  AppendFilePropertyView(container, "ModTime", timeView);

  const separator = document.createElement("hr");
  container.appendChild(separator);

  return container;
}

function AppendFilePropertyView(container, name, valueElement) {
  const nameView = CreateElementWithText("dt", name);
  container.appendChild(nameView);

  const valueView = CreateElementWrapper("dd", valueElement);
  container.appendChild(valueView);
}

function CreateElementWithText(tag, text) {
  const textView = document.createTextNode(text);
  return CreateElementWrapper(tag, textView);
}

function CreateElementWrapper(wrapperTag, element) {
  const wrapper = document.createElement(wrapperTag);
  wrapper.appendChild(element);

  return wrapper;
}

function ReformatDatetime(datetime) {
  const options = { dateStyle: "full", timeStyle: "full" };

  const parsedDatetime = new Date(datetime);
  return new Intl.DateTimeFormat("en-US", options).format(parsedDatetime);
}
