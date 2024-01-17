import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { Editor } from "./components/editor";
import { useState } from "react";
import { useEditorStore } from "@/lib/store";

function App() {
  const [parent, setParent] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const elements = useEditorStore((state) => state.elements);
  const addElement = useEditorStore((state) => state.addElement);
  const reorderElement = useEditorStore((state) => state.reorderElements);
  const sortElement = useEditorStore((state) => state.sortElement);
  function handleDragEnd(event) {
    const { over, active } = event;

    /* console.log(over, active); */

    if (!over) {
      return;
    }

    setParent(over.id);

    if (active.data.current.action === "add") {
      addElement(over.id, {
        parentId: over.id,
        id: uuidv4(),
        element: active.id,
        isContainer: true,
        content: "Hello World",
        classNames: "",
        children: [],
      });
    }

    if (active.data.current.action === "edit") {
      reorderElement(active.id, over.id);
    }

    if (active.data.current.action === "sort" && active.id !== over.id) {
      
      sortElement(active.id, over.id);
    }
  }
  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <Editor />
      </DndContext>
    </>
  );
}

export default App;
