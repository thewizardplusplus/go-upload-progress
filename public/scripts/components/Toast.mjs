import { Text, Tag, removeElementByID } from "../libs/markup.mjs";

export const immortalToastLifetimeInMs = 0;
export const defaultToastLifetimeInMs = 2000;

export function Toast(attributes) {
  attributes = { lifetimeInMs: defaultToastLifetimeInMs, ...attributes };

  const toastID = `toast-${attributes.id}`;
  const removalTimeoutID =
    attributes.lifetimeInMs !== immortalToastLifetimeInMs
      ? setTimeout(() => removeElementByID(toastID), attributes.lifetimeInMs)
      : undefined;
  const body =
    typeof attributes.body === "string" || attributes.body instanceof String
      ? [new Text(attributes.body)]
      : !Array.isArray(attributes.body)
      ? [attributes.body]
      : attributes.body;
  return new Tag(
    "div",
    {
      id: toastID,
      class: `toast border-${attributes.kind.colorStyle} show`,
    },
    [
      new Tag(
        "div",
        { class: `toast-header border-${attributes.kind.colorStyle}` },
        [
          new Tag("i", {
            class: `${attributes.kind.icon} text-${attributes.kind.colorStyle}`,
          }),
          new Text("\u00a0"),
          new Tag(
            "strong",
            { class: `text-${attributes.kind.colorStyle} flex-grow-1` },
            [new Text(attributes.kind.title)]
          ),
          new Tag("button", {
            class: "btn-close",
            type: "button",
            onclick: () => {
              clearTimeout(removalTimeoutID);
              removeElementByID(toastID);
            },
          }),
        ]
      ),
      new Tag("div", { class: "toast-body" }, body),
    ]
  );
}