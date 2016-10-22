import {Model} from '../models'
import { BasePersistController } from './BaseControllers'
import {Order} from '../models'

export class OrderController extends BasePersistController<Order> {
    public constructor(model: Model) {
        super(model,model.db.orders)
    }
}
