import { UserController } from '../controllers/UserController'
import { Router } from 'express'
import { BaseRouter, IRouter } from './BaseRouter'

export class UserRouter extends BaseRouter implements IRouter {
    controller: UserController
    constructor() {
        super()
        let ctrl = new UserController()
        this.routers()
    }

    public routers() {
        this.router.get('/', (req, res, nex) => res.json('ok'))
    }

    public getRouter(): Router {
        return this.router
    }
}
