import {
  CaseSensitive,
  Code,
  FileCode2,
  Heading1,
  Link,
  Minus,
  MousePointerSquare,
  Image,
} from "lucide-react";

export const blocks = [
  {
    type: "text",
    title: "Text",
    icon: <CaseSensitive className="h-6 w-6" />,
  },
  {
    type: "heading",
    title: "Heading",
    icon: <Heading1 className="h-6 w-6" />,
  },
  {
    type: "code-block",
    title: "Code block",
    icon: <Code className="h-6 w-6" />,
  },
  {
    type: "markdown",
    title: "Markdown",
    icon: <FileCode2 className="h-6 w-6" />,
  },
  {
    type: "image",
    title: "Image",
    icon: <Image className="h-6 w-6" />,
  },
  {
    type: "link",
    title: "Link",
    icon: <Link className="h-6 w-6" />,
  },
  {
    type: "button",
    title: "Button",
    icon: <MousePointerSquare className="h-6 w-6" />,
  },

  {
    type: "divider",
    title: "Divider",
    icon: <Minus className="h-6 w-6" />,
  },
];
