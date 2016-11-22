import { OrgaosController } from '../controllers/OrgaosController'
import { Request, Response, Router } from 'express'
import { BaseRouter, IRouter } from './BaseRouter'

export class OrgaosRouter extends BaseRouter implements IRouter {
    ctrl: OrgaosController
    constructor() {
        super()
        this.ctrl = new OrgaosController()
        this.routers()
    }

    public routers() {
        this.router.get('/:id', (req, res, next) => this._getOrgaosByIdRouter(req, res))
        this.router.get('/', (req, res, next) => this._getOrgaosRouter(req, res))
    }

    public getRouter(): Router {
        return this.router
    }

    private _getOrgaosRouter(req: Request, res: Response) {
        this.ctrl.getOrgaos().then((orgaos) => res.send(orgaos))
    }

    private _getOrgaosByIdRouter(req: Request, res: Response) {
        this.ctrl.getOrgaosById(req.params.id).then((orgaos) => res.send(orgaos))
    }

}
