import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { type Element } from "@/lib/store";

export const Section = ({
  element,
  children,
}: {
  element: Element;
  children: ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: element.id,
  });

  return (
    <section
      ref={setNodeRef}
      key={element.id}
      className={`${element.classNames} ${
        isOver && "border-yellow-600 bg-primary-foreground"
      } min-h-20 border hover:border-yellow-600`}
    >
      {children}
    </section>
  );
};
