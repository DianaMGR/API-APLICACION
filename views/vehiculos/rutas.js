import Express from 'express';
import { queryAllvehicles, crearVehiculo } from '../../controllers/vehiculos/controllers.js';
import { getDB } from '../../DB/db.js';

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
    const filtrovehiculo ={_id: new ObjectID(req.body.id)};
    const baseDeDatos = getDB();
    baseDeDatos.collection('vehiculo').deleteOne(filtrovehiculo,(err,result) =>{
        if(err) {
            console.error(err);
            res.sendStatus(500);
        }
        else{
            res.sendStatus(200);

        }
    });
});

   // rutasvehiculo.route('/vehiculos/editar').path((req, res) => {
     //   const editar = req.body;
       // console.log(editar);
        //const filtrovehiculo = { _id: new ObjectId(editar.id) };
        //delete editar.id;
        //const operacion = {
          //  $set: editar,
            
        //};
        //const baseDeDatos = getDB();
        //baseDeDatos.collection('vehiculo').findOneAndUpdate(filtrovehiculo, operacion,
          //  {upsert: true, returnOriginal: true},(err, result) => {
            //    if (err) {
              //      console.error('error actualizando el vehiculo: ', err);
                //    res.sendStatus(500);
                //}
                //else {
                  //  console.log('Actualizacion exitosa');
                    //res.sendStatus(200);
                //}
            //});
    //



export default rutasvehiculo;