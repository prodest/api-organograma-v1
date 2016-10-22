import { UserController } from '../controllers/UserController'
import { PersistRouter } from './BaseRouter'
import { User } from '../models'
import { Router } from 'express'

export class UserRouter extends PersistRouter<User, UserController> {
    controller: UserController
    router: Router

    constructor (store: JSData.DS) {
        let ctrl = new UserController(store)
        super(store, ctrl)
    }
}
