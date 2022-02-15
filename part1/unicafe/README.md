# Ejercicios 1.6.-1.11.

Solución de los [ejercicios 1.6.-1.11.](https://fullstackopen.com/es/part1/un_estado_mas_complejo_depurando_aplicaciones_react#ejercicios-1-6-1-14) del curso Full Stack open 2021

## Iniciar la app

Usa el comando `npm install` para instalar la dependencias necesarias.

Despues, puedes iniciar la app usando el comando `npm start`, esto ejecutará un servidor en [http://localhost:3000](http://localhost:3000).

## Proceso

Para resolver los ejercicios se han realizado los siguientes pasos:

1. Creación de una React app.

   ```
   npx create-react-app unicafe
   ```

2. Eliminación del directorio `.git` y el archivo `.gitignore`. Esto se hace porque no se quiere que este proyecto se convierta en un repositorio git.

   ```
   cd ./unicafe
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

   const App = () => {
      // save clicks of each button to its own state
      const [good, setGood] = useState(0)
      const [neutral, setNeutral] = useState(0)
      const [bad, setBad] = useState(0)

      return (
         <div>
            code here
         </div>
      )
   }

   ReactDOM.render(<App />, document.getElementById('root')
   )
   ```

5. Implementación del código necesario para los botones de opinión y las estadísticas.

6. Refactorización del código para crear los componentes `Button`, `Statistic` y `Statistics`.

7. Extracción de los componentes en archivos individuales en el directorio `Components`.

8. Modificación de los componentes `Statistic` y `Statistics` para mostrar las estadísticas en una tabla.
