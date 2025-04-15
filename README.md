BIRBNB
======

### Jeremias Bartolsic, Thiago Perez Giacchetta, Lucas Sebastian Arias, Tomás Bühler, Nicolas Agüero

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
