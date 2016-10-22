import { IModel, IVehicle } from '../interfaces'

export interface IUser extends IModel {
    tpPessoa: TypePerson
    tpUsuario: TypeUser
    active: boolean
    numDocFed: string
    telephone: string
    email: string
    password: string
    zipCode: string
    address: string
    number: string
    complement: string
    neighbor: string
    state: string
    country: string
    userContractor: IUser
    vehicles: [IVehicle]
}

export enum TypePerson {
    Personal = 0,
    Enterprise = 1
}

export enum TypeUser {
    Client = 0,
    Freighter = 1,
    Operator = 2,
    Administrator = 3
}

