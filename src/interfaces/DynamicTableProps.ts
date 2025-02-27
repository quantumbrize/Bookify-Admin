import { Dispatch, SetStateAction } from "react";

// Define the structure of each data item
export interface DataItem {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  status: string;
  lastLoggedAt?: string;
  productType?:string
}
interface FilterValues {
    [key: string]: string;
  }
  
// Define the props for DynamicTable
export default interface DynamicTableProps {
    onResetFilter: () => void,
    totalPages:number,
    page:number,
  data: DataItem[];  // Array of data items
  headerMapping: Record<keyof DataItem, string>;  // Dynamic headers
  initialSortOrder?: "latest" | "start";  // Initial sorting order
  itemsPerPageOptions: number[];  // Options for items per page
  onPageChange: (page: number) => void;  // Handler for page change
  onLimitChange: (limit: number) => void;  // Handler for items per page change
  onSortChange: (sortOrder: "latest" | "start") => void;  // Handler for sorting
  onFilterChange: (field: string, value: string) => void;  // Handler for filters
  onApplyFilters: () => void; // Handler for applying filters
  totalEntries: number;  // Total number of entries
  limit:number,
  filterValues: FilterValues;
}
