import { AlertCircle, CheckCircle2, XCircle, X } from "lucide-react";
import ModalProps from "../interfaces/ModelProps";

const Modal = ({ isOpen, onClose, type, title, message }: ModalProps) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case "success":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case "error":
        return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getHeaderColor = () => {
    switch (type) {
      case "warning":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Semi-black background overlay */}
      <div
        className="fixed inset-0 transition-opacity"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div
          className={`px-6 py-4 flex items-center justify-between ${getHeaderColor()} text-white`}
        >
          <div className="flex items-center space-x-2">
            {getIcon()}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
  <p
    className="text-gray-600"
    dangerouslySetInnerHTML={{ __html: message }}
  ></p>
</div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
