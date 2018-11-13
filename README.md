# Exemplo de Documentação usando `Swagger`

## O que é a Aplicação ?

É um CRUD simples de animais, contendo apenas __id__ e __name__

## Para Rodar

```bash
$ npm i && node src/index.js
```


Abrir a documentação usando [ReDoc](https://github.com/Rebilly/ReDoc)
Aqui [http://localhost:3000/docs](http://localhost:3000/docs)

Abrir a documentação usando [Swagger UI](https://swagger.io/tools/swagger-ui/)
Aqui [http://localhost:3000/docs](http://localhost:3000/docs2)

## Como funciona ?

1) Em cada rota, colocamos um comentário escrito em [Open Api Specification](https://www.openapis.org/)
As rotas estão dentro de [src/routes.js]

2) Pronto!
