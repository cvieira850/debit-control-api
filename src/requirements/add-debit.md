# Cadastro da store

> ## Caso de sucesso:
1. ⛔ Recebe uma requisição do tipo **POST** na rota **/api/store **
2. ⛔ Valida dados obrigatórios **clientId**,**reason**, **date**, **value**
3. ⛔ Valida que o campo **date** é um e-mail válido
4. ✅ Retorna 200 com o debito criado

> ## Exceções:
1. ✅ Retorna erro 404 se a API não existir
1. ⛔ Retorna erro 400 se **clientId**,**reason**, **date**, **value** não forem fornecidos pelo usuário
1. ⛔ Retorna erro 400 se o campo **date** for um date inválido
1. ✅ Retorna erro 500 se der erro ao tentar criar o débito
1. ✅ Retorna erro 500 se der erro ao tentar verificar se o client existe