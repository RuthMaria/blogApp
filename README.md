# Blog 

Um simples blog de postagens, onde cada postagem possui uma categoria.

O login do site é criptografado, tanto para usuários como para administradores. Então, dependendo do usuário que logar, determinadas funcionalidades não serão permitidas. A seguir, segue as funcionalidades permitidas para cada perfil.

Perfil usuário
- Criar uma conta
- Fazer login 
- Fazer log out
- Acessar todas as postagens 
- Acessar a lista de categorias
- Acessar as postagens de cada categoria.

Perfil administrador
- Todas as funcionalidade do perfil usuário
- Acesso ao CRUD (Create, read, update and delete) de postagens
- Acesso ao CRUD de categorias

Este projeto faz parte dos meus estudos de nodeJS, baseado no curso do [Youtube](https://www.youtube.com/playlist?list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B).


## Requisitos
- MongoDB
- NodeJS na sua versão LTS
- Visual Studio Code


## Executar o projeto

- Clonar este repositório

```
git clone https://github.com/RuthMaria/blogApp.git
```

- Instalar todas as dependências indicadas no package.json

```
npm install 
```

-  Descomentar esta [linha](https://github.com/RuthMaria/blogApp/blob/master/routes/user.js#L42) 


- Inicializar o mongoDB no CMD

```
mongod
```

- Rodar o projeto

```
nodemon app.js
```

- Digitar a URL no navegador

```
https://localhost:8080
```

- Criar uma conta administrador e logar no blog 