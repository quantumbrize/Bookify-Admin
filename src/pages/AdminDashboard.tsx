import  { useState } from "react";
import Navbar from "../components/Navbar";
import ContentArea from "../components/ContentArea";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState("/users");
  const handleLogout = () => {
    dispatch(logout());
  };
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
        onLogout={handleLogout}
      />
      <div className={`flex-1 flex flex-col ${isOpen ? "ml-64" : "ml-20"}`}>
        <Navbar onLogout={handleLogout}/>
        <ContentArea currentPath={currentPath} />
      </div>
    </div>
  );
}

export default AdminDashboard;
