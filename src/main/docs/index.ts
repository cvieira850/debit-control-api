import { DebitPath } from './paths'
import { badRequest, serverError, notFound } from './components'
import { DebitParamsSchema, debitSchema, errorSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Amantes dos Pets',
    descriptiom: 'Marketplace de produtos para pets',
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
    '/debits': DebitPath
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