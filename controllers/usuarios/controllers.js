import { getDB } from "../../DB/db.js";
import { ObjectId } from "mongodb";



const queryAllUsers = async (callback)=>{
    const baseDeDatos = getDB(); 
    console.log('query');
    await baseDeDatos.collection("usuario").find().limit(50).toArray(callback);
};

const consultarusuario = async (id, callback)=>{
    const baseDeDatos = getDB(); 
    await baseDeDatos.collection("usuario").findOne({ _id: new ObjectId(id) }, callback);
};
const crearusuario = async (datosusuario, callback) => {
          const baseDeDatos = getDB();   
          await baseDeDatos.collection('usuario').insertOne(datosusuario, callback); 
         
        };

const editarusuario = async (id, editar, callback) =>{
   const filtrousuario = { _id: new ObjectId(id) };
    
    const operacion = {
  $set: editar,
        
    };
    const baseDeDatos = getDB();
   await  baseDeDatos.collection('usuario').findOneAndUpdate(filtrousuario, operacion,
        {upsert: true, returnOriginal: true},callback);
            
    
    };       
const eliminar = async (id,callback) =>{
    const filtrousuario ={_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').deleteOne(filtrousuario,callback);
       
        
}; 
export { queryAllUsers, consultarusuario,crearusuario,editarusuario,eliminar };