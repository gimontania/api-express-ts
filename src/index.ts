import express from "express"; //importo de express
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json()); //crea un midldleware de Express que permite leer json enviados en el body

interface Estudiante {  //defino como debe ser un objeto estudiante, con sus 4 propiedades
    id: number;
    nombre: string;
    email: string;
    bootcamp:string;
}

const estudiantes: Estudiante[] = []; // array donde vamos a almacenar los estudiantes

app.get("/api/status", (req: Request, res: Response) => {  //endpoint sirve para comprobar si el servidor está funcionando
    res.json({
        status: "Servidor en línea",
        version: "1.0.0"
    });
});


app.get("/api/estudiantes", (req: Request, res: Response) => { //cuando alguien haga un GET (pedir u obtener información)
    res.json(estudiantes);
});

app.post("/api/estudiantes", (req:Request, res:Response) => { //cuando alguien envíe un POST, ejecutamos esta función
    const {nombre, email, bootcamp} = req.body;

    if(!email) { //verificamos si existe el email
        return res.status(400).json({
            error: "El email es obligatorio"
        });
    }

    const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre,
    email,
    bootcamp
    };

    estudiantes.push(nuevoEstudiante); //agregamos el estudiante al array

    res.status(201).json(nuevoEstudiante); //devuelve 201 y el estudiante creado

    });

app.put("/api/estudiantes/:id", (req:Request,res: Response) => { //en este caso PUT es para ACTUALIZAR un estudiante que ya existe
    const id = Number(req.params.id);
    const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

    if(!estudiante) { //existe el estudiante?
        return res.status(404).json({
            error: "Estudiante no encontrado"
        });
    }

    const { nombre, email, bootcamp } = req.body; //si existe recibe los datos

    estudiante.nombre = nombre;
    estudiante.email = email ;
    estudiante.bootcamp = bootcamp;

    res.json(estudiante); //enviamos los datos actualizados

});     

app.delete("/api/estudiantes/:id", (req: Request, res: Response) => { //eliminamos un estudiante
    const id = Number(req.params.id);
    const indice = estudiantes.findIndex((estudiante) => estudiante.id === id); //buscamos la posicion del estudiante

    if(indice === -1) {
        return res.status(404).json({
            error: "Estudiante no encontrado"
        });
    }

    estudiantes.splice(indice, 1); //desde la posición lo elimina

    res.status(204).send(); //devuelve 204 
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: http://localhost:${PORT}`);
});