import { UserRouter } from './UserRouter'
import {Request,Response, Application, Router} from 'express'

export namespace main {
    export const callRoutes = (app: Application): Application => {
        app.use('/users', new UserRouter().getRouter())
        app.use('/ping', (req: Request,res: Response) => res.json('pong'))
        return app
    }
}
