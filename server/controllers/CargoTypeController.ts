import {Model} from '../models'
import { BasePersistController } from './BaseControllers'
import {ICargoType} from '../interfaces/IVehicle'

export class CargoTypeController extends BasePersistController<ICargoType> {
    public constructor(model: Model) {
        super(model,model.db.cargoTypes)
    }
}
