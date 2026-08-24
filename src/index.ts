import express from "express"; //importo de express
import type { Request, Response } from "express";
import estudiantesRouter from "./routes/estudiantes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import cors from "cors"; //importo cors para permitir peticiones desde otros orígenes

const app = express();
const PORT = process.env.PORT ?? 3000; //toma el puerto desde .env, si o existe usa el 3000

app.use(express.json()); //crea un midleware de Express que permite leer json enviados en el body
app.use(cors());
app.use("/api/estudiantes", estudiantesRouter);//conectamos las rutas de estudiantes bajo el prefijo /api/estudiantes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput)); //mostramos la documentación de swagger

//endpoint para comprobar que el servidor está funcionando
app.get("/api/status", (req: Request, res: Response) => {
    res.json({
        status: "Servidor en linea",
        version: "1.0.0"
    });
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: http://localhost:${PORT}`);
});