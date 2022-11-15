import { Text, Tag, removeElementByID } from "../libs/markup.mjs";

export function Toast(attributes) {
  const toastID = `toast-${attributes.id}`;
  const timeoutID =
    attributes.lifetimeInMs !== undefined
      ? setTimeout(() => removeElementByID(toastID), attributes.lifetimeInMs)
      : undefined;
  return new Tag(
    "div",
    {
      id: toastID,
      class: `toast border-${attributes.toastKind.colorStyle} show`,
    },
    [
      new Tag(
        "div",
        { class: `toast-header border-${attributes.toastKind.colorStyle}` },
        [
          new Tag("i", {
            class: `${attributes.toastKind.icon} text-${attributes.toastKind.colorStyle}`,
          }),
          new Text("\u00a0"),
          new Tag(
            "strong",
            { class: `text-${attributes.toastKind.colorStyle} flex-grow-1` },
            [new Text(attributes.toastKind.title)]
          ),
          new Tag("button", {
            class: "btn-close",
            type: "button",
            onclick: () => {
              clearTimeout(timeoutID);
              removeElementByID(toastID);
            },
          }),
        ]
      ),
      new Tag("div", { class: "toast-body" }, [new Text(attributes.message)]),
    ]
  );
}
