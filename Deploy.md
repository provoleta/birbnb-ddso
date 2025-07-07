# Guia DEPLOY

## Backend

1. Iniciamos sesion en Render y clickeamos en el proyecto > Setting > Resume Web Service

2. Seteamos en ENVIRONMENT las siguientes variables:

   - MONGODB_DB_NAME: birbnb
   - MONGODB_URI: mongodb+srv://tperezgiacchetta:HUbxUDk3MAu44Whv@birbnb.eu4fdqb.mongodb.net/
   - PORT: 6969

3. Ponemos a ejecutar el Backend

## Frontend

1. Iniciamos sesion en Netlify y vamos a Project configuration
2. Seteamos en Environment varialbes la siguiente variable:
   - REACT_APP_IP_BACK: https://tp-cuatrimestral-jueves-manana-ju-ma.onrender.com
3. Ponemos a ejecutar (pagina: https://birbnb-grupo5.netlify.app/)

## Base de datos

1. Iniciamos sesion en MongoDB Atlas
2. Revisamos que este conectada la base de datos birbnb, sino levantamos un nuevo cluster lo que va a cambiar la MONGODB_URI
