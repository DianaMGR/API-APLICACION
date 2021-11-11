import { MongoClient,  } from 'mongodb';
import dotenv from 'dotenv';


dotenv.config({path:'./.env'});
const stringConexion = process.env.DATABASE_URL; 
const client = new MongoClient(stringConexion,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

let baseDeDatos;

const conectarBD = (callback) => {
    client.connect((err,db) => {
        if(err){
            console.error("error conectando con la BD");
            return 'error';
           
        }
    baseDeDatos = db.db('Concesionario');  
    console.log("conexion exitosa"); 
    return callback();
    });
};

const getDB = () => {
    return baseDeDatos;
};
export {conectarBD, getDB};



