import reactotron from 'reactotron-react-native';
import Fetch from 'services/fecth/index';
const FetchPedidosUsuario = async (id: number,Tenant:string) => {
  try {
    const response = await Fetch(`usuario/${id}/pedidos`,{method:"GET",tenant:Tenant});
    reactotron.log("pidio",JSON.parse(response.data),response);
    return await JSON.parse(response.data).data
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
};

const DeletePedido = async (id:number,Tenant:string) =>{
  try {
    const response = await Fetch(`pedidos/${id}`,{method:"DELETE",tenant:Tenant});
    return response;
    } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
}
const ActualizarPedido = async (id:number,status:number) =>{

  try{
      const data = {
    rest_estatus_id:status
  }
  const response = await Fetch(`pedidos/${id}`,{method:"DELETE",tenant:Tenant},{data});
  reactotron.log(response,"actualizado")
  return true
  }catch(e){
    reactotron.log(e);
  }

}
const FechtStatusPedidos = async (Tenant:string):Promise<StatusPedido[] | string> =>{
  try {
    const response = await Fetch(`pedidos/stats`,{method:"GET",tenant:Tenant});
    return await JSON.parse(response.data).stats as StatusPedido[]
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
}
const PedidosApi =  {FetchPedidosUsuario,FechtStatusPedidos,DeletePedido,ActualizarPedido } 
export default PedidosApi;