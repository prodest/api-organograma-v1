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
}

/**
 * interface do modelo pelo schema declarado
 * 
 * @interface IModelsSchema
 */

export interface IModelsSchema {
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
        this.modelSchema = {
        }
    }

    private generateModels() {
        this.models = {
        }
    }

    private GetAllModels() {
        return this.modelSchema
    }
}
