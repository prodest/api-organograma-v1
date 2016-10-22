import { IModel } from '../interfaces'

export interface IVehicle extends IModel {
    active: boolean
    cost: number
    vehicleTypeId: string
    vehicleType: IVehicleType
    cargoTypes: ICargoType[]
    optionals: IOptional[]
}

export interface IVehicleType extends IModel {
    icon: string
    maxDimensions: string
    maxWeight: string
    active: boolean
}

export interface ICargoType extends IModel {
    maxDimensions: string
    maxWeight: string
    cost: number
    active: boolean
}

export interface IOptional extends IModel {
    cost: number
    active: boolean
}
