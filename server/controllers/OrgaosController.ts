import * as soap from 'soap'
import * as Bluebird from 'bluebird'
const url = 'http://www.organograma.es.gov.br/orgaoservice.asmx?wsdl'
export class OrgaosController {
    public getOrgaos(): Bluebird<any> {
        return new Bluebird((resolve, reject) => {
            soap.createClient(url, {}, function (err, client: any) {
                if (err) {
                    reject(err)
                }
                client.BuscarOrgaos({}, function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    resolve(result.BuscarOrgaosResult.OrgaoInfo)
                })
            })
        })
    }

    public getOrgaosById(id: string): Bluebird<any> {
        return new Bluebird((resolve, reject) => {
            soap.createClient(url, {}, function (err, client: any) {
                if (err) {
                    reject(err)
                }
                client.BuscarOrgaoPorId({id: id}, function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    resolve(result.BuscarOrgaosResult.OrgaoInfo)
                })
            })
        })
    }
}
