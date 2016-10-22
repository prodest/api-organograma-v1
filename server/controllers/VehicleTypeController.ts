import {Model} from '../models'
import {  BasePersistController } from './BaseControllers'
import {IVehicleType}  from '../interfaces/IVehicle'

export class VehicleTypeController extends BasePersistController<IVehicleType> {
    public constructor(model: Model) {
        super(model,model.db.vehicleTypes)
    }
}
