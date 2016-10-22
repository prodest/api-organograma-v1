import {Model} from '../models'
import {  BasePersistController } from './BaseControllers'
import {IOptional}  from '../interfaces/IVehicle'

export class OptionalController extends BasePersistController<IOptional> {
    public constructor(model: Model) {
        super(model,model.db.optionals)
    }
}
