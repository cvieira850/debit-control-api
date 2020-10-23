export const LoadDebitsPath = {
  get: {
    tags: ['Debit'],
    summary: 'Api para retornar um array de débitos',
    descripty: 'retorna todos os débitos cadastrados',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/debits'
            }
          }
        }
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
