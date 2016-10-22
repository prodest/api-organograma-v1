import { DAO, BaseModel, baseModel } from './Model'
import { IOrder,IOrderItem,IOrderOptions } from '../interfaces/IOrder'
import { IUser } from '../interfaces/IUser'
import { IModelsSchema } from './Schemas'
import * as thinky from 'thinky'
import * as Bluebird from 'bluebird'
/**
 * Model para os veiculos
 * 
 * @class Vechicle
 * @implements {Model.DAO<Model.Vechicle>}
 */

export class Order extends BaseModel implements IOrder {
    name: string
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
    constructor(obj: any) {
        super(obj)
        this.orderUser = obj.orderUser || null
        this.clientUser = obj.clientUser || null
        this.orderDate = obj.orderDate || null
        this.paymentDate = obj.paymentDate || null
        this.acceptedDate = obj.acceptedDate || null
        this.scheduleDate = obj.scheduleDate || null
        this.closedDate = obj.closedDate || null
        this.active = obj.active || null
        this.itens = obj.itens || null
        this.options = obj.options || null
        this.avaliation = obj.avaliation || null
        this.avaliationDate = obj.avaliationDate || null
        this.avaliationComment = obj.avaliationComment || null
    }
}

export class OrderDAO extends DAO<IOrder> {
    collection: thinky.Model<any,any,any>

    constructor(models: IModelsSchema) {
        super(models, models.Order)
    }
    /**
     * Cria uma novo veiculo
     * 
     * @param {any} params
     * @returns
     */
    public create(order: Order): Bluebird<Order> {
        let _order = new Order(order)
        return (new this.collection(_order)).save()
    }
}

export const orderModel = (T: thinky.Thinky) => {
  let base = baseModel(T)
  let m = {
      // todo modelar
  }

  let orderSchema = T.createModel('orders' , Object.assign({}, base, m ))

  return orderSchema
}
