import Express from 'express';
import { queryAllUsers, crearusuario, editarusuario, eliminar,consultarusuario } from '../../controllers/usuarios/controllers.js';


const rutasusuario = Express.Router();

const genericcallback =(res) => (err, result)=>{
       
            if (err){
                
                res.status(500).send("error consultando usuarios");
            }else{
                res.json(result);
             }   
            };
rutasusuario.route('/usuarios').get((req, res)=> {
    console.log('get en la ruta /usuarios');
    queryAllUsers(genericcallback(res));
    });

rutasusuario.route('/usuarios/:id').get((req, res)=> {
console.log('get en la ruta /usuarios');
consultarusuario(req.params.id, genericcallback(res));
        });    

rutasusuario.route('/usuarios').post((req, res) => {
crearusuario(req.body, genericcallback(res));    
});

rutasusuario.route('/usuarios/:id').delete((req, res) =>{
   eliminar(req.params.id, genericcallback(res));
});

   rutasusuario.route('/usuarios/:id').patch((req, res) => {
       editarusuario(req.params.id, req.body, genericcallback(res))
            });
    export default rutasusuario;