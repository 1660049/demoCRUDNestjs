export interface CreateNewEmployeeInput {
  name: string,
  age: number,
  identityNumber: string,
  phoneNumber: string,
  managerId: string,
}
export interface UpdateEmployeeInput {
  id: string,
  name: string,
  age: number,
  identityNumber: string,
  phoneNumber: string,
  managerId: string,
}

export interface DeleteEmployeeInput {
  id: string
}
