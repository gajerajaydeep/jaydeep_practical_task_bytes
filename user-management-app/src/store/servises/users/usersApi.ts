import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryfn } from '../../fetchBaseUrl'
import type { UserData } from '../../../types/userResponse'

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQueryfn(),
    endpoints: (builder) => ({
        // get all users
        getUserList: builder.query<UserData[], { search: string, page: number }>({
            query: (params) => ({
                url: `/users`,
                method: "GET",
                params: params
            }),
            keepUnusedDataFor: 0
        }),

        // delete user
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            })
        }),

        // add user
        addUsers: builder.mutation<void, any>({
            query: (userData) => ({
                url: `/users`,
                method: "POST",
                body: userData
            })
        }),

        // details user
        detaiUser: builder.query<UserData, string>({
            query: (id) => `/users/${id}`,
        }),

        // edit user
        editUser: builder.mutation<any, any>({
            query: ({ id, ...editData }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: editData
            })
        })

    })
})

export const { useGetUserListQuery, useDeleteUserMutation, useAddUsersMutation, useDetaiUserQuery , useEditUserMutation } = usersApi