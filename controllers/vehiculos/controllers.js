import { getDB } from "../../DB/db.js";
import { ObjectId } from "mongodb";
const queryAllvehicles = async (callback)=>{
    const baseDeDatos = getDB(); 
    await baseDeDatos.collection("vehiculo").find().limit(50).toArray(callback);
};

const consultarvehiculo = async (id, callback)=>{
    const baseDeDatos = getDB(); 
    await baseDeDatos.collection("vehiculo").findOne({ _id: new ObjectId(id) }, callback);
};
const crearVehiculo = async (datosvehiculo, callback) => {
            if(
                Object.keys(datosvehiculo).includes('name') &&
                Object.keys(datosvehiculo).includes('brand') &&
                Object.keys(datosvehiculo).includes('model')
              ){
           const baseDeDatos = getDB();   
          await baseDeDatos.collection('vehiculo').insertOne(datosvehiculo, callback); 
        }else{
                return 'error';
            } 
        };

const editarvehiculo = async (id, editar, callback) =>{
   const filtrovehiculo = { _id: new ObjectId(id) };
    
    const operacion = {
    $set: editar,
        
    };
    const baseDeDatos = getDB();
   await  baseDeDatos
   .collection('vehiculo')
   .findOneAndUpdate(filtrovehiculo, operacion,
        {upsert: true, returnOriginal: true},callback);
    
    
    };       
const eliminar = async (id,callback) =>{
    const filtrovehiculo ={_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('vehiculo').deleteOne(filtrovehiculo,callback);
       
        
}; 
export { queryAllvehicles, consultarvehiculo,crearVehiculo,editarvehiculo,eliminar };
