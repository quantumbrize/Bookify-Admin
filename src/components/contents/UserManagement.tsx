import { useEffect, useState } from "react";
import { getUserHelper } from "../../api/adminApi";
import DynamicTable from "../DynamicTable";
import UserInterface from "../../interfaces/UserData";
import Loader from "../Loader";
import createDynamicHeaderMapping from "../../utils/createDynamicHeaderMapping";
import Modal from "../Model";
import { ModalType } from "../../interfaces/ModelProps";

function UserManagement() {
  const [userData, setUserData] = useState<UserInterface[] | null>(null);
  const [query, setQuery] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [totalUserInCollection, setTotalUserInCollection] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [headerMapping, setHeaderMapping] = useState<Record<string, string>>(
    {}
  );
  const [modelData, setModelData] = useState("");
  const [modelTitle, setModelTitle] = useState("");
  const [modelType, setModelType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const fetchUser = async (queryValue: any = {}) => {
    console.log(queryValue, "!!!!!!!!!!!!!!!!");
    setIsLoading(true);
    try {
      const res = await getUserHelper(queryValue);
      console.log(res, "LLL");
      setTotalUserInCollection(res?.data?.totalUsers);
      setTotalPages(res?.data?.totalPages);
      const usersDataAfterAddLogin: UserInterface[] =
        res?.data?.users?.map((user: UserInterface) => ({
          ...user,
          lastLoggedAt: new Date().toISOString().split("T")[0],
        })) || [];
      setUserData(usersDataAfterAddLogin);
      const dynamicHeaders = createDynamicHeaderMapping(usersDataAfterAddLogin);
      setHeaderMapping(dynamicHeaders);
    } catch (error: any) {
      console.error(error);
      if (error === "No users found") {
        setUserData([]);
      }else {
        setModelData(error!);
        setIsModalOpen(true);
        setModelTitle("User fetching Failed");
        setModelType("error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialQuery = {
      includeTotal: true,
      page: 1,
      limit: 2,
      sort: 1,
    };
    setQuery(initialQuery);
    fetchUser(initialQuery);
  }, []);

  // Handlers for DynamicTable
  const handlePageChange = (page: number) => {
    const updatedQuery = { ...query, page };
    setQuery(updatedQuery);
    // fetchUser(updatedQuery);
  };

  const handleLimitChange = (limit: number) => {
    const updatedQuery = { ...query, limit, page: 1 };
    setQuery(updatedQuery);
    // fetchUser(updatedQuery);
  };

  const handleSortChange = (sort: "latest" | "start") => {
    const updatedQuery = { ...query, sort };
    setQuery(updatedQuery);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }));
    if (field && value === "") {
    }
  };
  const applyFilters = () => {
    console.log(filterValues, "in the function filter value");

    const updatedQuery = { ...query, ...filterValues };

    // Check and remove keys with blank values from updatedQuery
    Object.keys(updatedQuery).forEach((key) => {
      const value = updatedQuery[key];
      // Check if the value is a string and then trim
      if (typeof value === "string" && value.trim() === "") {
        delete updatedQuery[key];
      }
    });

    console.log(updatedQuery, "updatedQuery after cleaning");
    fetchUser(updatedQuery);
  };

  const resetFilters = () => {
    setFilterValues({});

    fetchUser(query);
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>
      
      {isLoading ? (
        <Loader />
      ) : (
        <DynamicTable
          data={userData || []}
          page={query?.page}
          headerMapping={headerMapping}
          initialSortOrder={query.sort}
          itemsPerPageOptions={[1, 2, 3, 4, 50, 60, 70, 80]}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          onApplyFilters={applyFilters} 
          totalEntries={totalUserInCollection}
          limit={query?.limit}
          totalPages={totalPages!}
          onResetFilter={resetFilters}
          filterValues={filterValues}
        />
      )}
       <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modelType as ModalType}
        title={modelTitle}
        message={modelData}
      />
    </div>
  );
}

export default UserManagement;
