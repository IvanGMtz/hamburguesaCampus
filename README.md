# hamburguesaCampus

La cafetería de Campuslands proporcionará a los campistas la conveniencia de adquirir hamburguesas, pero se enfrenta a un desafío crítico relacionado con la gestión de ingredientes. La gestión ineficiente de la disponibilidad de ingredientes puede llevar a problemas operativos, como la falta de ingredientes esenciales o el desperdicio de productos no utilizados por parte de los Chefs. Esto se traduce en una experiencia insatisfactoria para los clientes, pérdida de ingresos y un aumento innecesario en los costos operativos.

La falta de un sistema de gestión de inventario eficiente y automatizado dificulta la capacidad de los Chefs para:

1. Satisfacer la demanda de los clientes de manera constante y oportuna.
2. Mantener un seguimiento preciso de los ingredientes y su fecha de vencimiento.
3. Minimizar el desperdicio de ingredientes y costos innecesarios.
4. Tomar decisiones informadas sobre cuándo realizar pedidos de reposición.
5. Garantizar una experiencia de cliente consistente y de alta calidad en sus platos.

En resumen, los Chefs se enfrentan a un problema crítico de gestión de ingredientes que afecta su capacidad para operar eficientemente y brindar un servicio de calidad. Para abordar este problema, es necesario desarrollar un sistema de gestión de inventario efectivo que permita un control en tiempo real del stock de ingredientes y una planificación de pedidos más precisa.

**Nota :** Briyith te lo agradecerá UwU

## Requerimientos

El proyecto está desarrollado utilizando Node.js y MongoDB, por lo que necesitarás lo siguiente para ejecutarlo:


   - Node.js ([https://nodejs.org](https://nodejs.org/)) - Verifica que la versión instalada sea compatible con las dependencias del proyecto. Se recomienda la versión 18.16.0 de Node.js.
   - MongoDB Atlas (https://www.mongodb.com/cloud/atlas) - Se requiere una base de datos MongoDB en línea para almacenar la información del proyecto.

   ## Configuración del archivo .env

   Crea un archivo `.env` en la raíz del proyecto, configura las variables de entorno necesarias y la conexión a la base de datos. Un ejemplo de cómo configurar el archivo `.env` se proporciona en el archivo `.env.example`:

   ```json
MY_SERVER={"hostname":"127.10.10.15", "port":"3001"}

ATLAS_USER="latinoamericacampus233"
ATLAS_PASSWORD="Campus*2023"
ATLAS_DB="filtroMongo_IvanGarces"

# Clave privada para JWT
JWT_PASSWORD="Estern0cleidomast0ide012"
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
# MongoDB

```js
use("filtroMongo_IvanGarces");

db.createCollection("ingrediente", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['_id', 'name', 'stock', 'description', 'price'],
            properties: {
                _id: {
                    bsonType: "objectId"
                },
                name: {
                    bsonType: "string",
                    description: "'nombre' must be a string and is required"
                },
                stock: {
                    bsonType: "int",
                    description: "'cantidad' must be an integer and is required"
                },
                description: {
                    bsonType: "string",
                    description: "'descripcion' must be a string and is required"
                },
                price: {
                    bsonType: "int",
                    description: "'precio' must be an integer and is required"
                }
            }
        }
    }
});
db.ingrediente.insertMany([
    {
        name: "Tomate rojo",
        stock: 80,
        description: "Tomate clasico y fresco del campo",
        price: 1
    },
    {
        name: "Queso cheddar",
        stock: 30,
        description: "Delicioso queso cheddar de la marca quesito",
        price: 3
    },
    {
        name: "Pan Brioche",
        stock: 100,
        description: "Pan elaborada con harina, muy poca azúcar, un poco de leche, huevo y mantequilla",
        price: 5
    },
    {
        name: "Quesillo",
        stock: 50,
        description: "Quesillo del d2",
        price: 2
    },
    {
        name: "Cebolla roja",
        stock: 100,
        description: "Cebolla clasica y fresca del campo",
        price: 1
    },
    {
        name: "Queso costeño",
        stock: 50,
        description: "Queso clasico y fresco del campo",
        price: 4
    },
    {
        name: "Salsa de tomate",
        stock: 100,
        description: "Marca Fruko, clasico",
        price: 1
    },
    {
        name: "Mostaza",
        stock: 100,
        description: "Marca Fruko, clasico",
        price: 1
    },
    {
        name: "Tartara",
        stock: 401,
        description: "Salsa de la casa",
        price: 1
    },
    {
        name: "Salsa de rosada",
        stock: 0,
        description: "Marca Fruko, clasico",
        price: 1
    },
    {
        name: "Pan",
        stock: 0,
        description: "Clasico",
        price: 1
    }
]);

db.createCollection("chef", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['_id', 'name', 'specialism', 'number'],
            properties: {
                _id: {
                    bsonType: "objectId"
                },
                name: {
                    bsonType: "string",
                    description: "'nombre' must be a string and is required"
                },
                specialism: {
                    bsonType: "string",
                    description: "'especialidad' must be a string and is required"
                },
                number: {
                    bsonType: "string",
                    description: "'numero_telefono' must be an string and is required"
                }
            }
        }
    }
});
db.chef.insertMany([
    {
        name: "ChefA",
        specialism: "Carnes",
        number: "+57315553535"
    },
    {
        name: "ChefB",
        specialism: "Cocina Internacional",
        number: "+57315553535"
    },
    {
        name: "ChefC",
        specialism: "Cocina Vegetariana",
        number: "+57315553535"
    },
    {
        name: "ChefD",
        specialism: "Cocina Vegetariana",
        number: "+57315553535"
    },
    {
        name: "ChefE",
        specialism: "Cocina Asiática",
        number: "+57315553535"
    },
    {
        name: "ChefF",
        specialism: "Gourmet",
        number: "+57315553535"
    }
]);

db.createCollection("hamburguesa", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['_id', 'name', 'category', 'chef', 'description', 'price', 'ingredients'],
            properties: {
                _id: {
                    bsonType: "objectId"
                },
                name: {
                    bsonType: "string",
                    description: "'nombre' must be a string and is required"
                },
                category: {
                    bsonType: "string",
                    description: "'categoria' must be a string and is required"
                },
                chef: {
                    bsonType: "string",
                    description: "'nombre_chef' must be a string and is required"
                },
                description: {
                    bsonType: "string",
                    description: "'descripcion' must be a string and is required"
                },
                price: {
                    bsonType: "int",
                    description: "'precio' must be an integer and is required"
                },
                ingredients: {
                    bsonType: "array",
                    description: "'ingredientes' must be an array of ingredients and is required"
                }
            }
        }
    }
});
db.hamburguesa.insertMany([
    {
        name: "Hamburguesa para niños",
        category: "Clasica",
        chef: "ChefA",
        description: "Hamburguesa pequeña",
        price: 7,
        ingredients: ["Pan", "Quesillo", "Tomate", "Lechuga", "Carne de res 80gr"]
    },
    {
        name: "Hamburguesa Clasica",
        category: "Clasica",
        chef: "ChefA",
        description: "Hamburguesa basica de la casa",
        price: 9,
        ingredients: ["Pan", "Queso cheddar", "Tomate", "Lechuga", "Cebolla", "Carne de res 125gr"]
    },
    {
        name: "Hamburguesa verde",
        category: "Vegetariana",
        chef: "ChefC",
        description: "Hamburguesa vegetariana",
        price: 12,
        ingredients: ["Pan Integral", "Quesillo", "Tomate", "Lechuga", "Cebolla", "Carne de lentaja 125gr"]
    },
    {
        name: "Hamburguesa doble",
        category: "Clasica",
        chef: "ChefB",
        description: "Hamburguesa doble carne con adicion de papas cascos",
        price: 15,
        ingredients: ["Pan Brioche", "Queso cheddar", "Tomate", "Lechuga", "Cebolla grille", "Carne de res 250gr"]
    },
    {
        name: "Hamburguesa samurai",
        category: "Asiatica",
        chef: "ChefE",
        description: "Hamburguesa asiatica",
        price: 22,
        ingredients: ["Pan Brioche", "Queso cheddar", "Tomate", "Lechuga", "Carne de res 125gr", "Aros de cebolla", "Algas molidas kombu, nori y wakame"]
    },
    {
        name: "Hamburguesa de la casa",
        category: "Gourmet",
        chef: "ChefF",
        description: "Hamburguesa basica de la casa",
        price: 20,
        ingredients: ["Pan Brioche", "Queso cheddar x2", "Tomate", "Lechuga", "Cebolla grille", "Carne de res 150gr", "Tocineta x2", "Pepinillos"]
    }
]);

db.createCollection("rol", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['_id', 'rol', 'id', 'permisos'],
            properties: {
                _id: {
                    bsonType: "objectId"
                },
                rol: {
                    bsonType: "string"
                },
                id: {
                    bsonType: "int"
                },
                permisos: {
                    bsonType: "object"
                }
            }
        }
    }
});
db.rol.insertMany([
    {
        id: 1,
        rol: "Briyith",
        permisos: {
            "/chef": ["1.0.0", "2.0.1", "get", "put", "post", "delete"],
            "/hamburguesa": ["1.0.0", "2.0.1", "get", "put", "post", "delete"],
            "/ingrediente": ["1.0.0", "2.0.1", "get", "put", "post", "delete"]
        }
    },
    {
        id: 2,
        rol: "chef",
        permisos: {
            "/chef": ["1.0.0", "2.0.1", "get"],
            "/hamburguesa": ["1.0.0", "2.0.1", "get"],
            "/ingrediente": ["1.0.0", "2.0.1", "get"]
        }
    }
]);
```

------

   ## Generación del token

   Para interactuar con los endpoints, primero debes crear un token a partir del usuario y su rol.

   #### Rol: Briyith

   - Acceso: A todo.

   #### Rol: chef

   - Acceso:
     - Endpoint: "/chef"
       - Versión: "1.0.0", "2.0.1"
       - Métodos: "GET"
     - Endpoint: "/hamburguesa"
       - Versión: "1.0.0", "2.0.1"
       - Métodos: "GET", "POST"
     - Endpoint: "/ingrediente"
       - Versión: "1.0.0", "2.0.1"
       - Métodos: "GET"



   Ejemplos de datos a enviar:

   ```http
   GET http://127.10.10.15:3001/token
   ```
   Por el body:

   ```json
   {
       "rol": "Briyith"
    }
   ```
   Usaremos el usuario admin para poder ingresar a todas las peticiones.

   Se generará el siguiente mensaje que se debe agregar el JWT sin comillas al HTTP Header de tipo Authorization:

   ```json
   {
     "message": "Token successfully create",
     "JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY5MGY5MTIyYWRjMmIzNWM1M2E0OTkiLCJpZCI6IjEiLCJyb2wiOiJCcml5aXRoIiwiaWF0IjoxNjk0MDQ0OTEyLCJleHAiOjE2OTQwNTU3MTJ9.HXVN3XO60occjA_6Zl-QIQyaN8qDgY-HHeX_tVF_TlM"
   }
   ```
   ## Petición

   Para de interactuar con los endpoints puedes hacerlo mediante la siguiente petición GET:

   ```http
   GET http://127.10.10.15:3001/<nombre_endpoint>
   ```
**Nota**: Cada endpoint tiene un limite de peticiones, 5 cada 30 segundos.

   ## Endpoints Disponibles

   ### Listar chef v1.0.0

   Endpoint: `GET /chef `

Este endpoint te permite listar todos los chef registrados en el sistema. Ejemplos de Datos:

   ```json
   [
     {
       "_id": "64f8f0aa2b3345e8cb2fbbcb",
       "name": "ChefA",
       "specialism": "Carnes",
       "number": "+57315553535"
     },
     {
       "_id": "64f8f0aa2b3345e8cb2fbbcc",
       "name": "ChefB",
       "specialism": "Cocina Internacional",
       "number": "+57315553535"
     },
     {
       ...]
   ```
   ### Listar ingredientes v1.0.0

   Endpoint: `GET /ingrediente `

Este endpoint te permite listar todos los ingredientes registrados en el sistema. Ejemplos de Datos:

   ```json
[
  {
    "_id": "64f8f0aa2b3345e8cb2fbbc0",
    "name": "Tomate rojo",
    "stock": 80,
    "description": "Tomate clasico y fresco del campo",
    "price": 1
  },
  {
    "_id": "64f8f0aa2b3345e8cb2fbbc1",
    "name": "Queso cheddar",
    "stock": 30,
    "description": "Delicioso queso cheddar de la marca quesito",
    "price": 3
  },
  {
    "_id": "64f8f0aa2b3345e8cb2fbbc2",
    "name": "Pan Brioche",
    "stock": 100,
    "description": "Pan elaborada con harina, muy poca azúcar, un poco de leche, huevo y mantequilla",
    "price": 5
  },
    ...]
   ```

   ### Listar hamburguesas v1.0.0 (*Listar todas las hamburguesas con su descripción de categoría*)

   Endpoint: `GET /hamburguesa `

Este endpoint te permite listar todas las hamburguesas registradas en el sistema. Ejemplos de Datos:

   ```json
[
  {
    "_id": "64f8f0aa2b3345e8cb2fbbd1",
    "name": "Hamburguesa para niños",
    "category": "Clasica",
    "chef": "ChefA",
    "description": "Hamburguesa pequeña",
    "price": 7,
    "ingredients": [
      "Pan",
      "Quesillo",
      "Tomate",
      "Lechuga",
      "Carne de res 80gr"
    ]
  },
  {
    "_id": "64f8f0aa2b3345e8cb2fbbd2",
    "name": "Hamburguesa Clasica",
    "category": "Clasica",
    "chef": "ChefA",
    "description": "Hamburguesa basica de la casa",
    "price": 9,
    "ingredients": [
      "Pan",
      "Queso cheddar",
      "Tomate",
      "Lechuga",
      "Cebolla",
      "Carne de res 125gr"
    ]
  },
  {
    "_id": "64f8f0aa2b3345e8cb2fbbd3",
    "name": "Hamburguesa verde",
    "category": "Vegetariana",
    "chef": "ChefC",
    "description": "Hamburguesa vegetariana",
    "price": 12,
    "ingredients": [
      "Pan Integral",
      "Quesillo",
      "Tomate",
      "Lechuga",
      "Cebolla",
      "Carne de lentaja 125gr"
    ]
  },
    ...]
   ```



   ### Listar ingredientes v2.0.1 (*Encontrar todos los ingredientes con stock menor a 400*)

   Endpoint: `GET /ingrediente `

  Listar ingredientes menores a un valor dado. Los datos de entrada deben incluira través del body:

   - `cantidad`

     ```json
     {
       "cantidad": 400
     }
     ```

     Respuesta:

     ```json
     [
       {
         "_id": "64f8f0aa2b3345e8cb2fbbc0",
         "name": "Tomate rojo",
         "stock": 80,
         "description": "Tomate clasico y fresco del campo",
         "price": 1
       },
       {
         "_id": "64f8f0aa2b3345e8cb2fbbc1",
         "name": "Queso cheddar",
         "stock": 30,
         "description": "Delicioso queso cheddar de la marca quesito",
         "price": 3
       },
         ...]
     ```



   ### Listar hamburguesas v2.0.1 (*Encontrar todas las hamburguesas de la categoría "Vegetariana"*)

   Endpoint: `GET /hamburguesa `

  Listar hamburguesas de una categoria dada. Los datos de entrada deben incluira través del body:

   - `categoria`

     ```json
     {
       "categoria": "Vegetariana"
     }
     ```

     Respuesta:

     ```json
     [
       {
         "_id": "64f8f0aa2b3345e8cb2fbbd3",
         "name": "Hamburguesa verde",
         "category": "Vegetariana",
         "chef": "ChefC",
         "description": "Hamburguesa vegetariana",
         "price": 12,
         "ingredients": [
           "Pan Integral",
           "Quesillo",
           "Tomate",
           "Lechuga",
           "Cebolla",
           "Carne de lentaja 125gr"
         ]
       }
     ]
     ```



   ### Listar chefs v2.0.1 (*Encontrar todos los chefs que se especializan en "Carnes"*)

   Endpoint: `GET /chef `

  Listar chef de una especialidad dada. Los datos de entrada deben incluira través del body:

   - `especialidad`

     ```json
     {
       "especialidad": "Carnes"
     }
     ```

     Respuesta:

     ```json
     [
       {
         "_id": "64f8f0aa2b3345e8cb2fbbcb",
         "name": "ChefA",
         "specialism": "Carnes",
         "number": "+57315553535"
       },
         ...
     ]
     ```



   ### Listar hamburguesas preparadas por un chef v2.0.1 (*Encontrar todas las hamburguesas preparadas por "ChefB"*)

   Endpoint: `GET /hamburguesa/chef `

  Listar hamburguesas de un chef dado. Los datos de entrada deben incluira través del body:

   - `chef`

     ```json
     {
       "chef": "ChefB"
     }
     ```

     Respuesta:

     ```json
     [
       {
         "_id": "64f8f0aa2b3345e8cb2fbbd4",
         "name": "Hamburguesa doble",
         "category": "Clasica",
         "chef": "ChefB",
         "description": "Hamburguesa doble carne con adicion de papas cascos",
         "price": 15,
         "ingredients": [
           "Pan Brioche",
           "Queso cheddar",
           "Tomate",
           "Lechuga",
           "Cebolla grille",
           "Carne de res 250gr"
         ]
       } ...
     ]
     ```



   ### Listar hamburguesas por precios dados v2.0.1 (*Listar las hamburguesas cuyo precio es menor o igual a $9*)

   Endpoint: `GET /hamburguesa/precio `

Listar hamburguesas por precios dados, valores menores o igual a ese. Los datos de entrada deben incluira través del body:

   - `precio`

     ```json
     {
       "precio": 9
     }
     ```

     Respuesta:

     ```json
     [
       {
         "_id": "64f8f0aa2b3345e8cb2fbbd1",
         "name": "Hamburguesa para niños",
         "category": "Clasica",
         "chef": "ChefA",
         "description": "Hamburguesa pequeña",
         "price": 7,
         "ingredients": [
           "Pan",
           "Quesillo",
           "Tomate",
           "Lechuga",
           "Carne de res 80gr"
         ]
       },
       {
         "_id": "64f8f0aa2b3345e8cb2fbbd2",
         "name": "Hamburguesa Clasica",
         "category": "Clasica",
         "chef": "ChefA",
         "description": "Hamburguesa basica de la casa",
         "price": 9,
         "ingredients": [
           "Pan",
           "Queso cheddar",
           "Tomate",
           "Lechuga",
           "Cebolla",
           "Carne de res 125gr"
         ]
       } ...
     ]
     ```



   ### Listar hamburguesas en orden ascendete por precio v2.0.1

   Endpoint: `GET /hamburguesa/orden `

Este endpoint te permite listar todos las hamburguesas registrados en el sistema en orden ascendete según el precio. Ejemplos de Datos:

   ```json
[
  {
    "_id": "64f8f0aa2b3345e8cb2fbbd1",
    "name": "Hamburguesa para niños",
    "category": "Clasica",
    "chef": "ChefA",
    "description": "Hamburguesa pequeña",
    "price": 7,
    "ingredients": [
      "Pan",
      "Quesillo",
      "Tomate",
      "Lechuga",
      "Carne de res 80gr"
    ]
  },
  {
    "_id": "64f8f0aa2b3345e8cb2fbbd2",
    "name": "Hamburguesa Clasica",
    "category": "Clasica",
    "chef": "ChefA",
    "description": "Hamburguesa basica de la casa",
    "price": 9,
    "ingredients": [
      "Pan",
      "Queso cheddar",
      "Tomate",
      "Lechuga",
      "Cebolla",
      "Carne de res 125gr"
    ]
  },
  {
    "_id": "64f8f0aa2b3345e8cb2fbbd3",
    "name": "Hamburguesa verde",
    "category": "Vegetariana",
    "chef": "ChefC",
    "description": "Hamburguesa vegetariana",
    "price": 12,
    "ingredients": [
      "Pan Integral",
      "Quesillo",
      "Tomate",
      "Lechuga",
      "Cebolla",
      "Carne de lentaja 125gr"
    ]
  },
    ...]
   ```

   ### 

   ### Listar ingrediente más caro v2.0.1

   Endpoint: `GET /ingrediente/caro `

Este endpoint te permite encontrar el ingrediente más caro. Ejemplos de Datos:

   ```json
[
  {
    "_id": "64f8f0aa2b3345e8cb2fbbc2",
    "name": "Pan Brioche",
    "stock": 100,
    "description": "Pan elaborada con harina, muy poca azúcar, un poco de leche, huevo y mantequilla",
    "price": 5
  }
]
   ```

   ### Listar hamburguesa más cara v2.0.1

   Endpoint: `GET /hamburguesa/cara `

Este endpoint te permite encontrar la hamburguesa más cara. Ejemplos de Datos:

   ```json
[
  {
    "_id": "64f90e9baec2532c4934c34f",
    "name": "Hamburguesa samurai",
    "category": "Asiatica",
    "chef": "ChefE",
    "description": "Hamburguesa asiatica",
    "price": 22,
    "ingredients": [
      "Pan Brioche",
      "Queso cheddar",
      "Tomate",
      "Lechuga",
      "Carne de res 125gr",
      "Aros de cebolla",
      "Algas molidas kombu, nori y wakame"
    ]
  }
]
   ```

   ### 

   ### Actualizar stock de ingredientes v2.0.1 (*Incrementar el stock de "Pan" en 100 unidades*)

   Endpoint: `PUT /ingrediente `

  Actualizar el valor de stock a un ingrediente dado. Los datos de entrada deben incluira través del body:

   - `nombre`

   - `cantidad`

     ```json
     {
       "nombre": "Pan",
       "cantidad": 100
     }
     ```

     Respuesta:

     ```json
     {
       "message": "Ingrediente updated successfully"
     }
     ```



   ### Listar ingredientes en orden alfabetico v2.0.1

   Endpoint: `GET /ingrediente/orden `

Ejemplos de Datos:

   ```json
[
  {
    "_id": "64f8f0aa2b3345e8cb2fbbc4",
    "name": "Cebolla roja",
    "stock": 100,
    "description": "Cebolla clasica y fresca del campo",
    "price": 1
  },
  {
    "_id": "64f8f0aa2b3345e8cb2fbbc7",
    "name": "Mostaza",
    "stock": 100,
    "description": "Marca Fruko, clasico",
    "price": 1
  },
  {
    "_id": "64f8f0aa2b3345e8cb2fbbca",
    "name": "Pan",
    "stock": 400,
    "description": "Clasico",
    "price": 1
  }, ...
]
   ```

   ### 

   ### Listar ingredientes cuyo precio sea entre $2 y $50 v2.0.1

   Endpoint: `GET /ingrediente/rango `

Ejemplos de Datos:

   ```json
[
  {
    "_id": "64f8f0aa2b3345e8cb2fbbc1",
    "name": "Queso cheddar",
    "stock": 30,
    "description": "Delicioso queso cheddar de la marca quesito",
    "price": 3
  },
  {
    "_id": "64f8f0aa2b3345e8cb2fbbc2",
    "name": "Pan Brioche",
    "stock": 100,
    "description": "Pan elaborada con harina, muy poca azúcar, un poco de leche, huevo y mantequilla",
    "price": 5
  }, ...
]
   ```

   ### 

   ### Eliminar ingredientes con stock 0 v2.0.1

   Endpoint: `DELETE/ingrediente`

   Elimina los ingredientes con valor 0 en el sotck del sistema.

   - Ejemplo:

     ```http
     DELETE http://127.10.10.15:3001/ingrediente
     ```
     Respuesta:

     ```json
     {
       "message": "Ingredientes deleted successfully"
     }
     ```



   ### **Eliminar todos los chefs que tienen una especialidad en "Cocina Vegetariana"** 0 v2.0.1

   Endpoint: `DELETE/chef`

   - Ejemplo:

     ```http
     DELETE http://127.10.10.15:3001/chef
     ```

     Respuesta:

     ```json
     {
       "message": "Chef deleted successfully"
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
