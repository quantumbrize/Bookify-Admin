import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import InputField from "../InputField";
import validateMongoDbObjectId from "../../utils/ValidateMongoDbObjectId";
import {
  getMerchentById,
  handleDocumentDownload,
  handleDocumentUpload,
} from "../../api/adminApi";
import Modal from "../Model";
import { ModalType } from "../../interfaces/ModelProps";
import toast from "react-hot-toast";
import formatCSVErrors from "../../utils/FormatCSVErrors";

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface MerchantData {
  id: string;

  businessName: string;
  businessType: string;
  gstNumber: string;
  licenseNumber: string;
  status: string;
}

const ProductManagement: React.FC = () => {
  const [merchantId, setMerchantId] = useState<string>("");
  const [merchantData, setMerchantData] = useState<MerchantData | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [modelType, setModelType] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [downloadLoading, setdownloadLoading] = useState(false);

  const fetchMerchantData = async () => {
    const validId = validateMongoDbObjectId(merchantId, setError);
    if (validId) {
      try {
        setIsLoading(true);
        const res = await getMerchentById(merchantId);
        if (res?.data?.status !== "active") {
          setModelTitle("Invalid Merchant");
          setModelType("error");
          setIsModalOpen(true);
          setError("This merchant status is not active");
          return;
        }
        setMerchantData(res?.data);
      } catch (error: any) {
        setModelTitle("Fetch Merchant");
        setModelType("error");
        setIsModalOpen(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      return;
    }
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      // alert("File uploaded successfully");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      // alert("File uploaded successfully");
    }
  };

  const validateFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      setModelTitle("File Upload");
      setModelType("error");
      setIsModalOpen(true);
      setError("Please upload a CSV file");
      return false;
    }
    return true;
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = (byButton = false) => {
    console.log(selectedFile, byButton);
    if (selectedFile && !byButton) {
      setModelTitle("File Upload Error");
      setModelType("error");
      setIsModalOpen(true);
      setError(
        "You had already uploaded! You can change or delete file for uploading new file!!!"
      );
      return;
    }
    fileInputRef.current?.click();
  };

  const downloadCsv = async (type:string) => {
    try {
      setdownloadLoading(true);
      await handleDocumentDownload(type);
    } catch (error) {
      console.error(error);
    } finally {
      setdownloadLoading(false);
    }
  };

  const handleFileUpload = async () => {
    try {
      setUploadLoading(true);
      const res = await handleDocumentUpload(selectedFile!, merchantId);

      toast.success(res?.message);
      setSelectedFile(null);
    } catch (error: any) {
      console.error(error);
      if (error.status === 400) {
        if (error.response.data.error === "Missing data in CSV rows") {
          setModelTitle(error.response.data.error);
          setModelType("error");
          setIsModalOpen(true);
          setError(formatCSVErrors(error.response.data.details));
        } else {
          setModelTitle(error.response.data.error);
          setModelType("error");
          setIsModalOpen(true);
          setError(error.response.data.message);
        }
      } else {
        setModelTitle("Uploading Failed");
        setModelType("error");
        setIsModalOpen(true);
        setError(error.response.data.error || "Internal server error");
      }
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className=" p-6">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>

      {/* Merchant ID Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-4xl">
        <div className="space-y-4">
          <div className="flex gap-2 flex-col">
            <InputField
              label="Merchant ID"
              value={merchantId}
              onChange={setMerchantId}
              placeholder="Enter merchent id"
            />
            {error && error === "Invalid ID format" && (
              <span className="text-red-700 font-semibold">{error}</span>
            )}
            <button
              onClick={fetchMerchantData}
              disabled={isLoading}
              className={`cursor-pointer self-end w-48 px-6 py-2 rounded-lg font-medium transition-all ${
                isLoading
                  ? "bg-gray-100 text-gray-400"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                "Fetch Details"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Merchant Information */}
      {merchantData && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-4xl mt-4">
          <div className="p-6">
            {/* Header with Status */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Merchant Information
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  merchantData.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {merchantData.status.charAt(0).toUpperCase() +
                  merchantData.status.slice(1)}
              </span>
            </div>

            {/* All Information in Two Columns */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-0.5">
                <p className="text-sm text-gray-500">Business Name</p>
                <p className="font-medium text-gray-900">
                  {merchantData.businessName}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm text-gray-500">Business Type</p>
                <p className="font-medium text-gray-900">
                  {merchantData.businessType}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm text-gray-500">GST Number</p>
                <p className="font-medium text-gray-900">
                  {merchantData.gstNumber}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm text-gray-500">License Number</p>
                <p className="font-medium text-gray-900">
                  {merchantData.licenseNumber}
                </p>
              </div>
            </div>

            {/* Verify Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  setIsVerified(true);
                  toast.success("Merchent Verified Success");
                }}
                disabled={isVerified}
                className={`cursor-pointer px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isVerified ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Verified
                  </>
                ) : (
                  "Verify Merchant"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV Upload Section */}
      {isVerified && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-4xl mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            CSV Management
          </h2>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Upload Products CSV
              </p>

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => triggerFileInput()}
                className={`flex flex-col items-center px-6 py-8 bg-gray-50 rounded-lg border-2 border-dashed transition-all cursor-pointer
                  ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-100"
                  }
                  ${selectedFile ? "border-green-500 bg-green-50" : ""}`}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedFile.name}
                    </span>
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {isDragging
                        ? "Drop CSV file here"
                        : "Drag & drop CSV file or click to browse"}
                    </span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* File Actions */}
              {selectedFile && (
                <div className="flex justify-end mt-2 gap-2">
                  <button
                    disabled={uploadLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileInput(true);
                    }}
                    className="cursor-pointer px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-all"
                  >
                    Change File
                  </button>
                  <button
                    disabled={uploadLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className=" cursor-pointer px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-all"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-4">
              <button
                disabled={downloadLoading}
                onClick={()=>downloadCsv("main")}
                className="cursor-pointer px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {downloadLoading ? "Loading..." : "  Download Main Template"}
              </button>
              <button
                disabled={downloadLoading}
                onClick={()=>downloadCsv("variant")}
                className="cursor-pointer px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {downloadLoading ? "Loading..." : "  Download Variant Template"}
              </button>
              <button
                onClick={handleFileUpload}
                disabled={!selectedFile || uploadLoading}
                className={`cursor-pointer px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2
                  ${
                    selectedFile || uploadLoading
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                {uploadLoading ? "Uploading file" : " Upload File"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modelType as ModalType}
        title={modelTitle}
        message={error}
      />
    </div>
  );
};

export default ProductManagement;
