import reactotron from 'reactotron-react-native';
import Fetch from 'services/fecth/index';
const FechtOfertas  = async (setPercent:any,Tenant:string) => {
  try {
    const response = await Fetch(`ofertas/?status=1`,{method:"GET",tenant:Tenant});
    setPercent((prev:number)=>prev + 15);
    return await JSON.parse(response.data).data;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
}

export default {FechtOfertas};