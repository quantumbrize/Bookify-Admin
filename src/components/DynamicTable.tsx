import { useEffect, useState } from "react";
import { Search, RotateCcw, Filter, LogInIcon } from "lucide-react";
import { Dialog } from "@headlessui/react";
import DynamicTableProps from "../interfaces/DynamicTableProps";
import Dropdown from "./Dropdown";
import { headerWithCopyButton, productTypes, statues } from "../utils/Constant";
import CopyButton from "./CopyButton";
type DataItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  lastLoggedAt?: string;
  productType?: string;
};

type SortOrder = "latest" | "start";

const sortOptions = [
  { value: -1, label: "Latest First" },
  { value: 1, label: "Start First" },
];

const DynamicTable = ({
  data,
  headerMapping,
  initialSortOrder,
  limit,
  page,
  itemsPerPageOptions,
  onPageChange,
  onLimitChange,
  onSortChange,
  onFilterChange,
  onApplyFilters,
  totalPages,
  totalEntries,
  onResetFilter,
  filterValues,
}: DynamicTableProps) => {
  const selectedUserUrl = "https://dev.taxmate.pro/";
  const [isOpen, setIsOpen]: any = useState(false);
  const headers = Object.keys(headerMapping) as (keyof DataItem)[];
  console.log(headerMapping, "Hearder ");
  // Current state

  const [showFilters, setShowFilters] = useState(false);

  // Pending changes state

  //chose status
  const [status, setStatus] = useState<string | number>("");
  const [productType, setProductType] = useState<string | number>("");

  const [isParamsChanged, setIsParamsChanged] = useState(false);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (status) {
      onFilterChange("status", status.toString());
    }
  }, [status]);
  useEffect(() => {
    if (productType) {
      onFilterChange("productType", productType.toString());
    }
  }, [productType]);

  const handleLoginClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div className="flex gap-2 items-center">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">Table Filters</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2 shadow-sm"
          >
            <Search className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <button
            onClick={onApplyFilters}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-sm font-medium"
          >
            Search
          </button>
          <button
            onClick={onResetFilter}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            {headers.map((header) => (
              <div key={header} className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  {headerMapping[header]}
                </label>
                {header === "status" || header === "productType" ? (
                  <Dropdown
                    label=""
                    options={header === "status" ? statues : productTypes} // Ensure this array is correctly defined
                    selected={header === "status" ? status : productType}
                    onSelect={header === "status" ? setStatus : setProductType}
                  />
                ) : (
                  <input
                    type={header === "lastLoggedAt" ? "date" : "text"}
                    value={filterValues[header] || ""}
                    onChange={(e) => {
                      onFilterChange(header, e.target.value);
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Filter by ${headerMapping[header]}...`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.values(filterValues).some((value) => value) && (
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex gap-2 flex-wrap">
            {Object.entries(filterValues).map(([field, value]) =>
              value ? (
                <div
                  key={field}
                  className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200"
                >
                  <span className="text-sm font-medium text-blue-700">
                    {headerMapping[field as keyof DataItem]}:
                  </span>
                  <span className="text-sm text-blue-600">{value}</span>
                  <button
                    onClick={async () => {
                      onFilterChange(field as keyof DataItem, "");
                      // handleFilter();
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select
              value={limit}
              onChange={(e) => {
                setIsParamsChanged(true);
                onLimitChange(Number(e.target.value));
              }}
              className="px-2 py-1 border border-gray-300 rounded-md text-sm"
            >
              {itemsPerPageOptions.map((limit) => (
                <option key={limit} value={limit}>
                  {limit}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          <div className="text-sm text-gray-600">
            Total Items: {totalEntries}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by</span>
            <select
              value={initialSortOrder}
              onChange={(e) => {
                setIsParamsChanged(true);
                onSortChange(e.target.value as SortOrder);
              }}
              className="px-2 py-1 border border-gray-300 rounded-md text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsParamsChanged(true);
                onPageChange(Math.max(page - 1, 1));
              }}
              disabled={page === 1}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => {
                setIsParamsChanged(true);
                onPageChange(Math.min(page + 1, totalPages));
              }}
              disabled={page === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <button
            onClick={onApplyFilters}
            disabled={!isParamsChanged}
            className={`px-4 py-2 rounded-md font-medium ${
              isParamsChanged
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Apply Changes
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-4 font-medium">
                  {headerMapping[header]}
                </th>
              ))}

              {!headers.includes("productType") && (
                <th className="px-6 py-4 font-medium">Login</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-b last:border-b-0 hover:bg-gray-50"
              >
                {headers.map((header) => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-row items-center">
                      {String(row[header])}

                      {/* Show CopyButton only for specific headers */}
                      {headerWithCopyButton.includes(
                        header
                      ) && <CopyButton value={String(row[header])} />}
                    </div>
                  </td>
                ))}
                <td className="px-6 py-4 text-center">
                  {!headers.includes("productType") && (
                    <LogInIcon
                      onClick={handleLoginClick}
                      className="w-5 h-5 inline-block"
                    />
                  )}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl rounded bg-white p-4">
            <Dialog.Title className="text-xl font-bold mb-4">
              User Website
            </Dialog.Title>
            <iframe
              src={selectedUserUrl}
              title="User Website"
              className="w-full h-[600px] border"
            />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default DynamicTable;
