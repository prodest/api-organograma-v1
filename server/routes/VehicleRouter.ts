import { VehicleController } from '../controllers/VehicleController'
import {PersistRouter} from './BaseRouter'
import { Model,IVehicle } from '../models'
import {Router} from 'express'

export class VehicleRouter extends PersistRouter<IVehicle,VehicleController> {
    controller: VehicleController
    router: Router

    constructor (models: Model) {
        let ctrl = new VehicleController(models)
        super(models,ctrl)
    }
}
