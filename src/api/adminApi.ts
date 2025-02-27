import { LoginData } from "../interfaces/VriableInterfaces";
import {
  downloadCSV,
  get,
  getWithParams,
  post,
  postWithParams,
  uploadDocument,
} from "./apiHelper";

//Login
export const loginHelper = async (userData: LoginData) => {
  return await post("/admin/login", userData);
};

// Search users
export const getUserHelper = async (searchQuery: any = {}) => {
  return await postWithParams("/user/get-user-admin", {}, searchQuery);
};
// Search products
export const getProductsHelper = async (searchQuery: any = {}) => {
  return await getWithParams("/catalogs/products/get-products-admin", searchQuery);
};

// Search all users
export const getMerchentHelper = async (searchQuery: any = {}) => {
  return await getWithParams("/merchants/merchent-for-admin", searchQuery);
};

// Get merchent information
export const getMerchentById = async (id: string) => {
  return await get(`/merchants/${id}`);
};

export const handleDocumentDownload = async (type:string) => {
  const blob = await downloadCSV("/admin/download-product-csv",type);

  // Create a new Blob URL
  const url = window.URL.createObjectURL(blob);

  // Open the Blob URL in a new tab
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank"; // Open in new tab
  a.download = ""; // Optional: Set the file name here
  document.body.appendChild(a);
  a.click();
  a.remove(); // Remove the anchor element

  // Optionally revoke the Blob URL after a delay
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 100); // Adjust the delay as needed
};

// document upload

export const handleDocumentUpload = async (file: File ,id:string) => {
  const res = await uploadDocument(file,id); // Pass the token here

  return res;
};
