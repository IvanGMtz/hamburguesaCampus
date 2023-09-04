# mongoPrueba

Este es un proyecto de backend para una empresa de ____ . El objetivo es desarrollar un sistema que permita gestionar____ y otras funcionalidades esenciales para una plataforma de entrega de _______. El proyecto se llevará a cabo utilizando MongoDB y Node.js como tecnologías principales.

1. ## Requerimientos

   El proyecto está desarrollado utilizando Node.js y MongoDB, por lo que necesitarás lo siguiente para ejecutarlo:


   - Node.js ([https://nodejs.org](https://nodejs.org/)) - Verifica que la versión instalada sea compatible con las dependencias del proyecto. Se recomienda la versión 18.16.0 de Node.js.
   - MongoDB Atlas (https://www.mongodb.com/cloud/atlas) - Se requiere una base de datos MongoDB en línea para almacenar la información del proyecto.

   ## Configuración del archivo .env

   Crea un archivo `.env` en la raíz del proyecto, configura las variables de entorno necesarias y la conexión a la base de datos. Un ejemplo de cómo configurar el archivo `.env` se proporciona en el archivo `.env.example`:

   ```json
   MY_SERVER={"hostname":"127.10.10.15", "port":"3001"}

   ATLAS_USER="tu_usuario_de_MongoDB_Atlas"
   ATLAS_PASSWORD="tu_contraseña_de_MongoDB_Atlas"
   ATLAS_DB="db_rappi"

   # Clave privada para JWT
   JWT_PASSWORD="tu_contraseña_de_creación_del_token"
   ```
   Sí puede pedir las credenciales al autor sería lo ideal, en caso contrario modificar lo siguiente en la uri en el documento atlas.js dentro de las carpetas config/connection.

   ```tex
    const uri= `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}
    @cluster0.jzmvywo.mongodb.net/${process.env.ATLAS_DB}`

    const uri= `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}
    @cluster0.<cambiar>.mongodb.net/${process.env.ATLAS_DB}`
   ```
   ## Instalación de Dependencias

   Ejecuta el siguiente comando en la terminal para instalar las dependencias necesarias:

   ```
   npm install
   ```
   ## Montar el Servidor

   Una vez configuradas las variables de entorno, puedes iniciar el servidor con el siguiente comando:

   ```
   npm run dev
   ```
   ## Generación del token

   Para interactuar con los endpoints, primero debes crear un token a partir del usuario y su rol.

   #### Rol: admin

   - Acceso: A todo.

   #### Rol: usuario

   - Acceso:
     - Endpoint: "/catalogo"
       - Versión: "1.0.0"
       - Métodos: "GET"
     - Endpoint: "/pedido"
       - Versión: "1.0.0"
       - Métodos: "GET", "POST"
     - Endpoint: "/usuario"
       - Versión: "1.0.0"
       - Métodos: "GET", "PUT"

   ```http
   GET http://127.10.10.15:3001/token?rol=<rol>
   ```
   El rol administrador no genera token, se hace desde usuario

   Ejemplos de datos a enviar:

   ```http
   GET http://127.10.10.15:3001/token?rol=usuario
   ```
   Por el body:

   ```json
   {
       "nombre": "adminHack"
    }
   ```
   Usaremos el usuario admin para poder ingresar a todas las peticiones.

   Se generará el siguiente código que se debe agregar al HTTP Header de tipo Authorization:

   ```json
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVlYzMyOTYxNDg1ZGY4MzZiYTJiNTgiLCJpZCI6IjEiLCJyb2wiOjEsImlhdCI6MTY5MzQxNDkzMiwiZXhwIjoxNjkzNDI1NzMyfQ.EMYHldjqe_WhozMBw72zgHwszAnEVdWIR9ld-P1hiH0
   ```
   ## Petición

   Para de interactuar con los endpoints puedes hacerlo mediante la siguiente petición GET:

   ```http
   GET http://127.10.10.15:3001/<nombre_endpoint>
   ```
   ## Endpoints Disponibles

   ### Listar usuarios v1.0.0

   Endpoint: `GET /usuario `

   Este endpoint te permite listar todos los usuarios registradas en el sistema desde el rol admin. Ejemplos de Datos:

   ```json
   [
     {
       "_id": "64eec32961485df836ba2b58",
       "id": 1,
       "nombre": "adminHack",
       "apellido": "Hack",
       "email": "hack69@hotmail.com",
       "departamento": "Amazonas2",
       "ciudad": "Peyecuesta",
       "direccion": "incognito",
       "telefono": 1000001,
       "rol": 1
     },
     {
       "_id": "64eec32961485df836ba2b59",
       "id": 2,
       "nombre": "Juan",
       "apellido": "Perez",
       "email": "juan0@hotmail.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "avenida 15",
       "telefono": 31523456,
       "rol": 4
     },
       ...]
   ```
   Desde el rol usuario, solo la información referente a ese usuario (Se debe generar el token desde el rol usuario primero, y usar un usuario que se encuentre en la base de datos ejemplo *Juan*). Ejemplos de Datos:

   ```json
   [
     {
       "_id": "64eec32961485df836ba2b59",
       "id": 2,
       "nombre": "Juan",
       "apellido": "Perez",
       "email": "juan0@hotmail.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "avenida 15",
       "telefono": 31523456,
       "rol": 4
     }
   ]
   ```

   ### Crear usuarios v1.0.0

   Endpoint: `POST /usuario `

   Crea una nuevo usuarios en el sistema. Los datos de entrada deben incluir:

   - `nombre`
   - `apellido`
   - `email`
   - `departamento`
   - `ciudad`
   - `direccion`
   - `telefono`

     ```json
     {
       "nombre": "Laura",
       "apellido": "Ramirez",
       "email": "LauR@campusland.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "Puenta la 9na",
       "telefono": 3001523
      }
     ```
     Respuesta:

     ```json
     {
       "message": "Usuario added successfully",
       "insertedId": "64ef7a044b8a409050766adb"
     }
     ```

   ### Editar usuarios v1.0.0

   Endpoint: `PUT/usuario/id`

   Edita un usuario en el sistema. Los datos de entrada deben incluir:

   - `id` a través de la URL.
   - `nombre`
   - `apellido`
   - `email`
   - `departamento`
   - `ciudad`
   - `direccion`
   - `telefono`

     ```http
     PUT http://127.10.10.15:3001/usuario/4
     ```
     ```json
     {
       "nombre": "Laura",
       "apellido": "Ramirez",
       "email": "LauR@campusland.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "Debajo del puente la 9na",
       "telefono": 3001523
      }
     ```
     Respuesta:

     ```json
     {
       "message": "Usuario updated successfully"
     }
     ```

   ### Eliminar usuario v2.0.1

   Endpoint: `DELETE/usuario/id`

   Elimina un usuario del sistema. Los datos de entrada deben incluir:

   - `id` a través de la URL.

     ```http
     DELETE http://127.10.10.15:3001/usuario/4
     ```
     Respuesta:

     ```json
     {
       "message": "Usuario deleted successfully"
     }
     ```


   ## Dependencias Utilizadas

   Este proyecto utiliza diversas dependencias para su funcionamiento. A continuación, se detallan las dependencias principales y sus respectivas versiones:

   - **express**: 4.18.2 Express es un marco de aplicación web rápido, minimalista y flexible para Node.js. Es utilizado en este proyecto para manejar las rutas y la lógica de la aplicación.
   - **dotenv**: 16.3.1 Dotenv es una librería que permite cargar variables de entorno desde un archivo `.env`. En este proyecto, se utiliza para gestionar las configuraciones sensibles.
   - **express-rate-limit**: 6.8.1 Express Rate Limit es un middleware que proporciona limitación de velocidad y control de la frecuencia de las solicitudes HTTP. Se utiliza aquí para prevenir ataques de fuerza bruta y abusos.
   - **mongodb**: 5.7.0 MongoDB es una base de datos NoSQL ampliamente utilizada. En este proyecto, se usa para almacenar y recuperar datos relacionados con el alquiler de autos.
   - **nodemon**: 3.0.1 Nodemon es una herramienta que ayuda en el desarrollo al reiniciar automáticamente la aplicación cuando se detectan cambios en el código fuente. Esto agiliza el proceso de desarrollo y prueba.
   - **jose** (4.14.4): Esta dependencia parece relacionarse con JSON Web Tokens (JWT) y puede estar relacionada con la autenticación y la seguridad en tu aplicación.
   - **express-session** (1.17.3): Express Session es una librería que permite gestionar sesiones de usuario en aplicaciones Express.js. Puede ser utilizada para mantener el estado de la sesión del usuario en el servidor.
   - **express-routes-versioning**: ^1.0.1: Express Routes  Versioning es una librería para Node.js que permite manejar y gestionar  versiones en las rutas de una aplicación Express de manera sencilla. Con esta dependencia, puedes definir y mantener diferentes versiones de tus rutas en función de los cambios y actualizaciones que realices en tu  API. Esto es útil para garantizar la compatibilidad hacia atrás y  permitir que los clientes sigan utilizando versiones anteriores de tu  API mientras introduces nuevas funcionalidades.
