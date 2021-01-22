
import Fetch from 'services/fecth/index';
const FecthAbonos  = async (clientId:number,Tenant:string) => {
  try {
    const response = await Fetch(`abono/?tercero=${clientId}`,{method:"GET",tenant:Tenant});
    const result = await JSON.parse(response.data) === "This entity is empty" ? false : await JSON.parse(response.data).data
    return result;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
}

export default {FecthAbonos};