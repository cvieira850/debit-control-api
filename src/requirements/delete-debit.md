# Deleta um débito

> ## Caso de sucesso:
1. ✅ Recebe uma requisição do tipo **delete** na rota **/api/debits/{debit_id}/**
2. ✅ Retorna 204 


> ## Exceções:
1. ✅ Retorna erro 404 se a API não existir
2. ✅ Retorna erro 500 se der erro ao tentar deletar o débito
