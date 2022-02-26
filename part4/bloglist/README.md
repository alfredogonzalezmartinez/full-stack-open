# Lista de blogs

Solución de los [ejercicios 4.1.-4.2.](https://fullstackopen.com/es/part3/node_js_y_express#ejercicios-3-1-3-6), [ejercicios 4.3.-4.7.](https://fullstackopen.com/es/part4/estructura_de_la_aplicacion_backend_introduccion_a_las_pruebas#ejercicios-4-3-4-7) del curso Full Stack open 2021.

## Aplicación

Para el funcionamiento de la aplicación es necesario contar con una base de datos [MongoDB](https://www.mongodb.com/) e instalar las dependencias.

### Variables de entorno

- **`MONGODB_URI`** URI para conectarse a la base de datos.

- **`PORT`** Puerto en el que se inicia el servidor. Por defecto, 3003.

### Dependencias

Use el comando `npm install` instalar las dependencias.

Para instalar también las dependencias de desarrollo utilice el comando `npm install --production=false`.

### Scripts

- **`npm start`** Inicia la aplicación.

- **`npm run dev`** Inicia la aplicación en modo desarrollo.

- **`npm run lint`** Ejecuta el linter.

- **`npm run test`** Ejecuta los tests.

- **`npm run test:watch`** Ejecuta los tests continuamente.

### Endpoints

```
GET    /api/blogs
POST   /api/blogs
```

- **`GET /api/blogs`** Devuelve todos los blogs en formato JSON.

- **`POST /api/blogs`** Añade un nuevo blog y lo devuelve en formato JSON. Las propiedades `title` y `url` son requeridas.

## Proceso

Para resolver los ejercicios se han realizado los siguientes pasos:

1. Inicialización del proyecto.

   ```
   mkdir blogslist
   cd blogslist
   npm init -y
   npm install -E express cors mongoose mongoose-unique-validator dotenv
   npm install -E -D nodemon
   npx install-peerdeps --dev eslint-config-airbnb-base
   mkdir src
   ```

2. Adición de scripts en `package.json`

   ```
   "start": "node src/index.js",
   "dev": "nodemon src/index.js",
   "lint": "eslint ."
   ```

3. Adición de la configuración del linter en `package.json`

   ```
   "eslintConfig": {
    "extends": "airbnb-base",
    "rules": { "no-underscore-dangle": [ "error", { "allow": ["_id", "__v"] } ] }
   }
   ```

4. Creación de un archivo `.env` con la variable de entorno `MONGODB_URI`.

   ```
   echo "MONGODB_URI=your.mongodb.uri" > .env
   ```

5. Creación de un archivo `index.js` en el directorio `src` con el código ofrecido en el ejercicio.

   ```
   const http = require('http');
   const express = require('express')
   const app = express()
   const cors = require('cors')
   const mongoose = require('mongoose')

   const blogSchema = new mongoose.Schema({
     title: String,
     author: String,
     url: String,
     likes: Number
   })

   const Blog = mongoose.model('Blog', blogSchema)

   const mongoUrl = 'mongodb://localhost/bloglist'
   mongoose.connect(mongoUrl)

   app.use(cors())
   app.use(express.json())

   app.get('/api/blogs', (request, response) => {
     Blog
       .find({})
       .then(blogs => {
         response.json(blogs)
       })
   })

   app.post('/api/blogs', (request, response) => {
     const blog = new Blog(request.body)

     blog
       .save()
       .then(result => {
         response.status(201).json(result)
       })
   })

   const PORT = 3003
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`)
   })
   ```

6. Modificación del código para que funcione correctamente.

7. Refactorización del código para extraer las diferentes funcionalidades en módulos separados.

8. Instalación de [Jest](https://jestjs.io/).

   ```
   npm install -D -E jest
   ```

9. Adición de la configuración de Jest en el `packaje.json`.

   ```
   "jest": {
     "testEnvironment": "node"
   }
   ```

10. Adición del entorno de Jest en la configuración del linter en el `packaje.json`.

    ```
    "env": {
      "jest": true
    }
    ```

11. Adición de scripts para lanzar los tests en `package.json`

    ```
    "test": "jest --verbose",
    "test:watch": "jest --verbose --watch"
    ```
