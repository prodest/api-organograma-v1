export class APIError extends Error {
    statusCode: number
    objectResponse: Object
    constructor (message: string , statusCode: number, objectResponse?: Object) {
        super(message)
        this.statusCode = statusCode
        this.objectResponse = objectResponse
        this.showError()
    }

    private showError () {
      let err = this
      console.error(`API ERROR CODE: ${err.statusCode}`)
      console.error(`API ERROR MESSAGE: ${err.message}`)
      console.error(`API ERROR STACK: ${err.stack}`)
    }
}
