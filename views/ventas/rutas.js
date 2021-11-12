import Express from 'express';
import { queryAllventas, crearventa, editarventa, eliminar,consultarventa } from '../../controllers/ventas/controllers.js';


const rutasventa = Express.Router();

const genericcallback =(res) => (err, result)=>{
       
            if (err){
                
                res.status(500).send("error consultando ventas");
            }else{
                res.json(result);
             }   
            };
rutasventa.route('/ventas').get((req, res)=> {
    console.log('get en la ruta /ventas');
    queryAllventas(genericcallback(res));
    });

rutasventa.route('/ventas/:id').get((req, res)=> {
console.log('get en la ruta /ventas');
consultarventa(req.params.id, genericcallback(res));
        });    

rutasventa.route('/ventas/nuevo').post((req, res) => {
crearventa(req.body, genericcallback(res));    
});

rutasventa.route('/ventas/:id').delete((req, res) =>{
   eliminar(req.params.id, genericcallback(res));
});

   rutasventa.route('/ventas/:id').patch((req, res) => {
       editarventa(req.params.id, req.body, genericcallback(res))
            });
    export default rutasventa;