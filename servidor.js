import Express from 'express';
import { conectarBD } from './DB/db.js';
import Cors from 'cors';
import rutasvehiculo from './views/vehiculos/rutas.js';
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutasvehiculo);
    const main = () => {
    return app.listen(process.env.PORT, () => {
    console.log(`corriendo en el puerto: ${process.env.PORT}`);
    });
};

conectarBD (main);