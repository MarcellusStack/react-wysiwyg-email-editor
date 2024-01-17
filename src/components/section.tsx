import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Element } from "@/lib/store";

export const Section = ({
  element,
  children,
}: {
  element: Element;
  children: ReactNode;
}) => {
  const droppable = useDroppable({
    id: element.id,
  });
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: element.id, data: { action: "sort", element: element } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <section
        ref={droppable.setNodeRef}
        key={element.id}
        className={`${element.classNames} ${
          droppable.isOver && "border-yellow-600 bg-primary-foreground"
        } min-h-20 border hover:border-yellow-600`}
      >
        {children}
      </section>
    </div>
  );
};
