import { LogOut, User } from 'lucide-react';
import  { useState, useEffect, useRef } from 'react';
import UserMenuProps from '../interfaces/UserMenuProps';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function UserMenu({ onLogout }:UserMenuProps) {
  const adminInfo = useSelector((state: RootState) => state.auth.adminInfo);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
  
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  // Close panel on option click
  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
      >
        <img
          src="https://github.com/shadcn.png"
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
        <span className="font-medium">{adminInfo?.username}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={handleOptionClick}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            <User size={16} className="inline mr-2" />
            Profile
          </button>
          <button
            onClick={() => {
              handleOptionClick();
              onLogout();
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            <LogOut size={16} className="inline mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
