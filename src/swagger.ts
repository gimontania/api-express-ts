import swaggerAutogen from "swagger-autogen"; //importo para generar la doc automáticamente

const doc = { //configuro la información de la documentación 
    info:{
        title: "API de inscripciones académicas",
        description: "Documentación de la API REST del MP-S2",
    },
    host: "localhost:3000",
};

const outputFile = "./swagger_output.json"; //acá se guardará el archivo generado
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc); //genero automáticamente la documentación de swagger