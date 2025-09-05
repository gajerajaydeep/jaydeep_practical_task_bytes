import { useForm } from "react-hook-form"
import { BreadCrubs } from "../../components/common/BreadCrubs"
import { DropDown } from "../../components/form/form-elements/DropDown"
import InputField from "../../components/form/form-elements/InputField"
import { TextArea } from "../../components/form/form-elements/TextArea"
import { EditUserBreadCrubms } from "../../utils/breadCrubmsItems"
import { genderOptions } from "../../utils/dropDownOptions"
import type { UserFormValues } from "../../types/userForms"
import { yupResolver } from "@hookform/resolvers/yup"
import { userFormValidationSchema } from "../../validations/userFormValidation"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import Button from "../../components/ui/Button"
import { useDetaiUserQuery, useEditUserMutation } from "../../store/servises/users/usersApi"
import { useEffect } from "react"
import { Loader } from "../../components/ui/Loader"

const EditUser = () => {
  // HOOKS
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setError,
    setValue
  } = useForm<UserFormValues>({
    resolver: yupResolver(userFormValidationSchema),
    mode: 'all',
  })

  const navigate = useNavigate()
  const { id } = useParams()

  // API CALL
  const { data: detailUserData, isLoading: isPrevUserDetailsLoading } = useDetaiUserQuery(String(id))
  const [editUser, { isLoading }] = useEditUserMutation()

  // SET PREV USER DATA
  useEffect(() => {
    if (detailUserData) {
      (Object.keys(detailUserData) as (keyof UserFormValues)[]).forEach((key) => {
        if (detailUserData[key] !== undefined) {
          setValue(key, detailUserData[key]);
        }
      });

      if (detailUserData?.gender) {
        const genderOption = genderOptions.find(
          (opt) => opt.value.toLowerCase() === detailUserData.gender.toLowerCase()
        );
        if (genderOption) {
          setValue("gender", genderOption);
        }
      }
    }
  }, [detailUserData])


  // HANDLERS FUNCTIONS
  const onFormSubmit = async (data: UserFormValues) => {
    try {
      const res = await editUser({
        id: id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender.value,
        phoneNumber: data.phoneNumber,
        address: data.address,
        zipCode: data.zipCode,
      })
      if (res) {
        toast.success("User Updated Successfully!!")
        navigate("/")
      }
    }
    catch (error: any) {
      const apiErrors = error?.data?.data?.errors || {};

      Object.entries(apiErrors).forEach(([field, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          setError(field as keyof UserFormValues, {
            message: messages[0],
          });
        }
      });

      toast.error(
        error?.data?.message || error?.error || "Something went wrong"
      );
    }
  }
  return (
    <>
      <div className="container py-5 flex flex-col">
        {/*  sub- hesding section*/}
        <div className=" flex flex-col gap-3 py-5">
          <p className="font-medium text-2xl leading-8">Add User</p>
          <BreadCrubs
            BreadCrubmItems={EditUserBreadCrubms}
          />
        </div>

        <div className="w-full flex flex-col justify-center gap-4 mx-auto">
          {
            isPrevUserDetailsLoading ? <Loader message="Please wait data is Fetching..." /> :
              <form onSubmit={handleSubmit(onFormSubmit)} className="border border-gray-300 rounded-lg" >
                <h1 className='text-center font-bold text-xl md:text-3xl my-4 underline'>Edit User Form</h1>
                <div className='w-full flex gap-5 flex-col md:flex-row md:justify-center '>
                  <div className="w-full md:w-2/5 flex flex-col gap-4">
                    <InputField
                      placeholder="Enter first name "
                      label="First Name"
                      type="text"
                      {...register("firstName")}
                      error={errors?.firstName?.message}
                      className='rounded-lg'
                    />
                    <InputField
                      placeholder="Enter last Name"
                      label="Last name"
                      type="text"
                      {...register("lastName")}
                      error={errors?.lastName?.message}
                      className='rounded-lg'
                    />
                    <InputField
                      placeholder="Enter email id"
                      label="Email"
                      type="email"
                      {...register("email")}
                      error={errors?.email?.message}
                      className='rounded-lg'
                    />
                    <InputField
                      placeholder="Enter phone number"
                      label="Phone Number"
                      type="number"
                      maxLength={10}
                      inputMode='numeric'
                      {...register("phoneNumber")}
                      error={errors?.phoneNumber?.message}
                      className='rounded-lg'
                    />

                  </div>


                  <div className='w-full md:w-2/5 flex flex-col gap-4'>
                    <InputField
                      type="number"
                      placeholder="Enter zip Code"
                      label="Zip Code"
                      {...register("zipCode")}
                      error={errors?.zipCode?.message}
                      className='rounded-lg'

                    />
                    <DropDown
                      option={genderOptions}
                      name="gender"
                      control={control}
                      placeholder="Select gender"
                      label="Gender"
                      error={errors?.gender?.message}

                    />
                    <TextArea
                      label="Address"
                      placeholder="Enter addres"
                      {...register("address")}
                      error={errors?.address?.message}

                    />
                    <div className='flex justify-end my-5'>
                      <Button
                        text="Update"
                        type="submit"

                        disable={isLoading}
                        isLoading={isLoading}
                        className='px-5 py-3'
                      />
                    </div>
                  </div>

                </div>

              </form>
          }

        </div>
      </div>
    </>
  )
}

export default EditUser