import {IModel} from './IModel'
import {IUser} from './IUser'
import {IVehicle,ICargoType,IOptional} from './IVehicle'

export interface IOrder extends IModel {
    orderUser: IUser
    clientUser: IUser
    orderDate: Date
    paymentDate: Date
    acceptedDate: Date
    scheduleDate: Date
    closedDate: Date
    active: Boolean
    itens: [IOrderItem]
    options: [IOrderOptions]
    avaliation: number
    avaliationDate: Date
    avaliationComment: string
}

export interface IOrderItem extends IModel {
    vehicle: IVehicle
    cargo: ICargoType
    unitValue: number
    qtd: number
    typeQtd: string
    discount: number
    totalValue: number
    active: Boolean
}

export interface IOrderOptions extends IModel {
    optional: IOptional
    unitValue: number
    qtd: number
    discount: number
    totalValue: number
    active: Boolean
}


export enum TypePaymentStatus {
    WaitingPayment = 0,
    WaitingDriver = 2,
    WaitingService = 4,
    WaitingAValiation = 6,
    Closed = 6,
    Canceled = 10
}
