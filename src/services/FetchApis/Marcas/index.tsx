import Fetch from "services/fecth";

const FetchMarcas = async (setPercent:any,Tenant:string) => {
  try {
    const response = await Fetch(`marcas`,{method:"GET",tenant:Tenant});
    setPercent((prev:number)=>prev+5);
   return await JSON.parse(response.data).data
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
};

export default {FetchMarcas};