// FIXME: Fix this directive
import type { Directive, DirectiveBinding, VNode } from "vue";

type Event = TouchEvent | MouseEvent;

type ClickOutHandler = (event?: Event) => void;

interface PopupHtmlElement extends HTMLElement {
  $clickOutside?: {
    callback: (event: Event) => void;
    handler: (event: Event) => void;
  };
}

const validate = (binding: DirectiveBinding<ClickOutHandler>): boolean => {
  if (typeof binding.value !== "function") {
    console.warn(
      "[Vue-click-outside:] provided expression",
      binding.value,
      "is not a function."
    );

    return false;
  }

  return true;
};

const isPopup = (popupItem: Node, elements: Node[]): boolean => {
  if (!popupItem || !elements) return false;

  for (let i = 0, len = elements.length; i < len; i++)
    try {
      if (popupItem.contains(elements[i])) return true;

      if (elements[i].contains(popupItem)) return false;
    } catch (err) {
      return false;
    }

  return false;
};

const isServer = (_vNode: VNode): boolean => false;
// typeof vNode.componentInstance !== "undefined" &&
// vNode.componentInstance.$isServer;

export const clickOutsideDirectice: Directive<
  PopupHtmlElement,
  ClickOutHandler
> = {
  beforeMount: (element, binding, vNode) => {
    if (!validate(binding)) return;

    // Define Handler and cache it on the element
    const handler = (event: Event): void => {
      if (!vNode.appContext) return;

      // Some components may have related popup item, on which we shall prevent the click outside event handler.
      // eslint-disable-next-line
      const elements: Node[] =
        // eslint-disable-next-line
        (event as any).path ||
        (event.composedPath ? (event.composedPath() as Node[]) : []);

      if (elements && elements.length > 0)
        elements.unshift(event.target as Node);

      if (
        element.contains(event.target as Node) ||
        // eslint-disable-next-line
        isPopup((vNode.appContext as any).popupItem, elements)
      )
        return;

      if (element.$clickOutside) element.$clickOutside.callback(event);
    };

    // Add Event Listeners
    element.$clickOutside = {
      handler,
      callback: binding.value,
    };
    const clickHandler =
      "ontouchstart" in document.documentElement ? "touchstart" : "click";

    if (!isServer(vNode)) document.addEventListener(clickHandler, handler);
  },

  beforeUpdate: (element, binding) => {
    if (validate(binding) && element.$clickOutside)
      element.$clickOutside.callback = binding.value;
  },

  beforeUnmount: (element, _binding, vNode) => {
    // Remove Event Listeners
    const clickHandler =
      "ontouchstart" in document.documentElement ? "touchstart" : "click";

    if (!isServer(vNode) && element.$clickOutside)
      document.removeEventListener(clickHandler, element.$clickOutside.handler);

    delete element.$clickOutside;
  },
};
