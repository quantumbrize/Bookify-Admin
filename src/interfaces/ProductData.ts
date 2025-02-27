export default interface ProductDataInterface {
    id: string;
    title: string;
    brand: string;
    mrp: number;
    sku: string;
    status: "active" | "inactive" |'pending'; 
    productType?: "variant" | "main"; 
    parentProductId?: string | null; 
  }
  