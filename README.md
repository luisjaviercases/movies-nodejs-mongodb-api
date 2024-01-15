# NodeJS and MongoDB application authentication by JWT

REST API with JWT auth that serves as the backend of the NextJS application that we can see in the following link:

https://github.com/luisjaviercases/movies-nextjs-ts

In this document you will be able to see the structure of the folders and some of the libraries that have been used to develop the project.

## Default data

A seed file has been created to feed the database with default content so that the user does not have to do absolutely anything to run the project and interact with it.

Default user:

User: test@test.com
Password: test

## How to run?

### Docker

The application has been Dockerized, allowing it to run consistently in any environment. That way, just by executing two commands we will have the application fully functional, with the database seeded by default.

### Manually

If what you want is to run the project manually, you will need to install MongoDB on your computer and follow next steps:

#### Install dependencies

```shell
npm install
```

#### Seed Database

```shell
node seedDB.js
```

#### Start Server

```shell
node api/server.js
```

## Folder structure

```
<project-root>
├─ 📁 node_modules
├─ 📂 api
│   ├─ 📂 controllers
│   │  └─ genreController.js
│   │  └─ movieController.js
│   │  └─ userController.js
│   ├─ 📂 models
│   │  └─ genreModel.js
│   │  └─ genreModel.js
│   │  └─ genreModel.js
│   ├─ 📂 routes
│   │  └─ apiRoutes.js
│   ├─ server.js
├─ seedDB.js
├─ .babelrc
├─ .dockerignore
├─ .env
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc
├─ docker-compose.yml
├─ Dockerfile
├─ package.json
└─ <more project root files>
```

## Architecture

### Express

Express version 4.18.2

### Mongoose

Mongoose version 8.0.4

### Babel

Babel Node version 7.22.19
