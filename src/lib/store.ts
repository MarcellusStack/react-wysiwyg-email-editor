import { create } from "zustand";

export type Element = {
  id: string;
  element: string;
  isContainer: boolean;
  content?: string;
  classNames: string;
  children?: Element[];
};

export type EditorProps = {
  elements: Element[];
  selectedElement: Element | null;
};

type EditorActions = {
  addElement: (parentId: string | null, newElement: Element) => void;
  updateElement: (id: string, updatedElement: Element) => void;
  selectElement: (element: Element | null) => void;
  reorderElements: (sourceIndex: number, destinationIndex: number) => void;
};

export const useEditorStore = create<EditorProps & EditorActions>()((set) => ({
  elements: [
    {
      id: "dsafadsasd",
      element: "text",
      isContainer: false,
      content: "Hello World",
      classNames: "string hover:border-yellow-600 border",
      children: [],
    },
    {
      id: "dsafadsasdsadasd",
      element: "section",
      isContainer: true,
      content: "",
      classNames: "h-64  hover:border-yellow-600 border",
      children: [],
    },
  ],
  selectedElement: null,
  addElement: (parentId, newElement) =>
    set((state) => {
      const updatedElements = addElement(state.elements, parentId, newElement);
      return { elements: updatedElements };
    }),
  updateElement: (id, updatedElement) =>
    set((state) => {
      const updatedElements = updateElement(state.elements, id, updatedElement);
      return { elements: updatedElements };
    }),
  selectElement: (element) => set({ selectedElement: element }),
  reorderElements: (sourceIndex, destinationIndex) =>
    set((state) => {
      const updatedElements = reorderElements(
        state.elements,
        sourceIndex,
        destinationIndex,
      );
      return { elements: updatedElements };
    }),
}));

const addElement = (
  elements: Element[],
  parentId: string | null,
  newElement: Element,
): Element[] => {
  return elements.map((element) => {
    if (element.id === parentId) {
      // If the current element matches the parent ID and it's empty, add the new element as its child
      if (!element.children || element.children.length === 0) {
        return {
          ...element,
          children: [...(element.children || []), newElement],
        };
      }
    } else if (element.children) {
      // Recursively traverse through children
      return {
        ...element,
        children: addElement(element.children, parentId, newElement),
      };
    }
    return element;
  });
};

const updateElement = (
  elements: Element[],
  id: string,
  updatedElement: Element,
): Element[] => {
  return elements.map((element) => {
    if (element.id === id) {
      // If the current element matches the ID, update it
      return {
        ...element,
        ...updatedElement,
      };
    } else if (element.children) {
      // Recursively traverse through children
      return {
        ...element,
        children: updateElement(element.children, id, updatedElement),
      };
    }
    return element;
  });
};

const reorderElements = (
  elements: Element[],
  sourceIndex: number,
  destinationIndex: number,
): Element[] => {
  const updatedElements = [...elements]; // Shallow copy
  const [movedElement] = updatedElements.splice(sourceIndex, 1);
  updatedElements.splice(destinationIndex, 0, movedElement);

  if (movedElement.isContainer && movedElement.children) {
    return updatedElements.map((element) => {
      if (element.children) {
        element.children = element.children.filter(
          (child) => child.id !== movedElement.id,
        );
      }

      if (
        element.id === updatedElements[destinationIndex].id &&
        (!element.children || element.children.length === 0)
      ) {
        element.children = element.children || [];
        element.children.unshift({
          ...movedElement,
          isContainer: false,
        });
        element.children.unshift(...(movedElement.children || []));
      }

      return element;
    });
  }

  return updatedElements;
};
