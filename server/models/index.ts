import { ClassSchemas, IModelsDAO, IModelsSchema } from './Schemas'
import { IRethinkDBConfig } from '../config/rethinkdb'

export * from '../interfaces/IUser'
export * from '../interfaces/IVehicle'
export { IResultSearch, IDAO, BaseModel } from './Model'
export { User, UserDAO } from './User'
export { Order , OrderDAO } from './Order'
export { Vehicle, VechicleDAO } from './Vechicle'
export { VehicleType, VechicleTypeDAO } from './VechicleType'
export { CargoType, CargoTypeDAO } from './CargoType'
export { Optional, OptionalDAO } from './Optional'
export { APIError } from './APIError'
export { IModelsDAO, IModelsSchema } from './Schemas'
export {Checkout} from './Checkout'

export class Model {
    db: IModelsDAO
    entities: IModelsSchema
    constructor(rethinkdbconfig: IRethinkDBConfig) {
        const classSchema = new ClassSchemas(rethinkdbconfig)
        this.db = classSchema.GetModels()
        this.entities = classSchema.GetModelSchema()
    }
}
