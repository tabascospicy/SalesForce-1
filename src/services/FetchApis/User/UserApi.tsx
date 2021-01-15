
import reactotron from 'reactotron-react-native';
import Fecht,{Login} from 'services/fecth/index';

const FecthUserDataBase = async (Tenant:string) => {
  try {
    const response = await Fecht("usuario", {method:"GET",tenant:Tenant});
    const parsed = JSON.parse(response.data).data;
    return parsed;
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

const LoginRequest = async (Data:LoginData) =>{
  try {
    let enviar  = JSON.stringify({data:Data})
   const response = await Login("/login/correo",enviar,"");
    const parsed = JSON.parse(response.data).data;
    return parsed;
  } catch (error) {
    console.log(error);
    return null;
  }
} 
type auth = {
  user:string,
  password:string
}
const LoginUser = async (Data:auth,Tenant:string) =>{
  try {
    let enviar  = JSON.stringify({data:Data})
   const response = await Login("/login",enviar,Tenant);
    const parsed = JSON.parse(response.data);
    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default {FecthUserDataBase,LoginRequest,LoginUser};
