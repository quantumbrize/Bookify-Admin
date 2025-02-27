import React from "react";

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  path: string;
}

export default interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  onLogout: () => void;
}
