import {DAO, BaseModel, baseModel} from './Model'
import {IModelsSchema} from './Schemas'
import {IVehicleType} from '../interfaces/IVehicle'
import * as thinky from 'thinky'
import * as Bluebird from 'bluebird'
/**
 * Model para os veiculos
 * 
 * @class Vechicle
 * @implements {Model.DAO<Model.Vechicle>}
 */
export class VehicleType extends BaseModel implements IVehicleType {
    name: string
    icon: string
    active: boolean
    maxDimensions: string
    maxWeight: string
    constructor(obj: IVehicleType) {
        super(obj)
        this.active = obj.active
        this.icon = obj.icon
        this.maxDimensions = obj.maxDimensions
        this.maxWeight = obj.maxWeight
    }
}

export class VechicleTypeDAO extends DAO<IVehicleType> {
    collection: thinky.Model<any,any,any>

    constructor(models: IModelsSchema) {
        super(models,models.VehicleType)
    }

    /**
     * Cria uma novo veiculo
     * 
     * @param {any} params
     * @returns
     */
    public create(vehicleType: IVehicleType): Bluebird<IVehicleType> {
        let _vehicleType = new VehicleType(vehicleType)
        return this.collection.save(_vehicleType)
    }
}

export const vehicleTypeModel = (T: thinky.Thinky) => {
  let base = baseModel(T)
  let m = {
            icon: T.type.string().required(),
            maxDimensions: T.type.string().required(),
            maxWeight: T.type.string().required(),
            active: T.type.boolean().required().default(true)
          }

  let vehicleTypeSchema = T.createModel('vehicleTypes' , Object.assign({}, base, m ))

  return vehicleTypeSchema
}
