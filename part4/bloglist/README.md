# Lista de blogs

Solución de los [ejercicios 4.1.-4.2.](https://fullstackopen.com/es/part3/node_js_y_express#ejercicios-3-1-3-6), [ejercicios 4.3.-4.7.](https://fullstackopen.com/es/part4/estructura_de_la_aplicacion_backend_introduccion_a_las_pruebas#ejercicios-4-3-4-7), [ejercicios 4.8.-4.12.](https://fullstackopen.com/es/part4/porbando_el_backend#ejercicios-4-8-4-12) y [ejercicios 4.13.-4.14.](https://fullstackopen.com/es/part4/porbando_el_backend#ejercicios-4-13-4-14) del curso Full Stack open 2021.

## Aplicación

Para el funcionamiento de la aplicación es necesario contar con una base de datos [MongoDB](https://www.mongodb.com/) e instalar las dependencias.

### Variables de entorno

- **`MONGODB_URI`** URI para conectarse a la base de datos.

- **`TEST_MONGODB_URI`** URI para conectarse a la base de datos para testing.

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
GET     /api/blogs
POST    /api/blogs
DELETE  /api/blogs/:id
PUT     /api/blogs/:id
```

- **`GET /api/blogs`** Devuelve todos los blogs en formato JSON.

- **`POST /api/blogs`** Añade un nuevo blog y lo devuelve en formato JSON. Las propiedades `title` y `url` son requeridas.

- **`DELETE /api/blogs/:id`** Elimina el blog con la id especificada.

- **`PUT /api/persons/:id`** Actualiza el blog con la id especificada y lo devuelve en formato JSON.

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
    "test:watch": "npm run test -- --watch"
    ```

12. Instalación de [cross-env](https://github.com/kentcdodds/cross-env).

    ```
    npm install -D -E cross-env
    ```

13. Modificación del los scripts del `package.json` para que se defina el valor de la variable de entorno `NODE_ENV` según el script ejecutado.

    ```
    "scripts": {
      "start": "cross-env NODE_ENV=production node src/index.js",
      "dev": "cross-env NODE_ENV=development nodemon src/index.js",
      "lint": "eslint .",
      "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
      "test:watch": "npm run test -- --watch"
    }"
    ```

14. Modificación de la configuración (`config/index.js`) para que cuando realizemos los tests usemos otra base de datos.

15. Instalación de [supertest](https://github.com/visionmedia/supertest).

    ```
    npm install -D -E supertest
    ```

16. Implementación de tests para probar que al hacer una petición `GET` al endpoint `/api/blogs` responda con un JSON y la cantidad de blogs sea correcta.

17. Refactorizacion del código de la ruta para usar `async`/`await` en lugar de promesas.

18. Implementación de un test para probar que el identificador de los blogs este en la propiedad `id`.

19. Implementación de tests para probar que al hacer una petición `POST` al endpoint `/api/blogs` se incrementa la cantidad de blogs, el contenido guardado es correcto, si no se pasa la propiedad likes, likes es 0 y si no se pasa una propiedad requerida la respuesta es `400 Bad Request`.

20. Refactorizacion del código de la ruta para usar `async`/`await` en lugar de promesas y cumplir con los tests.

21. Instalación de [express-async-errors](https://github.com/davidbanham/express-async-errors).

    ```
    npm install -E express-async-errors
    ```

22. Adición de `require('express-async-errors')` en `src/app.js` para que se encargue de manejar los errores.

23. Implementación de la funcionalidad para eliminar un blog cuando se haga una petición `DELETE` al endpoint `/api/persons/:id`.

24. Implementación de tests para probar que al hacer una petición `DELETE` al endpoint `/api/blogs/:id` se reduce la cantidad de blogs, se elimina el blog correcto y si se indica una id con formato incorrecto la respuesta es `400 Bad Request`.

25. Implementación de la funcionalidad para actualizar un blog cuando se haga una petición `PUT` al endpoint `/api/persons/:id`.

26. Implementación de tests para probar que al hacer una petición `PUT` al endpoint `/api/blogs/:id` no se modifica la cantidad de blogs, se modifica el el blog correctamente, si solo se pasa una propiedad, solo se modifica esta y devuelve el blog modificado.
