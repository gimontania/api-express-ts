import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/api/status", (req: Request, res: Response) => {
    res.json({
        status: "Servidor en línea",
        version: "1.0.0"
    });
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: http://localhost:${PORT}`);
});