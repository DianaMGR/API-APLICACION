import { getDB } from "../../DB/db.js";
import { ObjectId } from "mongodb";
const queryAllvehicles = async (callback)=>{
    const baseDeDatos = getDB(); 
    await baseDeDatos.collection("vehiculo").find().limit(50).toArray(callback);
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

const editarvehiculo = async (editar, callback) =>{
   const filtrovehiculo = { _id: new ObjectId(editar.id) };
    delete editar.id;
    const operacion = {
  $set: editar,
        
    };
    const baseDeDatos = getDB();
   await  baseDeDatos.collection('vehiculo').findOneAndUpdate(filtrovehiculo, operacion,
        {upsert: true, returnOriginal: true},callback);
            
    
    };       
const eliminar = async (id,callback) =>{
    const filtrovehiculo ={_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('vehiculo').deleteOne(filtrovehiculo,callback);
       
        
}; 
export { queryAllvehicles, crearVehiculo,editarvehiculo,eliminar };
