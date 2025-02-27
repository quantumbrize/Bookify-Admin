import axiosInstance from "./axiosInstance";

// Normal GET request without token
export const get = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

//normal post request without token
export const post = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

//post request without token with params
export const postWithParams = async (
  url: string,
  data: any = {},
  params?: Record<string, any>
) => {
  try {
    const response = await axiosInstance.post(url, data, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

//get request without token with params
export const getWithParams = async (
  url: string,
  params?: Record<string, any>
) => {
  try {
    const response = await axiosInstance.get(url, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const downloadCSV = async (url: string, type: string): Promise<Blob> => {
  try {
    const response = await axiosInstance.get(url, {
      responseType: "blob", // We expect a blob response
      headers: {
        Accept: "text/csv, application/octet-stream", // Adjusted for CSV file type
      },
      params: {
        type, // Sending 'type' as a query parameter
      },
    });

    return response.data; // Return the Blob data directly
  } catch (err) {
    throw err; // Propagate the error for further handling
  }
};


// upload document 
export const uploadDocument=async(file: File ,id:string)=>{
  const formData = new FormData();
  formData.append("csvFile", file);
  // formData.append("taxyear", taxYear);
  // formData.append("file_type",file_type);

  try {
    const { data } = await axiosInstance.post(`/catalogs/products/productUploadCsv/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (err) {
    throw err; 
  }
}
