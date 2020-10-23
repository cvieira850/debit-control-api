export const DeleteDebitPath = {
  delete: {
    tags: ['Debit'],
    summary: 'Api para deletar um débito',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do débito que deseja deletar',
      required: true,
      schema: {
        type: 'integer'
      }
    }],
    responses: {
      204: {
        description: 'Sucesso',
        content: {
          'application/json': {

          }
        }
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
