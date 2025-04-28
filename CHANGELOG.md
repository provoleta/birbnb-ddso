## Progreso

    🔳 v0.1.0 
        > Diagrama de clases llevado a codigo (Clases, ENUM's)
        > Pendiente : Realizar metodos, revisar endpoint y explicar GitFlow 
    
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

    🔳 v0.3.0 
        
        - Agrego el package.json, el lock.json y el gitIgnore para que no se pushee la carpeta 
          node_modules que se genera al instalar al repostorio  

        > Pendiente : FactoryNotificacion, revisar endpoint y explicar GitFlow

    🔳 v0.3.1
        
        - El primer endpoint funciona como debe
    
    🔳 v0.4.0
        
        - Se agregaron los métodos mensajeSegunEstado y usuarioSegunEstado en la clase FactoryNotification
        - Se modificaron los constructores de Notificacion y Reserva
        - Se agrego el getter de anfitrion en Reserva
        - Se agrego el getter de fecha leida en Notificacion

        > Pendiente : Determinar comportamiento del sistema, consultar atributo FechaAlta en Notificacion y explicar GitFlow
    
    🔳 v0.4.1

        - Se agrega manejo de errores al crear notificacion

    🔳 v0.4.2

        - Correcion de las clases que funcionaban como ENUM, en vez de clases son constantes que toman valores
    
    🔳 v0.4.3

        - Se agregó la creación de una excepción para cuando haya un estado no válido en FactoryNotification

    🔳 v0.5.0

        - Reestructuracion en la logica para que el usuario reserve, se delega la resposabilidad al alojamiento para que cree la reserva
        - Se agrega lista de notificaciones como atributo al usuario, para que en un futuro se puedan gestionar estas
        - Se agrega logica en el usuario de crear notificacion

        > Pendiente: Esperar respuesta de atributo fecha alta y del contenido de la notificacion para poder terminar esa logica. Explicar GitFlow. Repreguntar si se puede agregar lista de notificaciones

    🔳 v0.5.1

        - Se hace mas declarativo el metodo estaDisponibleEn(rangoFechas)

        > Pendiente: Terminar logica del Mensaje en la notificacion.

    🔳 v0.6.0

        - Lógica de mensaje con el usuario includo en FactoryNotificacion terminada
        - Métodos crearReserva y cancelarReserva para el usuario implementado
        - Método crearCambioEstado implementado en la reserva, además de tener una lista de los cambios de estados para poner tener un seguimiento
        - Metodos auxiliares para calcular la cantidad de dias y getters sobre fechaInicio y fechaFin en la Reserva
        - crearSegunReserva en FactoryNotificacion como metodo static para no tener que instanciar a la clase

    🔳 v0.6.1

        - Cambio logica de seSuperponeCon de un fecha
        - Agrego esto aca como le gusta a thiago!
    
    🔳 v0.6.2

        - El puerto del servidor se levanta desde un archivo .env (en caso default se levantara en el puerto 9000)
    
    🔳 v0.7.0

        - Arreglo de todos los imports/exports para que funcionen como corresponde
        - Se agrega jest como dependencia (solo en dev) para hacer tests
        - Archivo jest.config.js para permitir a Jest importar archivos usando ESM
        - Primer test unitario sobre alojamiento (incluyendo una reserva y usuario)
    
    🔳 v0.7.1

        - El estado de la reserva al crearse es siempre PENDIENTE, asi que saco el atributo del parametro del constructor
        - Formateo el codigo un poco

    🔳 v0.7.2

        - Se agrega dayjs como biblioteca para todo el manejo de fechas
        
        
