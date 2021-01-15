

import Fetch from 'services/fecth/index';
const planDefecto = {
  id: 0,
    nombre: "Ninguno disponible",
   inicial:"N"
}
const FecthTiposFacturas = async (setPercent:any,Tenant:string) => {
  try {
    const response = await Fetch(`factura/tipos`,{method:"GET",tenant:Tenant});
    const data = await JSON.parse(response.data);
    setPercent((prev:number)=>prev+5);
    const utilData = typeof(data) === "string" ? [planDefecto] : data.data;
   return utilData;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
};
const TiposFacturasApi =  {FecthTiposFacturas} 
export default TiposFacturasApi;