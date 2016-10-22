import {DAO, BaseModel, baseModel} from './Model'
import {IModelsSchema} from './Schemas'
import {ICargoType} from '../interfaces/IVehicle'
import * as thinky from 'thinky'
import * as Bluebird from 'bluebird'
/**
 * Model para os veiculos
 * 
 * @class Vechicle
 * @implements {Model.DAO<Model.Vechicle>}
 */

export class CargoType extends BaseModel implements ICargoType {
    name: string
    cost: number
    active: boolean
    maxDimensions: string
    maxWeight: string
    constructor(obj: ICargoType) {
        super(obj)
        this.cost = obj.cost
        this.active = obj.active
        this.maxDimensions = obj.maxDimensions
        this.maxWeight = obj.maxWeight
    }
}

export class CargoTypeDAO extends DAO<ICargoType> {
    constructor(models: IModelsSchema) {
        super(models, models.CargoType)
    }

    /**
     * Cria uma novo veiculo
     * 
     * @param {any} params
     * @returns
     */
    public create(cargoType: ICargoType): Bluebird<ICargoType> {
        let _cargoType = new CargoType(cargoType)
        return this.collection.save(_cargoType)
    }
}

export const cargoTypeModel = (T: thinky.Thinky) => {
  let base = baseModel(T)
  let m = {
            cost: T.type.number().required(),
            maxDimensions: T.type.string().required(),
            maxWeight: T.type.string().required(),
            active: T.type.boolean().required().default(true)
          }

  let cargoTypeSchema = T.createModel('cargoTypes' , Object.assign({}, base, m ))

  return cargoTypeSchema
}
