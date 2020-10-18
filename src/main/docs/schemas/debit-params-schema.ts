export const DebitParamsSchema = {
  type: 'object',
  properties: {
    clientId: {
      type: 'string'
    },
    reason: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    value: {
      type: 'string'
    }
  },
  required: ['clientId','reason','date','value']
}
