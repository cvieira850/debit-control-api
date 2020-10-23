# Debit Control API
[![Author](https://img.shields.io/badge/author-CaioVieira-brightgreen)](https://github.com/cvieira850)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

> ## Objetivo
O objetivo desse projeto é o relacionamento de dívidas com nossos
clientes (usuários do JSONPlaceholder). Cada usuário é uma pessoa com dívidas.

> ## APIs implementadas no sistema: 
1. [Adiciona Débito](./src/requirements/add-debit.md)
2. [Deleta Débito](./src/requirements/delete-debit.md)
3. [Carrega um Débito pelo id](./src/requirements/load-debit-by-id.md)
4. [Carrega todos os Débitos](./src/requirements/load-debits.md)

# 🚧 Instalação
**Para rodar o projeto é necessário ter [Node.js](https://nodejs.org/en/download/) , [Yarn](https://yarnpkg.com/), [Docker](https://docs.docker.com/docker-for-windows/install/) e clonar o projeto**

**Instalação das dependências**

```yarn install```

# Para rodar o projeto

Primeiro rode o comando do docker

``` docker-compose up -b```

Verifique se você tem criado os bancos de dados, caso não tenha crie  debitcontrol e debitcontrol_tests

# Linux
Caso esteja usando linux, após rodar o comando docker-compose up -b utilize esse comando

``` sudo chmod -R 777 .data/postgresql  ```

Depois rode  o comando

``` yarn typeorm migration:run ```

Por último execute o comando

``` yarn dev:server ```

## Para executar testes
* Testes unitários
  
``` yarn test:unit ```

* Testes de integração
    
``` yarn test:integration ```

* Gerar coverage

``` yarn test:ci ```

## Bibliotecas e Ferramentas

* Yarn
* Typescript
* Git
* Docker
* Jest
* Express
* Supertest
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style
* Ts-node
* Pg
* Typeorm

### Para mais informações veja a pasta ./docs