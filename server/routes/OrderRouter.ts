import { OrderController } from '../controllers/OrderController'
import {PersistRouter} from './BaseRouter'
import { Model,Order } from '../models'
import {Router} from 'express'

export class OrderRouter extends PersistRouter<Order,OrderController> {
    controller: OrderController
    router: Router

    constructor (models: Model) {
        let ctrl = new OrderController(models)
        super(models,ctrl)
    }
}
