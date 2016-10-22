import {IOrder} from './IOrder'
import {IModel} from './IModel'
import {IUser} from './IUser'


export interface ITransaction extends IModel {
    user: IUser,
    order: IOrder,
    transactionDate: Date,
    status: TypePaymentStatus,
    value: number,
    logs: [ITransactionLog]
}

export interface ITransactionLog extends IModel {
    date: Date
    status: TypePaymentStatus
    data: Object
}


export enum TypePaymentStatus {
    InProcess = 0,
    Paid = 1,
    Canceled = 2
}
