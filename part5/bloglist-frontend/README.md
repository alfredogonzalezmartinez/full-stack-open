# Frontend de la lista de blogs

Solución de los [Ejercicios 5.1.-5.4.](https://fullstackopen.com/es/part5/iniciar_sesion_en_la_interfaz#ejercicios-5-1-5-4) y [Ejercicios 5.5.-5.10.](https://fullstackopen.com/es/part5/props_children_y_proptypes#ejercicios-5-5-5-10) del curso Full Stack open 2021.

## Aplicación

Para el funcionamiento de la aplicación es necesario contar con un [backend](../../part4/bloglist/) como el de la parte 4 e instalar las dependencias.

### Dependencias

Use el comando `npm install` instalar las dependencias.

### Scripts

- **`npm start`** Inicia la aplicación.

## Proceso

Para resolver los ejercicios se han realizado los siguientes pasos:

1. Clonación del repositorio [fullstack-hy2020/bloglist-frontend](https://github.com/fullstack-hy2020/bloglist-frontend).

   ```
   git clone https://github.com/fullstack-hy2020/bloglist-frontend
   ```

2. Borrado de la configuración de git.

   ```
   cd bloglist-frontend
   rm -rf .git
   rm .gitignore
   ```

3. Instalación de las dependencias.

   ```
   npm install
   ```

4. Implementación de la funcionalidad para realizar el inicio de sesión.

5. Implementación para que el inicio de sesión sea permanente y haya una forma de cerrar sesión.

6. Implementación de la funcionalidad para agregar blogs si se ha iniciado sesión.

7. Implementación de notificaciones que informen al usuario sobre operaciones exitosas y fallidas.

8. Refactorización del código para extraer en componentes las diferentes partes de la aplicación.

9. Implementación de la funcionalidad para mostrar el formulario para crear nuevos blogs después de pulsar un botón y que este se oculte cuando se cree el blog.

10. Implementación de un botón en cada blog para controlar si se muestran u ocultan los detalles del blog.

11. Implementación de la funcionalidad para aumentar los likes al pulsar el botón like.

12. Implementación de la funcionalidad para que el orden de los blogs este definido por su número de likes.

13. Implementación de la funcionalidad para que los blogs puedan ser borrados por los usuarios que los crearon.
