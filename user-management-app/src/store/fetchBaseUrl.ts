import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fetchBaseQueryfn = () => {
    return fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
    })
}