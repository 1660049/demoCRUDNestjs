import { Observable } from "rxjs";

export interface EmployeesService{
    getAllEmployee({}): Observable<StringEmployeeGetDataResponse> ;
    createNewEmployee(createNewEmployeeInput: CreateNewEmployeeInput) : Observable<StringEmployeeDataResponse>;
}

export interface Employee{
    name: string,
    age: number,
    indentityNumber: string,
    phoneNumber: string,
    managerId: string
}

export interface StringEmployeeGetDataResponse{
    listEmployee: Employee[]
}

export interface CreateNewEmployeeInput{
    name: string,
    age: number,
    identityNumber: string,
    phoneNumber: string,
    managerId: string
    // string name = 1;
    // int32 age = 2;
    // string identityNumber = 3;
    // string phoneNumber = 4;
    // string managerId = 5;
}

export interface StringEmployeeDataResponse{
    code: number,
    message: string,
    result: Employee
    // int32 code = 1;
    // string message = 2;
    // Employee result = 3;
}