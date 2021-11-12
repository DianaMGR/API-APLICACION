import { getDB } from "../../DB/db.js";
import { ObjectId } from "mongodb";
const queryAllvehicles = async (callback)=>{
    const baseDeDatos = getDB(); 
    await baseDeDatos.collection("venta").find().limit(50).toArray(callback);
};

const consultarventa = async (id, callback)=>{
    const baseDeDatos = getDB(); 
    await baseDeDatos.collection("venta").findOne({ _id: new ObjectId(id) }, callback);
};
const crearventa = async (datosventa, callback) => {
            if(
                Object.keys(datosventa).includes('name') &&
                Object.keys(datosventa).includes('brand') &&
                Object.keys(datosventa).includes('model')
              ){
           const baseDeDatos = getDB();   
          await baseDeDatos.collection('venta').insertOne(datosventa, callback); 
        }else{
                return 'error';
            } 
        };

const editarventa = async (id, editar, callback) =>{
   const filtroventa = { _id: new ObjectId(id) };
    
    const operacion = {
  $set: editar,
        
    };
    const baseDeDatos = getDB();
   await  baseDeDatos.collection('venta').findOneAndUpdate(filtroventa, operacion,
        {upsert: true, returnOriginal: true},callback);
            
    
    };       
const eliminar = async (id,callback) =>{
    const filtroventa ={_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').deleteOne(filtroventa,callback);
       
        
}; 
export { queryAllvehicles, consultarventa,crearventa,editarventa,eliminar };
