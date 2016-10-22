import { VehicleTypeController } from '../controllers/VehicleTypeController'
import {PersistRouter} from './BaseRouter'
import { Model,IVehicleType } from '../models'
import {Router} from 'express'

export class VehicleTypeRouter extends PersistRouter<IVehicleType,VehicleTypeController> {
    controller: VehicleTypeController
    router: Router

    constructor (models: Model) {
        let ctrl = new VehicleTypeController(models)
        super(models,ctrl)
    }
}
