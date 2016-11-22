import { Router } from 'express'

export class BaseRouter implements IRouter {
    router: Router

    constructor() {
        this.router = Router()
    }

    public routers() {
        this.router.get('/', (req, res, nex) => res.json('ok'))
    }

    public getRouter(): Router {
        return this.router
    }
}

export interface IRouter {
    router: Router
    getRouter(): Router
}
