import { UserController } from '../controllers/UserController'
import { Router } from 'express'

export class UserRouter {
    controller: UserController
    router: Router

    constructor () {
        let ctrl = new UserController()
    }
}
