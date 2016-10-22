import { CargoTypeController } from '../controllers/CargoTypeController'
import {PersistRouter} from './BaseRouter'
import { Model,ICargoType } from '../models'
import {Router} from 'express'

export class CargoTypeRouter extends PersistRouter<ICargoType,CargoTypeController> {
    controller: CargoTypeController
    router: Router

    constructor (models: Model) {
        let ctrl = new CargoTypeController(models)
        super(models,ctrl)
    }
}
