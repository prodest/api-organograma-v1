
import * as dotenv from 'dotenv'
/**
 * busca as variaveis de ambiente no arquivo .env
 */
dotenv.config()

import { Request, Response } from 'express'
import * as express from 'express'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
/**
 * importacao das rotas
 */
import * as routes from './routes'

class Application {
  app: express.Application

  constructor() {

    /**
     * definicao dos objetos do banco de dados
     */
    this.app = express()
    this.app = this.handleParsers(this.app)
    this.app = this.handleLogs(this.app)
    // this.app = this.handleStatics(this.app)
    this.app = this.handleRoutes(this.app)
    this.app = this.handleError(this.app)
  }

  handleParsers(app: express.Application): express.Application {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
    return app
  }

  handleLogs(app: express.Application): express.Application {
    app.use(logger('dev'))
    return app
  }

  handleStatics(app: express.Application): express.Application {
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    // app.use(express.static(path.join(__dirname, '../clients/web')))
    return app
  }

  handleRoutes(app: express.Application): express.Application {
    /**
     * chamada no index para chamar todas as rotas
     */
    app = routes.main.callRoutes(app)
    // catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: Function) => {
      let err: any = new Error('Not Found')
      err.status = 404
      next(err)
    })
    return app
  }

  handleError(app: express.Application): express.Application {
      // error handlers

      // development error handler
      // will print stacktrace
      if (app.get('env') === 'development') {
        app.use(function(err: any, req: Request, res: Response, next: Function) {
          res.status(err.status || 500)
          res.json({
            message: err.message,
            error: err
          })
        })
      }

      // production error handler
      // no stacktraces leaked to user
      app.use(function(err: any, req: Request, res: Response, next: Function) {
        res.status(err.status || 500)
        res.json({
          message: err.message,
          error: {}
        })
      })
      return app
  }
}

/**
 * para enviar a aplicacao a nivel do server será sempre levado o objeto app criado ao instanciar a aplicacao
 */
export let application = (new Application()).app
