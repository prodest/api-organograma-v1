import * as JSData from 'js-data'
import { DAO, BaseModel } from './Model'
/**
 * Model para os usuários
 * 
 * @class User
 * @implements {Model.DAO<Model.User>}
 */

export class User extends BaseModel {
    constructor(obj: any) {
        super(obj)
        this.name = obj.name || null
    }
}

export class UserDAO extends DAO<User> {
    constructor(store: JSData.DS) {
        const users = store.defineResource<User>('users')
        super(users,[])
    }
}
