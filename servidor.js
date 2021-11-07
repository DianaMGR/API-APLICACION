import Express from 'express';
import { MongoClient } from 'mongodb';
import Cors from 'cors';
const stringConexion = 'mongodb+srv://DianaGonzalez:simon0304@proyectoventas.cmbcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';



const client = new MongoClient(stringConexion,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let conexion;
const app = Express();
app.use(Express.json());
app.use(Cors());

app.get('/productos',(req, res)=> {
    console.log('alguien hizo get');
    conexion.collection('productos').find({}).limit(20).toArray((err, result) => {
        if (err){
            res.status(500).send('error consultando Los Productos');
        }
        else{
            res.json(result);
        }
    });
});

    



app.post('/productos/nuevo', (req, res) =>{
    console.log (req);
    const datosproductos = req.body;
    console.log ('llaves: ', Object.keys(datosproductos)); 
    try {
        if (
            Object.keys(datosproductos).includes('nombre')&&
            Object.keys(datosproductos).includes('codigoba')&&
            Object.keys(datosproductos).includes('descripcion')&&
            Object.keys(datosproductos).includes('estado')
        )
        {
conexion.collection('productos').insertOne(datosproductos,(err,result)=>{
 if(err){
     console.error(err);
     res.sendStatus(500);
 } else {
     console.log(result);
     res.sendStatus(200);
 }
});
}else {
    res.sendStatus(500);

}
} catch{
   res.sendStatus(500);
}
});

const main = () => {
    client.connect((err,db)=>{
        if (err) {
            console.error('Error conectando a la base de datos');
            return false;
        }
        conexion =db.db('AplicacionVentas');
        console.log('conexion exitosa');
        return app.listen(5050, ()=> {
        console.log ('escuchando, puerto'); 

        });
    });   
};
main();