import { DAO, BaseModel, baseModel } from './Model'
import { IModelsSchema } from './Schemas'
import { IOptional } from '../interfaces/IVehicle'
import * as thinky from 'thinky'
import * as Bluebird from 'bluebird'
/**
 * Model para os veiculos
 * 
 * @class Vechicle
 * @implements {Model.DAO<Model.Vechicle>}
 */

export class Optional extends BaseModel implements IOptional {
    name: string
    cost: number
    active: boolean
    constructor(obj: IOptional) {
        super(obj)
        this.cost = obj.cost
        this.active = obj.active
    }
}

export class OptionalDAO extends DAO<IOptional> {
    collection: thinky.Model<any,any,any>

    constructor(models: IModelsSchema) {
        super(models, models.Optional)
    }

    /**
     * Cria uma novo veiculo
     * 
     * @param {any} params
     * @returns
     */
    public create(optional: IOptional): Bluebird<IOptional> {
        let _optional = new Optional(optional)
        return (new this.collection(_optional)).save()
    }
}

export const optionalModel = (T: thinky.Thinky) => {
  let base = baseModel(T)
  let m = {
            cost: T.type.number().required(),
            active: T.type.boolean().required().default(true)
  }

  let optionalSchema = T.createModel('optionals' , Object.assign({}, base, m ))

  return optionalSchema
}
