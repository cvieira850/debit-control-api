# Listar débito  pelo Id

> ## Caso de sucesso:
1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/debits/{debit_id}/**
1. ✅ Retorna 200 (quando não tras o que foi adicionado)


> ## Exceções:
1. ✅ Retorna erro 404 se a API não existir
1. ✅ Retorna erro 500 se der erro ao tentar listar a store
