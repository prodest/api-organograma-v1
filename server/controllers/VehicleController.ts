import {Model} from '../models'
import { BasePersistController } from './BaseControllers'
import {IVehicle} from '../interfaces/IVehicle'


export class VehicleController extends BasePersistController<IVehicle> {
    public constructor(model: Model) {
        super(model,model.db.vehicles)
    }
}
