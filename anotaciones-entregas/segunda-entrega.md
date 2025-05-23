# Anotaciones Segunda Entrega (22/05/2025)

## Rutas

- Rutas son en plural
- Ejemplo ruta singular: ..../perfil/
- La ruta para listar las reservas de un usuario, usuario/reservas/reservaId. Lo mismo con notificaciones
- Rutas de un usuario: Lo mas comun es no poner el id del usuario, por temas de seguridad.
  usuarios/.../...
- Las rutas de creacion devuelven el id de lo recien creado

## Formateo

- Formato ISO para las fechas YYYY-MM-DDTHH:mm:ss:SSSZ
  - Representar de la misma forma
  - Guardarlo de la misma forma en la base de datos
- Resolver inconsistencia de el formato con el que llega la caracteristica

## Detalles de codigo y estructura

- Usar middlewares (funcion que envuelve la ejecucion de una ruta)
- La cantidad de dias se cuentan en noches, no en dias (mensaje de notificacion)
- En los test de integracion, podemos utilizar expect.objectContaining para que sea mas elegible
- Guardar ejemplos de .json para poder hacer pruebas con el programa. Se pueden agregar al Swagger
- Agregar en el README que se necesita MongoDB y un .env de ejemplo
