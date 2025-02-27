import { useState } from "react";
import InputField from "../components/InputField";
import Dropdown from "../components/Dropdown";
import { environments } from "../utils/Constant";
import { validateLogin } from "../utils/ValidateLogin";
import { ErrorType, LoginData } from "../interfaces/VriableInterfaces";
import { loginHelper } from "../api/adminApi";
import Modal from "../components/Model";
import { ModalType } from "../interfaces/ModelProps";
import { setAuth } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [serverEnv, setServerEnv]: any = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modelData, setModelData] = useState("");
  const [modelTitle, setModelTitle] = useState("");
  const [modelType, setModelType] = useState("");
  const [error, setError] = useState<ErrorType>({
    serverEnv: "",
    username: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const isValid = validateLogin(serverEnv, username, password, setError);
    if (isValid) {
      try {
        setIsLoading(true);
        const userData: LoginData = {
          environment: serverEnv,
          username,
          password,
        };
        const res = await loginHelper(userData);
        dispatch(setAuth({ token: res.data.token, adminInfo: res.data.adminInfo }));
        toast.success(res?.message);
      } catch (error: any) {
        setModelData(error!);
        setIsModalOpen(true);
        setModelTitle("Login Failed");
        setModelType("error");
      } finally {
        setIsLoading(false);
      }
    } else {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="p-8 text-center border-b border-gray-100">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-sm"></div>
              <img
                src="https://github.com/shadcn.png"
                alt="Ediuik Logo"
                className="h-14 w-14 rounded-full relative shadow-lg"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Eduqik</h2>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome Back
          </h3>
          <p className="text-gray-600">Please sign in to access your account</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Server Selection Dropdown */}
            <div>
              <Dropdown
                label="Server Environment"
                options={environments}
                selected={serverEnv}
                onSelect={setServerEnv}
              />
              {error.serverEnv && (
                <p className="text-red-500">{error.serverEnv}</p>
              )}
            </div>

            <div>
              {/* Username Input */}
              <InputField
                label="Username"
                value={username}
                onChange={setUsername}
                placeholder="Enter your username"
              />
              {error.username && (
                <p className="text-red-500">{error.username}</p>
              )}
            </div>

            <div>
              {/* Password Input */}
              <InputField
                label="Password"
                value={password}
                onChange={setPassword}
                placeholder="Enter your password"
                isPassword={true}
              />
              {error.password && (
                <p className="text-red-500">{error.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modelType as ModalType}
        title={modelTitle}
        message={modelData}
      />
    </div>
  );
};

export default Login;
