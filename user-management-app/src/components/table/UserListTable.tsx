import React, { useState } from 'react'
import type { UserData } from '../../types/userResponse'
import { Loader } from '../ui/Loader'
import { Link } from 'react-router-dom'
import { Images } from '../../assets'
import Modal from '../ui/Modal'
import dayjs from 'dayjs';


interface UserListTableProps {
  tableContent: UserData[]
  handleDelete?: (id: string) => void,
  isLoading?: boolean,
  isError?: boolean
}

const UserListTable: React.FC<UserListTableProps> = ({
  tableContent,
  handleDelete,
  isLoading,
  isError
}) => {

  // STATES
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserData>()

  console.log(tableContent.length)
  return (
    <>
      <table className='w-full text-center   border-spacing-0  '>
        <thead className="w-full sticky top-0   bg-[#F9F9FC] text-[#333843] ">
          <tr className=''>
            <th className='py-3 px-2'> Name</th>
            <th className='py-3  px-2'>Email</th>
            <th className='py-3 px-2'>Gender</th>
            <th className='py-3 px-2'>Phone Number</th>
            <th className='py-3 px-2'>Address</th>
            <th className='py-3'>Action</th>
          </tr>
        </thead>

        {/* <tbody>
          {
            isLoading && <Loader message='Please wait data is Fetching..' orientation='flex-row' color='blue' />

              ?
             tableContent && 

             tableContent.map((items)=>{
              return(
                <tr>
                  <td>{items.firstName}</td>
                </tr>
              )
             })
              :
              []
          }
        </tbody> */}
        <tbody className='w-full bg-white'>

          {
            isLoading
              ?
              <tr className='h-[30vh] '>
                <td colSpan={6} >
                  <Loader message='User list is Fetching...' />
                </td>
              </tr>
              :
              isError ?
                <tr className='h-[30vh]'>
                  <td colSpan={6}>
                    User Not Faund
                  </td>
                </tr>
                :
                tableContent && tableContent?.map((item) => {
                  return (
                    <>
                      <tr className='border-b  border-gray-200'>
                        <td className='py-8 max-w-[100px] '>{item.firstName} {item.lastName}</td>
                        <td className='py-8 max-w-[100px]'>{item.email}</td>
                        <td className='py-8 max-w-[100px]'>{item.gender}</td>
                        <td className='py-8 max-w-[100px]'>{item.phoneNumber}</td>
                        <td className='py-8 max-w-[100px] wrap-break-word'>{item.address}</td>
                        <td className="flex  justify-around items-center  py-8 px-3">

                          <Link to={`/user-list/edit-user/${item.id}`} className='cursor-pointer self-center'>
                            <img src={Images.edit_icon} width={24} height={24} alt="edit button" />
                          </Link>

                          <button onClick={() => handleDelete?.(item.id)} className='cursor-pointer'>
                            <img src={Images.delete_icon} width={24} height={24} alt="delete button" />
                          </button>

                          <button onClick={() => {
                            setUserDetails(item)
                            setIsModalOpen(true)
                          }
                          }
                            className='cursor-pointer'
                          >
                            <img src={Images.eye_icon} alt='view user' width={24} height={24} />
                          </button>
                        </td>
                      </tr >
                    </>
                  )
                })

          }

        </tbody>

      </table >
      {
        isModalOpen &&

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="User Detail">
          <div className='flex flex-col  gap-3'>
            <p> <span className='font-bold'> User Name :</span>  {userDetails?.firstName} {userDetails?.lastName}</p>
            <p><span className='font-bold'>Email :</span> {userDetails?.email}</p>
            <p><span className='font-bold'>Phone Number : </span>{userDetails?.phoneNumber}</p>
            <p><span className='font-bold'>Address :</span> {userDetails?.address}</p>
            <p><span className='font-bold'>Gender :</span> {userDetails?.gender}</p>
            <p><span className='font-bold'>Zip code :</span> {userDetails?.zipCode}</p>
            <p><span className='font-bold'>Created at : </span>  {dayjs(userDetails?.createdAt).format('YYYY-MM-DD')}</p>
          </div>
        </Modal>
      }

    </>
  )
}

export default UserListTable