export const LoadDebitByIdPath = {
  get: {
    tags: ['Debit'],
    summary: 'Api para retornar um debito baseado no id passado',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do débito que deseja o retorno',
      required: true,
      schema: {
        type: 'integer'
      }
    }],
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
