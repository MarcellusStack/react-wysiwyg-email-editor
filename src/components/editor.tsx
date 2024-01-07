import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ColorPicker } from "@/components/color-picker";
import { GripHorizontal, Image } from "lucide-react";

export const Editor = () => {
  const [enablePreview, setEnablePreview] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 text-white ">
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
                      <Image className="h-8 w-8" />
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
          {enablePreview && <div>Preview</div>}
          {!enablePreview && <div>Editor</div>}
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
