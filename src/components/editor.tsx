import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Editor = () => {
  const [enablePreview, setEnablePreview] = React.useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className=" text-white p-4 sticky top-0 z-50 border-b border-gray-200 flex items-center justify-center">
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

      <div className="flex-1 overflow-y-auto  flex">
        {/* Left Sidebar */}
        <aside className=" w-1/6 min-w-300 p-4 sticky top-0 h-full border-r border-gray-200">
          {/* Your left sidebar content goes here */}
          Left Sidebar
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {enablePreview && <div>Preview</div>}
          {!enablePreview && <div>Editor</div>}
        </main>

        {/* Right Sidebar */}
        <aside className=" w-1/4 min-w-300 p-4 sticky top-0 h-full border-l border-gray-200">
          {/* Your right sidebar content goes here */}
          Right Sidebar
        </aside>
      </div>
    </div>
  );
};
