export const DebitPath = {
  post: {
    tags: ['Debit'],
    summary: 'Api para criar um débito',
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/debitParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/debit'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
