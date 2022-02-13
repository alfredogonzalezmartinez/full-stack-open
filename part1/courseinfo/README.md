# Ejercicios 1.1.-1.5.

Solución de los [ejercicios 1.1.-1.2.](https://fullstackopen.com/es/part1/introduccion_a_react#ejercicios-1-1-1-2) y los [ejercicios 1.3.-1.5.](https://fullstackopen.com/es/part1/java_script#ejercicios-1-3-1-5) del curso Full Stack open 2021

## Iniciar la app

Usa el comando `npm install` para instalar la dependencias necesarias.

Despues, puedes iniciar la app usando el comando `npm start`, esto ejecutará un servidor en [http://localhost:3000](http://localhost:3000).

## Proceso

Para resolver los ejercicios se han realizado los siguientes pasos:

1. Creación de una React app.

   ```
   npx create-react-app courseinfo
   ```

2. Eliminación del directorio `.git` y el archivo `.gitignore`. Esto se hace porque no se quiere que este proyecto se convierta en un repositorio git.

   ```
   cd ./courseinfo
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
   import React from 'react'
   import ReactDOM from 'react-dom'

   const App = () => {
      const course = 'Half Stack application development'
      const part1 = 'Fundamentals of React'
      const exercises1 = 10
      const part2 = 'Using props to pass data'
      const exercises2 = 7
      const part3 = 'State of a component'
      const exercises3 = 14

      return (
         <div>
            <h1>{course}</h1>
            <p>
            {part1} {exercises1}
            </p>
            <p>
            {part2} {exercises2}
            </p>
            <p>
            {part3} {exercises3}
            </p>
            <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
         </div>
      )
   }

   ReactDOM.render(<App />, document.getElementById('root'))
   ```

5. Refactorización del código para crear los componentes `Header`, `Content`, `Total` y `Part`.

6. Extracción de los componentes en archivos individuales en el directorio `Components`.

7. Sustitución de las definiciones de las variables del componente `App` por una única definición.
   ```
   const course = {
      name: 'Half Stack application development',
      parts: [
         {
         name: 'Fundamentals of React',
         exercises: 10
         },
         {
         name: 'Using props to pass data',
         exercises: 7
         },
         {
         name: 'State of a component',
         exercises: 14
         }
      ]
   }
   ```
8. Modificación del código para que todo funcione correctamente.
