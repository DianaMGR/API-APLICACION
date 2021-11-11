import { getDB } from "../../DB/db.js";

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
           baseDeDatos.collection('vehiculo').insertOne(datosvehiculo, callback); 
        }else{
                return 'error';
            } 
        };
export { queryAllvehicles, crearVehiculo };
