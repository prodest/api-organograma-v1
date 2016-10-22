// Inicializar a função com os dados de acesso e o ambiente a ser usado
const bp = require('braspag')
import {brasPagConf} from '../config/braspag'
import {IUser} from '../interfaces/IUser'
import {IOrder} from '../interfaces/IOrder'

export class Checkout {
    braspag: any
    statusCode: number
    objectResponse: Object
    constructor () {
        this.braspag = new bp(brasPagConf)
    }

    create (customer: IUser, order: IOrder) {
        let fCallBack = (err, res) => {
            return console.log(res)
        }
        this.braspag.create({
            'MerchantOrderId': '2014111703',
            'Customer': {
                'Name': 'Comprador Teste'
            },
            'Payment': {
                'Type': 'CreditCard',
                'Amount': 15700,
                'Provider': 'Simulado',
                'Installments': 1,
                'CreditCard': {
                'CardNumber': '1234123412341231',
                'Holder': 'Teste Holder',
                'ExpirationDate': '12/2021',
                'SecurityCode': '123',
                'Brand': 'Visa'
                }
            }
                         }, fCallBack)
    }
}
