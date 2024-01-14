# Utiliza una imagen base con Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Copia el script de inicialización
COPY seedDB.js .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["sh", "-c", "node seedDB.js && node api/server.js"]
