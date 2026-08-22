import { Router} from "express";
import type { Request, Response } from "express";

const router = Router (); //creo un router para manejar las rutas de estudiantes

interface Estudiante { //defino la estructura de un estudiante
    id: number;
    nombre: string;
    email: string;
    bootcamp: string;
}

const estudiantes: Estudiante[] = []; //array donde almacenamos estudiantes

//obtener todos los estudiantes o filtrar bootcamp
router.get("/", (req: Request, res: Response) => { 
    const { bootcamp } = req.query;

    if(bootcamp){
        const filtrados = estudiantes.filter((estudiante) =>
            estudiante.bootcamp === bootcamp
        );        

    return res.json(filtrados);
    }
    res.json(estudiantes);
});

//obtener estudiante por id
router.get("/:id",(req: Request, res: Response) => {
    const id = Number(req.params.id);

    const estudiante = estudiantes.find((estudiante) =>
        estudiante.id === id
    );

    if(!estudiante) {
        return res.status(404).json({
            error: "Estudiante no encontrado"
        });
    }
    res.json(estudiante);
});

//crear un nuevo estudiante
router.post("/", (req:Request, res:Response) => { //cuando alguien envíe un POST, ejecutamos esta función
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

    //actualizar un estudiante que ya existe
    router.put("/:id", (req: Request, res: Response) => { //en este caso PUT es para ACTUALIZAR un estudiante que ya existe
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

    //eliminar un estudiante
    router.delete("/:id", (req: Request, res: Response) => { //eliminamos un estudiante
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

export default router; //export el router para utilizarlo en index.ts

