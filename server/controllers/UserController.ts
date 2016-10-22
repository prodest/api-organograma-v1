import { User , UserDAO } from '../models'
import * as JSData from 'js-data'
import { BasePersistController } from './BaseControllers'

export class UserController extends BasePersistController<User> {
    public constructor(store: JSData.DS) {
        super(new UserDAO(store))
    }
}
