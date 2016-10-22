import { DAO, BaseModel, baseModel } from './Model'
import { IModelsSchema } from './Schemas'
import { IVehicle, IVehicleType, IOptional, ICargoType } from '../interfaces/IVehicle'
import * as thinky from 'thinky'
import * as Bluebird from 'bluebird'
/**
 * Model para os veiculos
 * 
 * @class Vechicle
 * @implements {Model.DAO<Model.Vechicle>}
 */


export class Vehicle extends BaseModel implements IVehicle {
    name: string
    cost: number
    active: boolean
    vehicleTypeId: string
    vehicleType: IVehicleType
    cargoTypes: ICargoType[]
    optionals: IOptional[]

    constructor(obj: IVehicle) {
        super(obj)
        this.cost = obj.cost || null
        this.active = obj.active || null
        this.vehicleType = obj.vehicleType || null
        this.cargoTypes = obj.cargoTypes || []
        this.optionals = obj.optionals || []
    }
}



export class VechicleDAO extends DAO<IVehicle> {
    constructor(models: IModelsSchema) {
        super(models, models.Vechicle,{vehicleType: true, cargoTypes: true, optionals: true})
    }

    /**
     * Cria uma novo veiculo
     * 
     * @param {any} params
     * @returns
     */
    public create(vehicle: IVehicle): Bluebird<IVehicle> {
        let _vehicle = new Vehicle(vehicle)
        let self = this
        return this.isValidKey(this.db.VehicleType,_vehicle.vehicleType)
            .then((resp) => {
                if (resp) {
                  _vehicle.vehicleTypeId = _vehicle.vehicleType.id
                  delete(_vehicle.vehicleType)
                }
                return (new self.collection(_vehicle)).save()
            })
    }
}

export const vehicleModel = (T: thinky.Thinky) => {
  let base = baseModel(T)
  let m = {
            active: T.type.boolean().required().default(true),
            // vehicleTypeId: T.type.string().required()
            // cargoTypes: T.type.array().schema(T.type.string()),
            // optionals: T.type.array().schema(T.type.string())
  }

  let vehicleSchema = T.createModel('vehicles' , Object.assign({}, base, m ))

  return vehicleSchema
}
