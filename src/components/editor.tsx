import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ColorPicker } from "@/components/color-picker";
import { GripHorizontal, Image, FileDown, Plus } from "lucide-react";
import { useEditorStore, type Element } from "@/lib/store";
import { render } from "@react-email/render";
import {
  Html,
  Tailwind,
  Body,
  Head,
  Preview,
  Container,
  Section,
  Text,
} from "@react-email/components";
import { v4 as uuidv4 } from "uuid";

export const Editor = () => {
  const [enablePreview, setEnablePreview] = useState(false);
  const elements = useEditorStore((state) => state.elements);
  const selectedElement = useEditorStore((state) => state.selectedElement);
  const selectElement = useEditorStore((state) => state.selectElement);
  const addElement = useEditorStore((state) => state.addElement);
  const renderElement = (element: Element) => {
    const { id, element: elementType, classNames, children } = element;

    // Customize this switch statement based on your element types
    switch (elementType) {
      case "section":
        return (
          <Section
            key={id}
            className={`${classNames} min-h-20 border hover:border-yellow-600`}
          >
            {children && children.map(renderElement)}
          </Section>
        );
      case "text":
        return (
          <Text
            key={id}
            className={`${classNames} border hover:border-yellow-600`}
            onClick={() => {
              selectElement(element);
            }}
          >
            {element.content}
          </Text>
        );

      default:
        return null; // Or handle unknown element types accordingly
    }
  };
  const markup = render(
    <Html>
      <Head />
      <Preview>Test</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="w-full max-w-full">
            {elements.map(renderElement)}
          </Container>
        </Body>
      </Tailwind>
    </Html>,
    { pretty: true },
  );

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between  p-4 text-white ">
        <div />
        <Tabs defaultValue="editor" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="editor"
              onClick={() => {
                setEnablePreview(false);
              }}
            >
              Editor
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              onClick={() => {
                setEnablePreview(true);
              }}
            >
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          onClick={() => {
            console.log(elements);
          }}
        >
          <FileDown className="mr-2 h-4 w-4" /> Export
        </Button>
      </header>
      <Separator />
      <div className="flex flex-1  overflow-y-auto">
        {/* Left Sidebar */}
        <aside className=" min-w-300 sticky top-0 h-full w-1/6 p-4 ">
          <Tabs defaultValue="blocks" className="flex w-full flex-col gap-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="blocks">Blocks</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            <TabsContent value="blocks" className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Blocks
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="flex cursor-grab flex-col items-center gap-4 active:cursor-grabbing">
                    <CardHeader>
                      <GripHorizontal className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                      <Image className="h-6 w-6" />
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm font-medium leading-none">Image</p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Layouts
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="flex cursor-grab flex-col items-center gap-4 active:cursor-grabbing">
                    <CardHeader>
                      <GripHorizontal className="h-4 w-4" />
                    </CardHeader>
                    <CardContent className="w-7/12">
                      <div className="h-4 w-full border bg-muted" />
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm font-medium leading-none">1</p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="templates"></TabsContent>
          </Tabs>
        </aside>
        <Separator orientation="vertical" />
        {/* Main Content */}
        <main className="flex-1 p-4">
          {enablePreview && (
            <div
              dangerouslySetInnerHTML={{ __html: markup }}
              className="h-full w-full"
            />
          )}
          {!enablePreview && (
            <>
              <div className="h-auto w-full">{elements.map(renderElement)}</div>
              <Button
                className="mt-2 w-full"
                variant="secondary"
                onClick={() => {
                  addElement("", {
                    id: uuidv4(),
                    element: "section",
                    isContainer: true,
                    content: "",
                    classNames: "",
                    children: [],
                  });
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add new section
              </Button>
            </>
          )}
        </main>
        {/* Right Sidebar */}
        <Separator orientation="vertical" />
        <aside className=" min-w-300 sticky top-0 h-full w-1/4 p-4 ">
          <div className="flex flex-col gap-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Settings
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex flex-col gap-2">
                <Label htmlFor="email">Content</Label>
                <Input type="text" name="content" />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <Label htmlFor="color">Backgroundcolor</Label>
                <ColorPicker />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
