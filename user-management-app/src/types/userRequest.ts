export interface UserRequest {
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    phoneNumber: string,
    address: string,
    zipCode: string
}

export interface EditUserRequest {
    id: string | undefined,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    phoneNumber: string,
    address: string,
    zipCode: string
}