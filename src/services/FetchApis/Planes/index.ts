import reactotron from 'reactotron-react-native';
import Fetch from 'services/fecth/index';
const planDefecto = {
  id: 0,
    nombre: "Ninguno disponible",
    dia_inicial: 0,
    dia_final: 0,
    descuento: 0,
}
const FecthPlanes = async (setPercent:any,Tenant:string) => {
  try {
    const response = await Fetch(`planes_pago`,{method:"GET",tenant:Tenant});
    const data = await JSON.parse(response.data);
    setPercent((prev:number)=>prev+5);
    
    const utilData = typeof(data) === "string" ? [planDefecto] : data.data;
   return utilData;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
};
const PlanesApi =  {FecthPlanes} 
export default PlanesApi;