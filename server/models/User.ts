import { DAO, BaseModel, baseModel } from './Model'
import { IModelsSchema } from './Schemas'
import { IUser, TypePerson, TypeUser } from '../interfaces/IUser'
import { IVehicle } from '../interfaces/IVehicle'
import * as thinky from 'thinky'
import * as Bluebird from 'bluebird'
/**
 * Model para os usuários
 * 
 * @class User
 * @implements {Model.DAO<Model.User>}
 */

export class User extends BaseModel implements IUser {
    name: string
    tpPessoa: TypePerson
    tpUsuario: TypeUser
    active: boolean
    numDocFed: string
    telephone: string
    email: string
    password: string
    zipCode: string
    address: string
    number: string
    complement: string
    neighbor: string
    state: string
    country: string
    userContractor: IUser
    vehicles: [IVehicle]
    constructor(obj: IUser) {
        super(obj)
        this.tpPessoa = obj.tpPessoa || null
        this.tpUsuario = obj.tpUsuario || null
        this.active = obj.active || null
        this.numDocFed = obj.numDocFed || null
        this.telephone = obj.telephone || null
        this.email = obj.email || null
        this.password = obj.password || null
        this.zipCode = obj.zipCode || null
        this.address = obj.address || null
        this.number = obj.number || null
        this.complement = obj.complement || null
        this.neighbor = obj.neighbor || null
        this.state = obj.state || null
        this.country = obj.country || null
        this.userContractor = obj.userContractor || null
        this.vehicles = obj.vehicles || null
    }
}

export class UserDAO extends DAO<IUser> {
    collection: thinky.Model<any,any,any>

    constructor(models: IModelsSchema) {
        super(models, models.User)
    }

    /**
     * Cria uma nova página
     * 
     * @param {any} params
     * @returns
     */
    public create(user: IUser): Bluebird<IUser> {
        let _user = new User(user)
        return (new this.collection(_user)).save()
    }
}

export const userModel = (T: thinky.Thinky) => {
  let base = baseModel(T)
  let m = {
            tpPessoa: T.type.number().required().default(TypePerson.Personal),
            tpUsuario: T.type.number().required().default(TypeUser.Client),
            active: T.type.boolean().default(true),
            numDocFed: T.type.string(),
            telephone: T.type.string(),
            email: T.type.string().required().email(),
            password: T.type.string(),
            zipCode: T.type.string(),
            address: T.type.string(),
            number: T.type.string(),
            complement: T.type.string(),
            neighbor: T.type.string(),
            state: T.type.string(),
            country: T.type.string(),
            userIdContractor: T.type.string()
        }
  let userSchema = T.createModel('users' , Object.assign({}, base, m ))

  return userSchema
}
