import * as JSData from 'js-data'
import * as shortid from 'shortid'
import { IModel } from '../interfaces/IModel'
import {APIError} from './APIError'

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
    this.id = obj.id || lib.generateId()
    this.name = obj.name || null
    this.userId = obj.userId || null
    this.updatedUserId = obj.updatedUserId || null
    this.updatedAt = obj.updatedAt || null
  }
}

export class DAO<T extends BaseModel> implements IDAO<T> {
  public collection: JSData.DSResourceDefinition<T>
  public joins: any[]

  constructor(currentModel: JSData.DSResourceDefinition<T>, joins: any = []) {
        if (!currentModel) {
          throw Error('classe não instanciada corretamente')
        }
        this.joins = joins
        this.collection = currentModel
  }

  /**
   * busca todos os usuários
   * 
   * @returns {Bluebird<Array<IUser>>}
   * 
   * @memberOf UserDAO
   */
    public findAll(): JSData.JSDataPromise<Array<T>> {
        return this.collection.findAll()
    }

    /**
     * find user by id
     * 
     * @param {string} id
     * @returns {Bluebird<IUser>}
     * 
     * @memberOf UserDAO
     */
    public find(id: string): JSData.JSDataPromise<T> {
        return this.collection.find(id)
    }

    /**
     * create user
     * 
     * @param {IUser} user
     * @returns {Bluebird<IUser>}
     * 
     * @memberOf UserDAO
     */
    public create(obj: T): JSData.JSDataPromise<T> {
        throw new APIError('Nao implementado', 500)
        // return this.collection.create(obj)
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
    public update(id: string, obj: T): JSData.JSDataPromise<T> {
        return this.collection.update(id,obj)
    }

    /**
     * delete user
     * 
     * @param {string} id
     * @returns {Bluebird<boolean>}
     * 
     * @memberOf UserDAO
     */
    public delete(id: string): JSData.JSDataPromise<boolean> {
        return this.collection.destroy(id)
        .then(() => true)
        .catch(() => false)
        // .then((err) => {
        //   throw err
        // })
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
//   paginatedQuery(search: Object, page?: number, limit?: number, order?: string[]): Bluebird<IResultSearch<T>> {
//         let _page: number = page || 1
//         let _limit: number = limit || 10
//         let _order: string[] = []
//         return this.collection.filter(search).count().execute()
//                    .then((countResult) => {
//                      return this.collection.filter(search)
//                                 .orderBy(_order)
//                                 .limit(_limit)
//                                 .skip(((_page - 1) * _limit))
//                                 .run()
//                                 .then((results) => {
//                                       return {
//                                         page : _page,
//                                         total: countResult,
//                                         result: results
//                                       } as IResultSearch<T>
//                                 })
//                    })
//   }
 }

export interface IDAO<T extends BaseModel> {
    create(t: T): JSData.JSDataPromise<T>
    find(id: string): JSData.JSDataPromise<T>
    findAll(): JSData.JSDataPromise<T[]>
    update(id: string, t: T): JSData.JSDataPromise<T>
    delete(id: string): JSData.JSDataPromise<boolean>
    // paginatedQuery(search: Object, page?: number, limit?: number): Bluebird<IResultSearch<T>>
}

export interface IResultSearch<T extends BaseModel> {
  page: number,
  total: number,
  result: T[]
}
