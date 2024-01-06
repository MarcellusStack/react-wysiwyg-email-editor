import React from "react";

export const Editor = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className=" text-white p-4 sticky top-0 z-50 border-b border-gray-200">
        {/* Your header content goes here */}
        Header
      </header>

      <div className="flex-1 overflow-y-auto  flex">
        {/* Left Sidebar */}
        <aside className=" w-1/6 min-w-300 p-4 sticky top-0 h-full border-r border-gray-200">
          {/* Your left sidebar content goes here */}
          Left Sidebar
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Your main content goes here */}
          Main Content
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
