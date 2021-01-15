import Fetch from 'services/fecth/index';
const FetchBanco = async (Tenant:string) => {
  try {
    const response = await Fetch(`entidad`,{method:"GET",tenant:Tenant});
   return await JSON.parse(response.data).data
  } catch (e) {
    return 'hubo un error';
  }
};
const FetchBancosEmpresa = async (Tenant:string) => {
  try {
    const response = await Fetch(`banco`,{method:"GET",tenant:Tenant});
   return await JSON.parse(response.data).data
  } catch (e) {
    return 'hubo un error';
  }
};
export default {FetchBanco};