import { useDraggable } from "@dnd-kit/core";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { GripHorizontal } from "lucide-react";
import { ReactNode } from "react";

export type Block = {
  type: string;
  icon: ReactNode;
  title: string;
};

export const Block = ({ props }: { props: Block }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.type,
    data: { action: "add" },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex cursor-grab flex-col items-center gap-4 active:cursor-grabbing"
    >
      <CardHeader>
        <GripHorizontal className="h-4 w-4" />
      </CardHeader>
      <CardContent>{props.icon}</CardContent>
      <CardFooter>{props.title}</CardFooter>
    </Card>
  );
};

export const Blocks = ({ blocks }: { blocks: Block[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {blocks.map((block) => (
        <Block key={block.type} props={block} />
      ))}
    </div>
  );
};
