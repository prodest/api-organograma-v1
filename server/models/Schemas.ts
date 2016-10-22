import { UserDAO, userModel } from '../models/User'
import { VechicleDAO, vehicleModel } from '../models/Vechicle'
import { VechicleTypeDAO , vehicleTypeModel } from '../models/VechicleType'
import { OrderDAO , orderModel } from '../models/Order'
import { CargoTypeDAO, cargoTypeModel } from '../models/CargoType'
import { OptionalDAO, optionalModel } from '../models/Optional'
import { IRethinkDBConfig, rethinkdbconfig } from '../config/rethinkdb'
import * as thinky from 'thinky'

/**
 * 
 * tipos de dados para persistir no schema 
 * com esse tipo de dados é possivel criar o schema
 * TODO 
 * @export
 * @interface IModelsDAO
 */
// const model =  { id: this.t.type.string().default(() => shortid.generate()),
//                  name: this.t.type.string().required(),
//                  userId: this.t.type.string(),
//                  insertedAt: this.t.type.date().default(new Date(Date.now()))
// }

/**
 * 
 * para uma interface forte, sempre é bom declarar aqui os elmentos da as persistencias
 * a declaracao faz parte do escopo de criacao e coordenacao de todo o schema
 * 
 * interface do dao
 * 
 * @interface IModelsDAO
 */
export interface IModelsDAO {
    users: UserDAO,
    vehicles: VechicleDAO,
    vehicleTypes: VechicleTypeDAO,
    optionals: OptionalDAO,
    cargoTypes: CargoTypeDAO,
    orders: OrderDAO
}

/**
 * interface do modelo pelo schema declarado
 * 
 * @interface IModelsSchema
 */

export interface IModelsSchema {
    User: thinky.Model<any,any,any>,
    Vechicle: thinky.Model<any,any,any>,
    Optional: thinky.Model<any,any,any>,
    CargoType: thinky.Model<any,any,any>,
    VehicleType: thinky.Model<any,any,any>,
    Order: thinky.Model<any,any,any>
}

export class ClassSchemas {
    modelSchema: IModelsSchema
    models: IModelsDAO
    t: thinky.Thinky
    constructor(config: IRethinkDBConfig) {
        this.t = thinky(rethinkdbconfig)
        this.generateModelSchema()
        this.generateModels()
    }

    public GetModels(): IModelsDAO {
        return this.models
    }

    public GetModelSchema(): IModelsSchema {
        return this.modelSchema
    }

    private generateModelSchema() {
        let userSchema = userModel(this.t)
        let vehicleSchema = vehicleModel(this.t)
        let optionalSchema = optionalModel(this.t)
        let vehicleTypeSchema = vehicleTypeModel(this.t)
        let orderSchema = orderModel(this.t)
        let cargoTypeSchema = cargoTypeModel(this.t)
        /**
         * definicao de relacionamento 
         * todo relacionameto deve ser definido no schema, já que todos os modelos se encontram aqui
         */

        /**
         * contratante do usuario 
         * user <> user
         * 1 - n (autoreferenciado)
         */
        userSchema.hasMany(userSchema,'users','id','userIdContractor', null)
        userSchema.belongsTo(userSchema, 'userContractor', 'userIdContractor', 'id', null)

        /**
         * veiculos do usuário 
         * 
         * user(s) <> vehicle(s)
         * o mesmo veiculo pode pertencer a mais de um usuario, por isso é uma relacao
         * n - n 
         * 
         */
        userSchema.hasAndBelongsToMany(vehicleSchema, 'vehicles', 'id', 'id', null)
        vehicleSchema.hasAndBelongsToMany(userSchema, 'users', 'id', 'id', null)

        /**
         * tipo de veiculo do veiculo  
         * 
         * vehicle <> vehicleType(s)
         *  1 - n 
         */
        vehicleTypeSchema.hasMany(vehicleSchema,'vehicles','id','vehicleTypeId', null )
        vehicleSchema.belongsTo(vehicleTypeSchema, 'vehicleType', 'vehicleTypeId', 'id', null )
        /**
         * tipos de cargas do veiculo  
         * 
         * cargoType(s) <> vehicle(s)
         * um veiculo pode ter n cargas diferentes e a mesma carga pode estar em n veiculos diferentes, por isso 
         * n - n 
         * 
         */
        vehicleSchema.hasAndBelongsToMany(cargoTypeSchema, 'cargoTypes', 'id', 'id', null)
        // cargoTypeSchema.hasAndBelongsToMany(vehicleSchema, 'vehicles', 'id', 'id', null)

        /**
         * opcionais do veiculo 
         * 
         * user(s) <> vehicle(s)
         * um veiculo pode ter n opcionais diferentes e o mesmo opcional pode estar em n veiculos diferentes, por isso
         * n - n 
         * 
         */
        vehicleSchema.hasAndBelongsToMany(optionalSchema, 'optionals', 'id', 'id', null)
        optionalSchema.hasAndBelongsToMany(vehicleSchema, 'vehicles', 'id', 'id', null)

        this.modelSchema = {
            User: userSchema,
            Vechicle: vehicleSchema,
            Optional: optionalSchema,
            VehicleType: vehicleTypeSchema ,
            CargoType: cargoTypeSchema,
            Order: orderSchema
        }
    }

    private generateModels() {
        this.models = {
            users: new UserDAO(this.GetAllModels()),
            vehicles: new VechicleDAO(this.GetAllModels()),
            vehicleTypes: new VechicleTypeDAO(this.GetAllModels()),
            cargoTypes: new CargoTypeDAO(this.GetAllModels()),
            optionals: new OptionalDAO(this.GetAllModels()),
            orders: new OrderDAO(this.GetAllModels())
        }
    }

    private GetAllModels() {
        return this.modelSchema
    }
}
