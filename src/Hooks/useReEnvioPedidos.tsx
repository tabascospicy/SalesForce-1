import moment from 'moment';
import React, {useContext, useState} from 'react';
import Fetch from 'services/fecth';
import Database from 'services/realm';
import Context from 'services/context';
import Pedido from 'services/FetchApis/Pedidos';
import reactotron from 'reactotron-react-native';
import tenant from 'services/realm/schema/TenantSchema';
import Loading from "components/Animate/Loading";
import { InteractionManager } from 'react-native';
const {customRequest} = Database();
type call = {
  success: boolean | null;
  process: 0 | 1 | 2;
};
type Props = {
  navigation:any
}
const useReEnvioPedidos = ({navigation}:any) => {
  const {isNetworkAvailable,getTenant,showMensaje} = useContext(Context);
  const [success, setSuccess] = useState(false);
  const [calling, setCalling] = useState<call>({success: null, process: 0});
  const [mensaje, setMensaje] = useState("cargando...");
  const [offline,setOffline] = useState(false);
  const [onProcess,setOnProcess] = useState(false);
  const IsLoading = () => <Loading message={mensaje} calling={calling} />
  const DetelePendiente = (data: PedidoPendiente, model: string) => {
    const process = (realm: any) => {
      try {
       
        const result = realm.objects('pendiente');
        const pedido = result.filtered(`id = ${data.id}`);
        realm.delete(pedido);
      } catch (e) {
        console.log(e);
      }
    };
    customRequest(process);
  };
  const deleteFromDB = async (id: number) => {
    const searchAndDelete = async (realm: Realm) => {
      try {
        const model: DB.models = 'realizados';
        const pedido = realm.objects(model).filtered(`id = ${id}`);
     
        realm.delete(pedido);
      } catch (e) {
        console.log(e);
      }
    };
    customRequest(searchAndDelete);
  };
  const cancelar = async (id: number) => {
    try {

      const state = isNetworkAvailable ? isNetworkAvailable() : false;
      if(state){
          showMensaje({title:"Enviando Solicitud",body:"",render:IsLoading,visible:true})
          setCalling({success: null, process: 1});
          const T = getTenant ? getTenant() :"";
          const response = await Pedido.DeletePedido(id, T);
          setOnProcess(true);
          setCalling({success: true, process: 2});
          navigation.navigate("Pedidos");
          showMensaje({title:"Finalizado!",body:"el pedido ha sido cancelado",render:null,visible:true,  lock:true});
          InteractionManager.runAfterInteractions(async ()=>{
             await deleteFromDB(id);
          });
          setOnProcess(false);
         
      }else{
        setOffline(true);
      }
    
    } catch (error) {
      setMensaje("hubo un error");
      setCalling({success: false, process: 2});
      console.log(error);
      return 'error';
    }
  };
  const saveRealizado = (data: any, model: string) => {
    const process = (realm: any) => {
      try {
        const result = realm.create('realizados', data);
      } catch (e) {
        console.log(e);
      }
    };
    customRequest(process);
  };

  const SendPedidoPendiente = async (data: PedidoPendiente) => {
    try {
      const state = isNetworkAvailable ? isNetworkAvailable() : false;
      if (state) {
        setMensaje("cargando");
        setCalling({success: null, process: 1});
        showMensaje({title:"Enviando Solicitud",body:"",render:IsLoading,visible:true});
        const dataToLocalDb: IPedidosConDetalles = {
          usuario_id: data.data.usuario_id,
          adm_clientes_id: data.data.adm_clientes_id,
          adm_empresa_id: 1,
          imagen: '',
          detalles: JSON.parse(data.data1 as string),
          fecha: moment(new Date()).format('dddd, MMMM Do, h:mm:ss a'),
          total: data.total,
          fecha_at: new Date().toISOString().substr(0, 10),
          fecha_in: new Date().toISOString().substr(0, 10),
        };
        const envio: PedidosToServer = {
          usuario_id: data.data.usuario_id,
          adm_clientes_id: data.data.adm_clientes_id,
          adm_empresa_id: 1,
          imagen: '',
          fecha_at: new Date().toISOString().substr(0, 10),
          fecha_in: new Date().toISOString().substr(0, 10),
        };
        const enviar = JSON.stringify({data: envio, data1: data.data1});
        const T = getTenant ? getTenant() :"";
        const response = await Fetch(
          `pedidos`,
          {method: 'POST', tenant: T},
          enviar,
        );
        const utilData = JSON.parse(response.data) as PedidosToServer;
        saveRealizado(
          {
            ...dataToLocalDb,
            id: utilData.id as number,
            adm_clientes_id: utilData.adm_clientes_id as number,
            adm_empresa_id: utilData.adm_empresa_id,
          },
          'realizados',
        );
        navigation.navigate("Pedidos");
        setOnProcess(true);
        setMensaje("su solocitud ha sido procesada exitosamente");
        setCalling({success: true, process: 2});
         await DetelePendiente(data, '');
        setOnProcess(false);
      } else {
        setOffline(true);
        
        setCalling({success: false, process: 2});
        setSuccess(false);
      }
    } catch (e) {
      setMensaje("hubo un error");
      console.log(e);
    }
  };
  return {
    success,
    setSuccess,
    SendPedidoPendiente,
    calling,
    setCalling,
    offline,
    cancelar,
    onProcess
  };
};
export default useReEnvioPedidos;
