//props of what we get back
export interface IUser {
    userName: string;
    displayName: string;
    token: string;
    image?: string
}

//For login and register
export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}

