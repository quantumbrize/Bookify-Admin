import React from "react";
import UserMenu from "./UserMenu";
import NavbarProps from "../interfaces/NavbarProps";

function Navbar({onLogout}:NavbarProps) {
  
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
       
        <UserMenu onLogout={onLogout} />
      </div>
    </div>
  );
}

export default Navbar;
