import moment from 'moment';
import React, {useContext, useState} from 'react';
import Fetch from 'services/fecth';
import Database from 'services/realm';
import Context from 'services/context';
import Pedido from 'services/FetchApis/Pedidos';
import reactotron from 'reactotron-react-native';
import tenant from 'services/realm/schema/TenantSchema';
const {customRequest, readAll} = Database();
type call = {
  success: boolean | null;
  process: 0 | 1 | 2;
};
const useReEnvioPedidos = () => {
  const {isNetworkAvailable,getTenant} = useContext(Context);
  const [success, setSuccess] = useState(false);
  const [calling, setCalling] = useState<call>({success: null, process: 0});
  const [offline,setOffline] = useState(false);
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
      } catch (e) {}
    };
    customRequest(searchAndDelete);
  };
  const cancelar = async (id: number) => {
    try {

      const state = isNetworkAvailable ? isNetworkAvailable() : false;
      if(state){
          setCalling({success: null, process: 1});
          const T = getTenant ? getTenant() :"";
          const response = await Pedido.DeletePedido(id, T);
          deleteFromDB(id);
          setCalling({success: true, process: 2});
          reactotron?.log && reactotron.log(response, 'borrado we');
      }else{
        setOffline(true);
      }
    
    } catch (error) {
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
        setCalling({success: null, process: 1});
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
        DetelePendiente(data, '');
        setSuccess(true);
        setCalling({success: true, process: 2});
      } else {
        setOffline(true);
        setCalling({success: false, process: 2});
        setSuccess(false);
      }
    } catch (e) {
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
  };
};
export default useReEnvioPedidos;
