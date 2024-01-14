import { DndContext } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { Editor } from "./components/editor";
import { useState } from "react";
import { useEditorStore } from "@/lib/store";

function App() {
  const [parent, setParent] = useState(null);
  const addElement = useEditorStore((state) => state.addElement);
  const reorderElement = useEditorStore((state) => state.reorderElements);
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

    console.log(active.id, over.id);
    if (active.data.current.action === "edit") {
      reorderElement(active.id, over.id);
    }
  }
  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <Editor />
      </DndContext>
    </>
  );
}

export default App;
