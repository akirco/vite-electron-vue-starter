import type { ExtractPropTypes } from "vue";

export const menuItemProps = {
  icon: {
    type: String,
  },
  content: {
    type: String,
  },
  events: {
    type: Object,
  },
  divider: {
    type: String,
  },
};
export type MenuProps = ExtractPropTypes<typeof menuItemProps>;

class ContextMenu {
  target: string;
  menuItems: MenuProps[];
  mode: string;
  targetNode: NodeListOf<Element>;
  menuItemsNode: HTMLElement[];
  isOpened: boolean;
  constructor({
    target = "#app",
    menuItems = [] as MenuProps[],
    mode = "dark",
  }) {
    this.target = target;
    this.menuItems = menuItems;
    this.mode = mode;
    this.targetNode = this.getTargetNode() as NodeListOf<Element>;
    this.menuItemsNode = this.getMenuItemsNode();
    this.isOpened = false;
  }
  getTargetNode() {
    const node = document.querySelectorAll(this.target);
    if (node && node.length !== 0) {
      return node;
    } else {
      console.log(`The contextmenu default is render and mount #app`);
      return [];
    }
  }
  getMenuItemsNode() {
    const nodes: HTMLElement[] = [];
    if (!this.menuItems) {
      console.error("menu must be init items");
      return [];
    }
    this.menuItems.forEach((data, index, arr) => {
      const item = this.createItem(data);
      (item.firstElementChild as Element).setAttribute(
        "style",
        `animation-delay: ${index * 0.08}s`
      );
      nodes.push(item);
    });
    return nodes;
  }
  createItem(data: MenuProps) {
    const button = document.createElement("button");
    const item = document.createElement("li");
    button.innerHTML = ((data.icon as string) + data.content) as string;
    button.classList.add("contextMenu-button");
    item.classList.add("contextMenu-item");
    if (data.divider) {
      item.setAttribute("data-divider", data.divider);
    }
    if (data.events && Object.keys(data.events).length !== 0) {
      const { eventType, callFn } = data.events;
      button.addEventListener(eventType, callFn);
    }
    item.appendChild(button);
    return item;
  }
  renderMenu() {
    const meunBox = document.createElement("ul");
    meunBox.classList.add("contextMenu");
    meunBox.setAttribute("data-theme", this.mode);
    this.menuItemsNode.forEach((item) => {
      meunBox.appendChild(item as Node);
    });
    return meunBox;
  }
  closeMenu(menu: HTMLUListElement) {
    if (this.isOpened) {
      this.isOpened = false;
      menu.remove();
    }
  }
  init() {
    const contextMenu = this.renderMenu();
    document.addEventListener("click", () => {
      this.closeMenu(contextMenu);
    });
    window.addEventListener("blur", () => {
      this.closeMenu(contextMenu);
    });
    document.addEventListener("contextmenu", (e) => {
      this.targetNode.forEach((target) => {
        if (!(e.target as Element).classList.contains(target.classList[0])) {
          contextMenu.remove();
        }
      });
    });
    this.targetNode.forEach((target) => {
      target.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        this.isOpened = true;
        const { clientX, clientY } = e as MouseEvent;
        document.body.appendChild(contextMenu);
        const positionY =
          clientY + contextMenu.scrollHeight >= window.innerHeight
            ? window.innerHeight - contextMenu.scrollHeight - 20
            : clientY;
        const positionX =
          clientX + contextMenu.scrollWidth >= window.innerWidth
            ? window.innerWidth -
              window.innerWidth -
              contextMenu.scrollWidth -
              20
            : clientX;
        contextMenu.setAttribute(
          "style",
          `width: ${contextMenu.scrollWidth}px;
           height: ${contextMenu.scrollHeight}px;
           top: ${positionY}px;
           left: ${positionX}px;`
        );
      });
    });
  }
}

export default ContextMenu;
