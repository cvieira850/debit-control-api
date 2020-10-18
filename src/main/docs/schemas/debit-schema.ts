export const debitSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
    },
    created_at: {
      type: 'string'
    },
    updated_at: {
      type: 'string'
    },
    deleted_at: {
      type: 'string'
    }
  }
}
