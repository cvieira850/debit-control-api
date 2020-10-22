import { DebitPath, LoadDebitByIdPath } from './paths'
import { badRequest, serverError, notFound } from './components'
import { DebitParamsSchema, debitSchema, errorSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Debit Controller',
    descriptiom: 'API para fazer operações nos débitos dos clientes',
    version: '1.0.0'
  },
  license: {
    name: '',
    url: ''
  },
  contact: {
    name: 'API Suport',
    email: 'contato@caiovieira.com.br',
    url: 'https://www.caiovieira.com.br'
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    {
      name: 'Debit'
    }
  ],
  paths: {
    '/debits': DebitPath,
    '/debits/{id}': LoadDebitByIdPath
  },
  schemas: {
    error: errorSchema,
    debit: debitSchema,
    debitParams: DebitParamsSchema
  },
  components: {
    badRequest,
    serverError,
    notFound
  }
}
