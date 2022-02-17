# Ejercicios 2.6.-2.10.

Solución de los [ejercicios 2.6.-2.10.](https://fullstackopen.com/es/part2/formularios#ejercicios-2-6-2-10) del curso Full Stack open 2021

## Iniciar la app

Usa el comando `npm install` para instalar la dependencias necesarias.

Despues, puedes iniciar la app usando el comando `npm start`, esto ejecutará un servidor en [http://localhost:3000](http://localhost:3000).

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

8. Sustitución del valor iniciar del estado `persons` por el valor dado en el ejercicio.

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
