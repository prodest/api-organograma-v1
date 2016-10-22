import * as JSData from 'js-data'
import { APIError, IResultSearch, IDAO, BaseModel } from '../models'
import { Request, Response } from 'express'

export interface IPersistController<T extends BaseModel> {
    collection: IDAO<T>
    find(req: Request, res: Response, next?: Function): JSData.JSDataPromise<T>
    findAll(req: Request, res: Response, next?: Function): JSData.JSDataPromise<T[]>
    create(req: Request, res: Response, next?: Function): JSData.JSDataPromise<T>
    update(req: Request, res: Response, next?: Function): JSData.JSDataPromise<T>
    delete(req: Request, res: Response, next?: Function): JSData.JSDataPromise<boolean>
}

export class BasePersistController<T extends BaseModel> implements IPersistController<T> {
    collection: IDAO<T>
    public constructor(collection: IDAO<T>) {
        this.collection = collection
    }
    public find(req: Request, res: Response, next?: Function): JSData.JSDataPromise<T> {
        return this.collection.find(req.params.id)
            .then(regs => {
                res.status(200)
                return regs
            })
            .catch(error => {
                throw new APIError(error,400)
            })
    }

    public findAll(req: Request, res: Response, next?: Function): JSData.JSDataPromise<T[]> {
        return this.collection.findAll()
            .then(regs => {
                res.status(200)
                return regs
            })
            .catch(error => {
                throw new APIError(error,400)
            })
    }

    public create(req: Request, res: Response, next?: Function): JSData.JSDataPromise<T> {
        return this.collection.create(req.body)
            .then(reg => {
                res.status(201)
                return reg
            })
            .catch(error => {
                throw new APIError(error,400)
            })
    }

    public update(req: Request, res: Response, next?: Function): JSData.JSDataPromise<T> {
        return this.collection.update(req.params.id, req.body)
            .then(reg => {
                res.status(201)
                return reg
            })
            .catch(error => {
                throw new APIError(error,400)
            })
    }

    public delete(req: Request, res: Response, next?: Function): JSData.JSDataPromise<boolean> {
        return this.collection.delete(req.params.id)
            .then((isDeleted) => {
                res.status(200)
                return isDeleted
            })
            .catch(error => {
                throw new APIError(error,400)
            })
    }

    // public query(req: Request, res: Response, next?: Function): Bluebird<IResultSearch<T>> {
    //     return this.collection.paginatedQuery(req.body, req.params.page,req.params.limit)
    //         .then((result) => {
    //             res.status(200)
    //             return result
    //         })
    //         .catch(error => {
    //             throw new APIError(error,400)
    //         })
    // }

}
