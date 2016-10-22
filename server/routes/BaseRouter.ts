import { Response, Router } from 'express'
import { APIError, BaseModel } from '../models'
import { BasePersistController } from '../controllers/BaseControllers'
import * as JSData from 'js-data'

export class BaseRouter {
    respond (t: JSData.JSDataPromise<any>, res: Response): JSData.JSDataPromise<Response> {
        return t
        .then((u) => res.json(u))
        .catch((err: APIError) => {
            return res.status(err.statusCode).json({error: err.message, model: err.objectResponse})
        })
    }
}

export class PersistRouter<M extends BaseModel, C extends BasePersistController<M>> extends BaseRouter {
    controller: BasePersistController<M>
    router: Router

    constructor (store: JSData.DS, controller: BasePersistController<M>) {
        super()
        this.controller = controller
        this.router = Router()
        this.routers()
    }

    public routers() {
        let ctrl = this.controller
        /* GET lista todos os registros da classe corrente em controller. */
        this.router.get('/', (req, res, next) => this.respond(ctrl.findAll(req, res, next),res))

        /* GET busca o registro com o id. */
        this.router.get('/:id', (req, res, next) => this.respond(ctrl.find(req, res, next),res))

        /* POST cria um novo registro da classe corrente em controller. */
        this.router.post('/', (req, res, next) => this.respond(ctrl.create(req, res, next),res))

        /* PUT atualiza o registro. */
        this.router.put('/:id', (req, res, next) => this.respond(ctrl.update(req, res, next),res))

        /* DELETE deleta o registro com o id. */
        this.router.delete('/:id', (req, res, next) => this.respond(ctrl.delete(req, res, next),res))

        /* POST lista paginada com os registros da classe corrente em controller. */
        this.router.post('/query', (req, res, next) => this.respond(ctrl.query(req, res, next),res))
    }

    public getRouter(): Router {
        return this.router
    }
}
