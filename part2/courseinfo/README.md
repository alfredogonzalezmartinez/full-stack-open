# Ejercicios 2.1.-2.5.

Solución de los [ejercicios 2.1.-2.5.](https://fullstackopen.com/es/part2/renderizando_una_coleccion_modulos#ejercicios-2-1-2-5) del curso Full Stack open 2021

## Iniciar la app

Usa el comando `npm install` para instalar la dependencias necesarias.

Despues, puedes iniciar la app usando el comando `npm start`, esto ejecutará un servidor en [http://localhost:3000](http://localhost:3000).

## Proceso

Para resolver los ejercicios se han realizado los siguientes pasos:

1. Copia del contenido de `../part1/courseinfo` en el directorio `./courseinfo`, excepto el directorio `node_modules`.
   **PowerShell:**

   ```
   mkdir courseinfo
   Get-ChildItem -Path "..\part1\courseinfo\" -Exclude node_modules | Copy-Item -Destination ".\courseinfo" -Recurse
   ```

2. Instalación de las dependencias.

   ```
   cd ./courseinfo
   npm install
   ```

3. Eliminación del componente `App` en `index.js`.

4. Creación del componente `App` con el código ofrecido por el ejercicio en un nuevo archivo en el directorio `src`.

   ```
   const App = () => {
      const course = {
         id: 1,
         name: 'Half Stack application development',
         parts: [
            {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1,
            },
            {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2,
            },
            {
            name: 'State of a component',
            exercises: 14,
            id: 3,
            },
         ],
      }

      return <Course course={course} />
   }
   ```

5. Implementación del componente `Course`.

6. Remplazo de la variable `course` en el componente `App` por la siguiente variable dada por el ejercicio.

   ```
   const courses = [
      {
         name: 'Half Stack application development',
         id: 1,
         parts: [
            {
               name: 'Fundamentals of React',
               exercises: 10,
               id: 1,
            },
            {
               name: 'Using props to pass data',
               exercises: 7,
               id: 2,
            },
            {
               name: 'State of a component',
               exercises: 14,
               id: 3,
            },
            {
               name: 'Redux',
               exercises: 11,
               id: 4,
            },
         ],
      },
      {
         name: 'Node.js',
         id: 2,
         parts: [
            {
               name: 'Routing',
               exercises: 3,
               id: 1,
            },
            {
               name: 'Middlewares',
               exercises: 7,
               id: 2,
            },
         ],
      },
   ]
   ```

7. Modificación del componente `App` para que pueda renderizar los diferentes cursos.
