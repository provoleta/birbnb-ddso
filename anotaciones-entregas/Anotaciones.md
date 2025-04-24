# Anotaciones Primera Entrega (24/04/2025)


## Organizacion TP
    - Hacer ramas y commits cada persona, para poder visualizar la division del trabajo
    - Agregar guia de instalacion en el README.md
    - Agregar guia de ejecucion
    - En el futuro, una guia de uso tambien

## Observaciones codigo (formateo, consistencia)
    - Usar strings interpolados ``
    - El puerto se podria poner en un archivo .env (variable de entorno)
    - Agregar contexto al error, para que sea mas trazable el mismo
    - El atributo estado (clase Reserva) no hace falta en el constructor, siempre inicializa en PENDIENTE. 
    - Hacer tests unitarios (JEST o Mocha)
    - Usar siempre const para ser consistente
    - Para nombres de archivos es minusculas y - para espacios (Dashcase)
    - Usar misma convencion para variables, normalizar getters. 
    - Al pasar muchos parametros se puede mandar como si fuera un "diccionario". Utilizando llaves {}

## Modelado del trabajo practico
    - Usuario/anfitrion es un tema de permisos, no de dominio. 
    - El estado de la reserva en vez de tenerlo como atributo se puede obtener como el ultimo de la lista de cambioEstado o  es PENDIENTE
    - Tema atributos, es correcto que sean privados o publicos, es un contrato debil.

## Uso de Bibliotecas
    - Biblioteca JSDOC sirve para comentar los tipos de los atributos
    - Usar formateador de codigo e usar LINTER 
    - Bibliotecas para fechas (MomentJS | LocalDate)
