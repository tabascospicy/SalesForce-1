import Fetch from "services/fecth";
const defaultValue = {
  id: 0,
  nombre: 'TODOS',
  porcentaje:0
}
const FetchIva = async (setPercent:any,Tenant:string) => {
  try {
    const response = await Fetch(`iva`,{method:"GET",tenant:Tenant});
    const data = await JSON.parse(response.data).data;
    setPercent((prev:number)=>prev+10);
    const utildata = typeof(data) === "undefined" ? [defaultValue] : data;
    return utildata;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
};

export default {FetchIva};