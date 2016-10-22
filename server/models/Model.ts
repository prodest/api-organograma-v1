import * as shortid from 'shortid'
import { IModel } from '../interfaces/IModel'
import { IModelsSchema } from '../models/Schemas'
import * as thinky from 'thinky'
import * as Bluebird from 'bluebird'
/**
 * Model
 */
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

export let lib = {
    generateId : shortid.generate
}

export class BaseModel implements IModel {
  id: string
  name: string
  insertedAt: Date
  userId: string
  updatedUserId: string
  updatedAt: Date
  constructor(obj: IModel) {
    this.name = obj.name || null
    this.userId = obj.userId || null
    this.updatedUserId = obj.updatedUserId || null
    this.updatedAt = obj.updatedAt || null
  }
}

export const baseModel = (T: thinky.Thinky) => {
  return {
    id: T.type.string().default(() => shortid.generate()),
    name: T.type.string().required(),
    userId: T.type.string(),
    insertedAt: T.type.date().default(new Date(Date.now())),
    updatedUserId: T.type.string(),
    updatedAt: T.type.date().default(new Date(Date.now()))
  }
}

export class DAO<T extends BaseModel> implements IDAO<T> {
  collection: thinky.Model<any,any,any>
  db: IModelsSchema
  joins: any

  constructor(models: IModelsSchema, currentModel: thinky.Model<any,any,any>, joins: any = {}) {
        if (!currentModel) {
          throw Error('classe não instanciada corretamente')
        }
        this.joins = joins
        this.collection = currentModel
        this.db = models
  }

  public isValidKey(model: thinky.Model<any,any,any> , obj: IModel): Bluebird<boolean> {
    if (!obj) {
      return Bluebird.resolve(false)
    }
    return model.get(obj.id).run().then((reg) => {
      return !!reg
    })
  }

  /**
   * busca todos os usuários
   * 
   * @returns {Bluebird<Array<IUser>>}
   * 
   * @memberOf UserDAO
   */
    public findAll(): Bluebird<Array<thinky.Document<any,any,any>>> {
        return this.collection.getJoin(this.joins).run()
    }

    /**
     * find user by id
     * 
     * @param {string} id
     * @returns {Bluebird<IUser>}
     * 
     * @memberOf UserDAO
     */
    public find(id: string): Bluebird<thinky.Document<any,any,any>> {
        return this.collection.get(id).getJoin(this.joins).run()
    }

    /**
     * create user
     * 
     * @param {IUser} user
     * @returns {Bluebird<IUser>}
     * 
     * @memberOf UserDAO
     */
    public create(obj: T): Bluebird<T> {
        throw Error('nao implementado')
    }

    /**
     * 
     * altera usuário 
     * @param {string} id
     * @param {IUser} user
     * @returns {Bluebird<IUser>}
     * 
     * @memberOf UserDAO
     */
    public update(id: string, obj: T): Bluebird<T> {
        return this.collection.get(obj.id).run()
        .then((curObj) => curObj.merge(obj).saveAll(this.joins) )
    }

    /**
     * delete user
     * 
     * @param {string} id
     * @returns {Bluebird<boolean>}
     * 
     * @memberOf UserDAO
     */
    public delete(id: string): Bluebird<boolean> {
        return this.find(id)
        .then((c: any) => c.delete())
        .then((err) => {
          throw err
        })
    }

  /**
   * 
   * realize search query using limits and page control
   * @param {Object} search
   * @param {number} [page]
   * @param {number} [limit]
   * @returns {Bluebird<IResultSearch<IUser>>}
   * 
   * @memberOf UserDAO
   */
  paginatedQuery(search: Object, page?: number, limit?: number, order?: string[]): Bluebird<IResultSearch<T>> {
        let _page: number = page || 1
        let _limit: number = limit || 10
        let _order: string[] = []
        return this.collection.filter(search).count().execute()
                   .then((countResult) => {
                     return this.collection.filter(search)
                                .orderBy(_order)
                                .limit(_limit)
                                .skip(((_page - 1) * _limit))
                                .run()
                                .then((results) => {
                                      return {
                                        page : _page,
                                        total: countResult,
                                        result: results
                                      } as IResultSearch<T>
                                })
                   })
  }
}

export interface IDAO<T extends BaseModel> {
    create(t: T): Bluebird<T>
    find(id: string): Bluebird<thinky.Document<any,any,any>>
    findAll(): Bluebird<Array<thinky.Document<any,any,any>>>
    update(id: string, t: T): Bluebird<T>
    delete(id: string): Bluebird<boolean>
    paginatedQuery(search: Object, page?: number, limit?: number): Bluebird<IResultSearch<T>>
}

export interface IResultSearch<T extends BaseModel> {
  page: number,
  total: number,
  result: T[]
}
