import Express from 'express';
import { queryAllvehicles, crearVehiculo, editarvehiculo, eliminar } from '../../controllers/vehiculos/controllers.js';


const rutasvehiculo = Express.Router();

const genericcallback =(res) => (err, result)=>{
       
            if (err){
                
                res.status(500).send("error consultando vehiculos");
            }else{
                res.json(result);
             }   
            };
rutasvehiculo.route('/vehiculos').get((req, res)=> {
    console.log('get en la ruta /vehiculos');
    queryAllvehicles(genericcallback(res));
    });

rutasvehiculo.route('/vehiculos/nuevo').post((req, res) => {
crearVehiculo(req.body, genericcallback(res));    
});

rutasvehiculo.route('/vehiculos/eliminar').delete((req, res) =>{
   eliminar(req.body.id, genericcallback(res));
});

   rutasvehiculo.route('/vehiculos/editar').patch((req, res) => {
       editarvehiculo(req.body, genericcallback(res))
            });
    export default rutasvehiculo;