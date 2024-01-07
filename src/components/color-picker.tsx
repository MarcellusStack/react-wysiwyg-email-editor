import { useState } from "react";
import { Palette } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

export const ColorPicker = () => {
  const [color, setColor] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          name="color"
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !color && "text-muted-foreground",
          )}
        >
          <Palette className="mr-2 h-4 w-4" />
          {color ? color : <span>Pick a color</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <HexColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
};
