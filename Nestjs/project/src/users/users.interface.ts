export interface CreateNewUserInput{
    name: string,
    age: number,
    indentityNumber: string,
    phoneNumber: string,
    employeeId: string
}

export interface UpdateUserInput{
    id: string,
    name: string,
    age: number,
    identityNumber: string,
    phoneNumber: string,
    employeeId: string
}

export interface DeleteUserInput{
    id: string
}