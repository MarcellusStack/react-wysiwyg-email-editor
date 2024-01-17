import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";

export type Element = {
  id: string;
  element: string;
  isContainer: boolean;
  content?: string;
  classNames: string;
  parentId?: string | null;
  children?: Element[];
};

export type EditorProps = {
  elements: Element[];
  selectedElement: Element | null;
};

type EditorActions = {
  sortElement: (elementId: string, parentId: string) => void;
  addElement: (parentId: string | null, newElement: Element) => void;
  updateElement: (id: string, updatedElement: Element) => void;
  selectElement: (element: Element | null) => void;
  reorderElements: (sourceId: string, newParentId: string) => void;
};

export const useEditorStore = create<EditorProps & EditorActions>()((set) => ({
  elements: [],
  selectedElement: null,
  sortElement: (elementId, parentId) =>
    set((state) => {
      const oldIndex = state.elements.findIndex(
        (element) => element.id === elementId,
      );
      const newIndex = state.elements.findIndex(
        (element) => element.id === parentId,
      );

      return { elements: arrayMove(state.elements, oldIndex, newIndex) };
    }),
  addElement: (parentId, newElement) =>
    set((state) => {
      const updatedElements = addElement(state.elements, parentId, {
        ...newElement,
      });
      return { elements: updatedElements };
    }),

  updateElement: (id, updatedElement) =>
    set((state) => {
      const updatedElements = updateElement(state.elements, id, updatedElement);
      return { elements: updatedElements };
    }),
  selectElement: (element) => set({ selectedElement: element }),
  reorderElements: (sourceId, newParentId) =>
    set((state) => {
      const updatedElements = reorderElements(
        state.elements,
        sourceId,
        newParentId,
      );
      return { elements: updatedElements };
    }),
}));

const addElement = (
  elements: Element[],
  parentId: string | null,
  newElement: Element,
): Element[] => {
  if (!parentId) {
    // If parentId is null, add the new element at the root level
    return [...elements, newElement];
  }

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
      const updatedChildren = addElement(
        element.children,
        parentId,
        newElement,
      );
      if (updatedChildren !== element.children) {
        return {
          ...element,
          children: updatedChildren,
        };
      }
    }

    // If the element doesn't match the parent ID, return it as is
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
  sourceId: string,
  newParentId: string,
): Element[] => {
  const updatedElements = [...elements]; // Shallow copy
  const draggedElement = findElementById(updatedElements, sourceId);

  if (!draggedElement) {
    return elements; // Return the original elements if the dragged element is not found
  }

  const newParentElement = findElementById(updatedElements, newParentId);

  if (
    !newParentElement ||
    !newParentElement.isContainer ||
    newParentElement.children.length > 0
  ) {
    return elements; // Return the original elements if the new parent is not a valid container
  }

  const updatedDraggedElement = {
    ...draggedElement,
    parentId: newParentId,
  };

  // Remove the dragged element from its original location
  const originalParentId = draggedElement.parentId || null;

  const originalParent = findElementById(updatedElements, originalParentId);

  if (originalParent) {
    originalParent.children = originalParent.children?.filter(
      (child) => child.id !== draggedElement.id,
    );
  }

  newParentElement.children.push(updatedDraggedElement);

  return updatedElements;
};

// Helper function to find an element by ID in the tree
const findElementById = (
  elements: Element[],
  id: string,
): Element | undefined => {
  for (const element of elements) {
    if (element.id === id) {
      return element;
    }

    if (element.children) {
      const foundChild = findElementById(element.children, id);
      if (foundChild) {
        return foundChild;
      }
    }
  }

  return undefined;
};
