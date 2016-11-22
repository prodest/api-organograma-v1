import { UserController } from '../controllers/UserController'
import { Router } from 'express'

export class UserRouter {
    controller: UserController
    router: Router

    constructor () {
        let ctrl = new UserController()
    }

    public routers() {
        this.router.get('/', (req,res,nex) => res.json('ok'))
    }

    public getRouter(): Router {
        return this.router
    }
}
