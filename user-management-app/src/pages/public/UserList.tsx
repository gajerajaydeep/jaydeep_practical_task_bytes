import { useState } from "react"
import { Images } from "../../assets"
import { BreadCrubs } from "../../components/common/BreadCrubs"
import InputField from "../../components/form/form-elements/InputField"
import UserListTable from "../../components/table/UserListTable"
import { useDeleteUserMutation, useGetUserListQuery } from "../../store/servises/users/usersApi"
import { userListBreadCrubms } from "../../utils/breadCrubmsItems"
import useDebounce from "../../hooks/useDebounce"
import Swal from "sweetalert2"
import { toast } from "sonner"
import { Pagination } from "../../components/ui/Pagination"


const UserList = () => {

  // STATES
  const [searchTerms, setSearchTerms] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)


  // HOOKS
  const debouncedTerms = useDebounce(searchTerms, 300);

  // API CALLING
  const { data: usersData, isLoading, refetch, isError } = useGetUserListQuery({ search: debouncedTerms, page: currentPage })
  const [deleteUser] = useDeleteUserMutation()


  // HANDLER FUNCTIONS
  // 1. search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.trim()
    if (inputValue !== "") {
      setSearchTerms(inputValue);
      setCurrentPage(1)
    } else {
      setSearchTerms("")
    }
  }

  // 2. delete user handlerhf
  const handleDeleteItem = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await deleteUser(id).unwrap()
        if (res) {
          toast.success("User delete Successfully")
          refetch();
        }
      } catch (error: any) {
        toast.error("Something Wents wrong", error)
      }
    }

  }

  // PAGINATION VARIABLES
  const itemsPerPage = 10
  const totalUsers = usersData?.length ?? 0
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = usersData?.slice(startIndex, endIndex)

  return (
    <>
      <div className="container pt-10 flex flex-col">
        {/*  sub- hesding section*/}
        <div className=" flex flex-col gap-2 py-3">
          <p className="font-medium text-2xl leading-8">User List</p>
          <BreadCrubs
            BreadCrubmItems={userListBreadCrubms}
          />
        </div>

        <div className="w-full flex flex-col justify-center gap-4">
          <div className="w-full ">
            <InputField
              type="text"
              placeholder="Search Here..!!"
              icon={Images.search_icon}
              onChange={handleSearch}
              className="rounded-full"
              width="w-4/7 mx-auto shadow-lg"

            />
          </div>
          <div className="overflow-x-auto border border-gray-400 rounded-lg relative">

            <div className="h-[55vh] overflow-y-auto">
              <UserListTable
                tableContent={paginatedUsers || []}
                isLoading={isLoading}
                handleDelete={handleDeleteItem}
                isError={isError}
              />
            </div>


            {
              (!isError || !isLoading)
                ?
                <Pagination
                  totalData={totalUsers}
                  onPageChange={(page) => setCurrentPage(page)}
                  itemsPerPage={10}
                  currentPage={currentPage || 1}
                />
                :
                null
            }




          </div>
        </div>
      </div>

    </>
  )
}

export default UserList