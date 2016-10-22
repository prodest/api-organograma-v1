import { Model } from '../models'
import { BasePersistController } from './BaseControllers'
import { IUser } from '../interfaces/IUser'

export class UserController extends BasePersistController<IUser> {
    public constructor(model: Model) {
        super(model, model.db.users)
    }
}
