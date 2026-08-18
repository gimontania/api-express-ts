import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: http://localhost:${PORT}`);
});