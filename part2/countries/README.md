# Datos de países

Solución de los [ejercicios 2.12.-2.14.](https://https://fullstackopen.com/es/part2/obteniendo_datos_del_servidor#ejercicios-2-11-2-14) del curso Full Stack open 2021

## Iniciar la app

Usa el comando `npm install` para instalar las dependencias necesarias.

Para el funcionamiento de esta app en neceario contar con una Access Key de la API [weatherstack](https://weatherstack.com/) y suminístrala en la variable de entorno `REACT_APP_API_KEY`.

Puedes iniciar la app usando el comando `npm start`, esto ejecutará un servidor en [http://localhost:3000](http://localhost:3000).

## Proceso

Para resolver los ejercicios se han realizado los siguientes pasos:

1. Creación de una React app.

   ```
   npx create-react-app countries
   ```

2. Eliminación del directorio `.git` y el archivo `.gitignore`. Esto se hace porque no se quiere que este proyecto se convierta en un repositorio git.

   ```
   cd ./countries
   rm -rf ./.git
   rm ./.gitignore
   ```

3. Eliminación de los archivos innecesarios en el directorio `src`.

   ```
   cd ./src
   rm ./App.css ./App.test.js ./logo.svg ./setupTests.js ./reportWebVitals.js
   ```

4. Desarrollo del servicio `getAllCountries` para obtener los datos de los países desde la API [REST Countries](https://restcountries.com/).

5. Implementación de código necesario para mostrar los datos del país según un filtro.

6. Implementación de la función para mostrar los datos del país pulsando un botón junto a su nombre.

7. Obtención de una Access Key de la API [weatherstack](https://weatherstack.com/).

8. Creación de un archivo `.env.local` para pasarle la API Access Key a la app en la variable de entorno `REACT_APP_API_KEY`. Es necesario reiniciar la app para tener disponible la variable de entorno.

   ```
   REACT_APP_API_KEY=your_api_access_key
   ```

9. Desarrollo del servicio `getCurrentWeather` para obtener los datos del clima de la ciudad pasada por parámetro desde la API [weatherstack](https://weatherstack.com/).

10. Desarrollo del componente `Weather` para mostrar los datos del clima de una ciudad.
