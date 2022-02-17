# La guía telefónica

Solución de los [ejercicios 2.6.-2.10.](https://fullstackopen.com/es/part2/formularios#ejercicios-2-6-2-10) y [ejercicio 2.11.](https://fullstackopen.com/es/part2/obteniendo_datos_del_servidor#ejercicios-2-11-2-14) del curso Full Stack open 2021

## Iniciar la app

Usa el comando `npm install --production=false` para instalar las dependencias necesarias, incluidas las de desarrollo.

Después, puedes iniciar json-server con el comando `npm run server` y la app usando el comando `npm start`.

La app será ejecutada en [http://localhost:3000] y json-server servirá la información en [http://localhost:3001/persons].

## Proceso

Para resolver los ejercicios se han realizado los siguientes pasos:

1. Creación de una React app.

   ```
   npx create-react-app phonebook
   ```

2. Eliminación del directorio `.git` y el archivo `.gitignore`. Esto se hace porque no se quiere que este proyecto se convierta en un repositorio git.

   ```
   cd ./phonebook
   rm -rf ./.git
   rm ./.gitignore
   ```

3. Eliminación de los archivos innecesarios en el directorio `src`.

   ```
   cd ./src
   rm ./App.css ./App.test.js ./logo.svg ./setupTests.js ./reportWebVitals.js
   ```

4. Sustitución del contenido del archivo `App.js` por el código ofrecido en el ejercicio.

   ```
   import React, { useState } from 'react'

   const App = () => {
      const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }])
      const [ newName, setNewName ] = useState('')

      return (
         <div>
            <h2>Phonebook</h2>
            <form>
            <div>
               name: <input />
            </div>
            <div>
               <button type="submit">add</button>
            </div>
            </form>
            <h2>Numbers</h2>
            ...
         </div>
      )
   }

   export default App
   ```

5. Implementación del código necesario para mostrar los nombres en la agenda telefónica.

6. Implementación de la funcionalidad para poder agregar nombres a la agenda telefónica.

7. Implementación del código necesario para evitar que se registre el mismo nombre múltiples veces en la agenda telefónica.

8. Sustitución del valor inicial del estado `persons` por el valor dado en el ejercicio.

   ```
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
   ])
   ```

9. Ampliación de la funcionalidad para registrar números de teléfono y mostrarlos.

10. Ampliación de la funcionalidad para filtrar los registros de la agenda telefónica que son mostrados.

11. Refactorización del código para crear los componentes `Filter`, `Input`, `PersonForm` y `Persons`.

12. Instalación de los paquetes `axios` y `json-server`.

    ```
    npm install axios
    npm install json-server --save-dev
    ```

13. Creación del fichero `db.js` en el directorio `data` con el contenido proporcionado en el ejercicio.

    ```
    {
       "persons":[
          {
             "name": "Arto Hellas",
             "number": "040-123456",
             "id": 1
          },
          {
             "name": "Ada Lovelace",
             "number": "39-44-5323523",
             "id": 2
          },
          {
             "name": "Dan Abramov",
             "number": "12-43-234345",
             "id": 3
          },
          {
             "name": "Mary Poppendieck",
             "number": "39-23-6423122",
             "id": 4
          }
       ]
    }
    ```

14. Adición de un nuevo script en el archivo `package.json` para iniciar json-server.

    ```
    "server": "json-server -p3001 --watch ./data/db.json"
    ```

15. Desarrollo la función `getAllPersons` para obtener la información ofrecida por json-server.

16. Modificación del componente `App` para establecer el estado de `persons` con la información ofrecida por json-server.
