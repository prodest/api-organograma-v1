import { UserController } from '../controllers/UserController'
import { PersistRouter } from './BaseRouter'
import { Model, IUser } from '../models'
import { Router } from 'express'

export class UserRouter extends PersistRouter<IUser, UserController> {
    controller: UserController
    router: Router

    constructor (models: Model) {
        let ctrl = new UserController(models)
        super(models, ctrl)
    }
}
