import { OptionalController } from '../controllers/OptionalController'
import {PersistRouter} from './BaseRouter'
import { Model,IOptional } from '../models'
import {Router} from 'express'

export class OptionalRouter extends PersistRouter<IOptional,OptionalController> {
    controller: OptionalController
    router: Router

    constructor (models: Model) {
        let ctrl = new OptionalController(models)
        super(models,ctrl)
    }
}
