import { useDraggable } from "@dnd-kit/core";
import { type Element } from "@/lib/store";

export const Text = ({ element }: { element: Element }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: { action: "edit", element: element },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <p
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      key={element.id}
      className={`${element.classNames} border hover:border-yellow-600`}
    >
      {element.content}
    </p>
  );
};
