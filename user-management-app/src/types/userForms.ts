export interface UserFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    zipCode: string
    gender: {
        value: string,
        label: string
    };
}