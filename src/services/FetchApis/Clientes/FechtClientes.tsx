import Fetch from 'services/fecth/index';
import {enviar} from "./../helper";

const FetchClientes = async (Tenant:string) => {
  try {
    const response = await Fetch(`clientes`,{method:"GET",tenant:Tenant});
   return await JSON.parse(response.data).data
  } catch (e) {
    return 'hubo un error';
  }
};
const GetZonas = async (Tenant:string) =>{
  try {
     const lol = await enviar(Tenant,{},"zona","GET");
   return lol;
  }
  catch (e){
    console.log(e,"zonaaas");
    return "";
  }

}
export default {FetchClientes,GetZonas};
