# Exemplo de Documentação usando `Swagger`

## O que é a Aplicação ?

É um CRUD simples de animais, contendo apenas __id__ e __name__

## Para Rodar

```bash
$ git clone https://github.com/expalmer/node-swagger-example
$ cd node-swagger-example
$ npm i && node src/index.js
```

Abrir a documentação usando [ReDoc](https://github.com/Rebilly/ReDoc)
Aqui [http://localhost:3000/docs](http://localhost:3000/docs)

Abrir a documentação usando [Swagger UI](https://swagger.io/tools/swagger-ui/)
Aqui [http://localhost:3000/docs2](http://localhost:3000/docs2)

## Como funciona ?

Em cada rota, colocamos um comentário escrito em [Open Api Specification](https://www.openapis.org/)

As rotas estão dentro de [src/routes.js](src/routes.js)

Pronto!
