import { OrgaosRouter } from './OrgaosRouter'
import {Request,Response, Application} from 'express'
import {path} from '../config/appConfig'

export namespace main {
    export const callRoutes = (app: Application): Application => {
        app.use(`/${path}`, new OrgaosRouter().getRouter())
        app.use('/ping', (req: Request,res: Response) => res.json('pong'))
        return app
    }
}
