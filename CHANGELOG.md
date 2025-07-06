## Progreso

    🔳 v0.9.2
        - Ahora cuando se entra a notificaciones y reservas desde el perfil se visualizan correctamente los botones según la opción elegida.
        - Se cambió el ícono del botón de filtrar notificaciones a acorde al contexto del mismo.
        - Se visualiza correctamente cuando no hay notificaciones o reservas realizadas
        - Se cambió el color del botón para cancelar reserva.

    🔳 v0.9.1
        - Corrijo semantica en un import a kebab-case
        - Modifico el toDTO para reserva para que presente el id de la reserva cuando se accede al endpoint.
        - Modifico el atributo id de los json para poder distinguir más fácilmente a qué id se está referenciando.

    🔳 v0.9.0
        - Establezco formato ISO para las fechas a la hora de crear la reserva, actualizarla, crear notificaciones.

    🔳 v0.8.1
        - TESTS
        - Se cambio el endpoint para listar las notificaciones leidas y no leidas, ahora la request se tiene que hacer pasando por query tanto el userId como leida=true o leida=false

    🔳 v0.8.0
        - Implementacion de repositorios de usuario, reserva, alojamiento y notificacion para la comunicacion con la base de datos
        - Se agrega Mongoose como dependencia para manejar MongoDB

    🔳 v0.7.9
        - Se soluciono un inconveniente al momento de crear una notificacion con el calculo de los dias de alquiler (se implementa plugin para dayjs)
        - Se reformatea el mensaje dentro de la notificacion
        - El formato para rangoFecha queda definido como DD/MM/YYYY siendo DD: dia, MM: mes y YYYY:año, la cantidad de dígitos varía según la cantidad de letras mostradas en el formato.

    🔳 v0.7.8
        - Se arreglo un filtro que sobraba en notificacion-repository que impedia que se actualice la notificacion de un usuario luego de acceder al endpoint put notificacion/
        - Se elimino un parametro que sobraba en el endpoint PUT notificacion/ (anteriormente era notificacion/:id)
        - Se añadieron en el schema de notificacion los parámetros Leida y fechaLeida.
        - Se eliminaron imports sobrantes en reserva.js
        - Se añadió el método notificarReserva(huespedReservador, reserva) dentro de reserva-service, el mismo crea una notificacion y se la añade a la colección del huespedReservador
        - Se añadió el método async findAndUpdate en el usuario-repository, el mismo es el encargado de agregar notificaciones a la colección del usuario que corresponda según el filtro
        - Se añadió un javadoc en factory-notification

    🔳 v0.7.7
        - Creacion de reserva, historial de reservas y delete de reserva completados.
        - Se agregaron un par de excepciones para cancelacion de reserva y para disponibilidad de un alojamiento.
        - Se agrego el atributo "id" a las reservas.

    🔳 v0.7.6
        - Implementacion reservaServices.
        - Hay que ver tema del Id de la reserva para encontrarla.
        - Implementacion de test unitario de reserva
        - Los test ahora se dividen en dos (unitarios: unit | integradores entre capas: integration)

    🔳 v0.7.5
        - Implementacion Rutas
        - Implementacion NotificacionServices y AlojamientoServices

    🔳 v0.7.4
        - Se reacomodan las carpetas para diferenciar testings unitarios de tests de integracion
        - Se implementa supertest para tests de integracion

    🔳 v0.7.3

        - Fix: FactoryNotificacion no creaba la notificacion correctamente, ya que no se ponia el nombre del usuario.
        - Fix: Los imports van sin ``, solo se importa con las comillas simples ('')


    🔳 v0.7.2

        - Se agrega dayjs como biblioteca para todo el manejo de fechas


    🔳 v0.7.1

        - El estado de la reserva al crearse es siempre PENDIENTE, asi que saco el atributo del parametro del constructor
        - Formateo el codigo un poco


    🔳 v0.7.0

        - Arreglo de todos los imports/exports para que funcionen como corresponde
        - Se agrega jest como dependencia (solo en dev) para hacer tests
        - Archivo jest.config.js para permitir a Jest importar archivos usando ESM
        - Primer test unitario sobre alojamiento (incluyendo una reserva y usuario)


    🔳 v0.6.2

        - El puerto del servidor se levanta desde un archivo .env (en caso default se levantara en el puerto 9000)


    🔳 v0.6.1

        - Cambio logica de seSuperponeCon de un fecha
        - Agrego esto aca como le gusta a thiago!


    🔳 v0.6.0

        - Lógica de mensaje con el usuario includo en FactoryNotificacion terminada
        - Métodos crearReserva y cancelarReserva para el usuario implementado
        - Método crearCambioEstado implementado en la reserva, además de tener una lista de los cambios de estados para poner tener un seguimiento
        - Metodos auxiliares para calcular la cantidad de dias y getters sobre fechaInicio y fechaFin en la Reserva
        - crearSegunReserva en FactoryNotificacion como metodo static para no tener que instanciar a la clase


    🔳 v0.5.1

        - Se hace mas declarativo el metodo estaDisponibleEn(rangoFechas)

        > Pendiente: Terminar logica del Mensaje en la notificacion.


    🔳 v0.5.0

        - Reestructuracion en la logica para que el usuario reserve, se delega la resposabilidad al alojamiento para que cree la reserva
        - Se agrega lista de notificaciones como atributo al usuario, para que en un futuro se puedan gestionar estas
        - Se agrega logica en el usuario de crear notificacion

        > Pendiente: Esperar respuesta de atributo fecha alta y del contenido de la notificacion para poder terminar esa logica. Explicar GitFlow. Repreguntar si se puede agregar lista de notificaciones


    🔳 v0.4.3

        - Se agregó la creación de una excepción para cuando haya un estado no válido en FactoryNotification


    🔳 v0.4.2

        - Correcion de las clases que funcionaban como ENUM, en vez de clases son constantes que toman valores


    🔳 v0.4.1

        - Se agrega manejo de errores al crear notificacion


    🔳 v0.4.0

        - Se agregaron los métodos mensajeSegunEstado y usuarioSegunEstado en la clase FactoryNotification
        - Se modificaron los constructores de Notificacion y Reserva
        - Se agrego el getter de anfitrion en Reserva
        - Se agrego el getter de fecha leida en Notificacion

        > Pendiente : Determinar comportamiento del sistema, consultar atributo FechaAlta en Notificacion y explicar GitFlow


    🔳 v0.3.1

        - El primer endpoint funciona como debe


    🔳 v0.3.0

        - Agrego el package.json, el lock.json y el gitIgnore para que no se pushee la carpeta
          node_modules que se genera al instalar al repostorio

        > Pendiente : FactoryNotificacion, revisar endpoint y explicar GitFlow


    🔳 v0.2.0
        > Avance en la realizacion de metodos:
            -   estasDisponibleEn(rangoDeFechas)
            -   tuPrecioEstaDentroDe(valorMinimo, valorMaximo)
            -   tenesCaracteristica(caracteristica)
            -   puedenAlojarse(cantHuespedes)
            -   estaLibreEn(fechaSolicitada)        | Metodo extra
            -   actualizarEstado(EstadoReserva)
            -   marcarComoLeida()
        > Pendiente : FactoryNotificacion, revisar endpoint y explicar GitFlow


    🔳 v0.1.0
        > Diagrama de clases llevado a codigo (Clases, ENUM's)
        > Pendiente : Realizar metodos, revisar endpoint y explicar GitFlow
