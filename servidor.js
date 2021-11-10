import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors';
import { ObjectID } from 'bson';
const stringConexion = 'mongodb+srv://DianaGonzalez:simon0304@proyectoventas.cmbcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';



const client = new MongoClient(stringConexion,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let baseDeDatos;
const app = Express();
app.use(Express.json());
app.use(Cors());

app.get('/vehiculos',(req, res)=> {
    console.log('get en la rua /vehiculos');
    baseDeDatos.collection("vehiculo").find({}).limit(50).toArray((err,result)=> {
        if (err){
            res.status(500).send("error consultando vehiculos");
        }else{

            res.json(result);
         }   
        });
    });
 app.post('/vehiculos/nuevo', (req, res) => {
    console.log(req);
    const datosvehiculo = req.body;
    console.log('llaves: ', Object.keys(datosvehiculo));
    try{
        if(
            Object.keys(datosvehiculo).includes('name') &&
            Object.keys(datosvehiculo).includes('brand') &&
            Object.keys(datosvehiculo).includes('model')
            
        ){
            //codigo para implementacion de vehiculos en la BD
        baseDeDatos.collection('vehiculo'),insertOne(datosvehiculo, (err, result) => {
            if(err){
                console.error(err);
                res.sendStatus(500);
          } else {
           console.log(result);   
           res.sendStatus(200);
            }
        });
    }
        else{
            res.sendStatus(500);
        } 
} catch{
res.sendStatus(500);
}
});

app.delete ('/vehiculos/eliminar', (req, res) =>{
    const filtrovehiculo ={_id: new ObjectID(req.body.id)};
    baseDeDatos.collection('vehiculo').deleteOne(filtrovehiculo,(err,result) =>{
        if(err) {
            console.error(err);
            res.sendStatus(500);
        }
        else{
            res.sendStatus(200);

        }
    });
})

app.patch('/vehiculos/editar', (req, res) => {
    const editar = req.body;
    console.log(editar);
    const filtrovehiculo = { _id: new ObjectId(editar.id) };
    delete editar.id;
    const operacion = {
        $set: editar,
    };
    baseDeDatos.collection('vehiculo').findOneAndUpdate(filtrovehiculo, operacion,
         {upsert: true, returnOriginal: true},(err, result) => {
             if (err) {
                 console.error('error actualizando el vehiculo: ', err);
                 res.sendStatus(500);
             }
             else {
                 console.log('Actualizacion exitosa');
                 res.sendStatus(200);
             }
         });
});
    
     
const main = () => {
    client.connect((err,db) => {
        if(err){
            console.error("error conectando con la BD");
            return 'error';
           
        }
    baseDeDatos = db.db('Concesionario');  
    console.log("conexion exitosa"); 
    return app.listen(5000, () => {
    console.log('escuchando puerto 5050');
    });
});

};
main();