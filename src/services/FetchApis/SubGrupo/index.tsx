import Fetch from "services/fecth";
const defaultValue = {
  id: 0,
    adm_grupos_id: 0,
    nombre: 'todos',
    visualizar: 0,
    posicion: 0,
    imagen: '',
}
const FetchSubGrupos = async (setPercent:any,Tenant:string) => {
  try {
    const response = await Fetch(`subgrupos`,{method:"GET",tenant:Tenant});
   const data = await JSON.parse(response.data).data;
   setPercent((prev:number)=>prev+5);
   const utildata = typeof(data) === "undefined" ? [defaultValue] : data;
   return utildata;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
};

export default {FetchSubGrupos};