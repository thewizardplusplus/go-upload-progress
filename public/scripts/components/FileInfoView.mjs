import { Text, Tag } from "../markup.mjs";
import { FilePropertyViews } from "./FilePropertyViews.mjs";

const formatLocale = "en-US";
const sizeFormatOptions = { style: "unit" };
const sizeFormatUnits = ["byte", "kilobyte", "megabyte", "gigabyte"];
const datetimeFormatOptions = { dateStyle: "full", timeStyle: "long" };

export function FileInfoView(attributes) {
  return new Tag("div", { class: "card mb-3" }, [
    new Tag("div", { class: "card-body d-flex" }, [
      new Tag("dl", { class: "flex-grow-1 me-3 mb-0" }, [
        ...FilePropertyViews({
          name: "Name:",
          valueIcon: "bi-link",
          valueTag: new Tag(
            "a",
            { href: `/files/${attributes.fileInfo.Name}` },
            [new Text(attributes.fileInfo.Name)]
          ),
        }),
        ...FilePropertyViews({
          name: "Size:",
          valueIcon: "bi-file-earmark",
          valueTag: new Text(formatSize(attributes.fileInfo.SizeInB)),
        }),
        ...FilePropertyViews({
          name: "Modification time:",
          valueIcon: "bi-calendar",
          valueTag: new Tag("time", { datetime: attributes.fileInfo.ModTime }, [
            new Text(formatDatetime(attributes.fileInfo.ModTime)),
          ]),
          isLast: true,
        }),
      ]),
      new Tag(
        "button",
        {
          class: "btn btn-outline-secondary align-self-start",
          onclick: attributes.onFileDeleting,
        },
        [new Tag("i", { class: "bi-trash" })]
      ),
    ]),
  ]);
}

function formatSize(sizeInB) {
  let size = sizeInB;
  let unitIndex = 0;
  while (size > 1024) {
    size /= 1024;
    unitIndex++;
  }

  const formatter = new Intl.NumberFormat(formatLocale, {
    ...sizeFormatOptions,
    unit: sizeFormatUnits[unitIndex],
  });
  return formatter.format(size);
}

function formatDatetime(datetime) {
  const parsedDatetime = new Date(datetime);

  const formatter = new Intl.DateTimeFormat(formatLocale, {
    ...datetimeFormatOptions,
  });
  return formatter.format(parsedDatetime);
}
