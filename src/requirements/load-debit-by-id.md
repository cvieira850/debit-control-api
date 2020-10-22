# Listar débito  pelo Id

> ## Caso de sucesso:
1. :no_entry: Recebe uma requisição do tipo **GET** na rota **/api/debits/{debit_id}/**
2. :no_entry: Retorna 200 


> ## Exceções:
1. :no_entry: Retorna erro 404 se a API não existir
2. :no_entry: Retorna erro 500 se der erro ao tentar listar a store
