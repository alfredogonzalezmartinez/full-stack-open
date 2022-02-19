# Anecdotes

Solución de los [ejercicios 1.12.-1.14.](https://fullstackopen.com/es/part1/un_estado_mas_complejo_depurando_aplicaciones_react#ejercicios-1-6-1-14) del curso Full Stack open 2021

## Iniciar la app

Usa el comando `npm install` para instalar la dependencias necesarias.

Despues, puedes iniciar la app usando el comando `npm start`, esto ejecutará un servidor en [http://localhost:3000](http://localhost:3000).

## Proceso

Para resolver los ejercicios se han realizado los siguientes pasos:

1. Creación de una React app.

   ```
   npx create-react-app anecdotes
   ```

2. Eliminación del directorio `.git` y el archivo `.gitignore`. Esto se hace porque no se quiere que este proyecto se convierta en un repositorio git.

   ```
   cd ./anecdotes
   rm -rf ./.git
   rm ./.gitignore
   ```

3. Eliminación de los archivos innecesarios en el directorio `src`.

   ```
   cd ./src
   rm ./App.js ./App.css ./App.test.js ./logo.svg ./setupTests.js ./reportWebVitals.js
   ```

4. Sustitución del contenido del archivo `index.js` por el código ofrecido en el ejercicio.

   ```
   import React, { useState } from 'react'
   import ReactDOM from 'react-dom'

   const App = (props) => {
      const [selected, setSelected] = useState(0)

      return (
         <div>
            {props.anecdotes[selected]}
         </div>
      )
   }

   const anecdotes = [
      'If it hurts, do it more often',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
   ]

   ReactDOM.render(
      <App anecdotes={anecdotes} />,
      document.getElementById('root')
   )
   ```

5. Implementación del código necesario para que pulsando un botón se muestre otra anécdota de forma aleatoria.

6. Implementación del código necesario para poder votar por cada anécdota y ver su cantidad de votos.

7. Implementación del código necesario para mostrar la anécdota más votada.

8. Refactorización del código para crear el componente `Anecdote`.
