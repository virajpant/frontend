"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Routes where Sidebar should be HIDDEN
  const hiddenRoutes = ["/", "/login"];

  // If current route is in hiddenRoutes → render nothing
  const shouldHideSidebar = hiddenRoutes.includes(pathname);

  // Don't render anything on hidden routes
  if (shouldHideSidebar) {
    return null;
  }

  // Otherwise, render Sidebar with showSidebar={true}
  return (
    <Sidebar
      isOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
      showSidebar={true}  // Explicitly allow rendering
    />
  );
}