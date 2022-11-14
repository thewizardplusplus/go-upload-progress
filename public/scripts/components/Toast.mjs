import { Text, Tag } from "../libs/markup.mjs";

export function Toast(attributes) {
  return new Tag(
    "div",
    { class: `toast border-${attributes.colorStyle} show` },
    [
      new Tag(
        "div",
        { class: `toast-header border-${attributes.colorStyle}` },
        [
          new Tag("i", {
            class: `${attributes.icon} text-${attributes.colorStyle}`,
          }),
          new Text("\u00a0"),
          new Tag(
            "strong",
            { class: `text-${attributes.colorStyle} flex-grow-1` },
            [new Text(attributes.title)]
          ),
          new Tag("button", {
            class: "btn-close",
            type: "button",
            onclick: (event) => {
              const closeButton = event.target;
              const toastHeaderView = closeButton.parentElement;
              const toastView = toastHeaderView.parentElement;
              toastView.remove();
            },
          }),
        ]
      ),
      new Tag("div", { class: "toast-body" }, [new Text(attributes.message)]),
    ]
  );
}
