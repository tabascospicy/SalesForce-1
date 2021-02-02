import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import { Pressable} from 'react-native';
import Context from 'services/context';
import Modal from 'components/Animate/modal';
import Fetch from 'services/fecth';
import Database from 'services/realm';
import moment from 'moment';
import {Caption, DataTable} from 'react-native-paper';
import { Paragraph, Dialog, Portal} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import useTasa from 'Hooks/Tasa/useTasa';
const Container = styled.View`
  flex-grow: 1;
  margin-top: 20px;
  position: relative;
  z-index: 9;
  flex-wrap: wrap;
`;
const Enviar = styled(Pressable)`
  padding: 20px;
  align-self: center;
  background-color: #e05263;
  border-radius: 10px;
  margin-top: auto;
  margin-bottom: 30px;
`;
const EnviarText = styled.Text`
  font-size: 20px;
  color: white;
`;
const Detalles = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
const Info = styled.Text`
  font-size: 20px;
  opacity: 0.8;
  padding: 10px;
`;
const {customRequest} = Database();
const PList = styled.View`
  background-color: white;
  width: 97%;
  border-radius: 12px;
  align-self: center;
  padding: 10px;
  flex-wrap: wrap;
`;
const Client = styled.View`
  background-color: white;
  width: 97%;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 12px;
  align-self: center;
`;
const ClientInfo = styled.Text`
  font-weight: bold;
  font-size: 17px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Total = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  color: white;
  border-radius: 13px;
  align-self: flex-start;
  background-color: #43aa8b;
  margin-top: 10px;
`;
const Checkout = (props: any) => {
  const [modal, setModal] = useState(false);
  const [showPendiente, setPendiente] = useState(false);
  const [carritoPage, setCarritoPage] = useState(0);
  const [message, setMessage] = useState('');
  const {
    usuarioLog,
    carrito,
    cliente,
    isNetworkAvailable,
    descuento,
    total,
    colors,
    getTenant,
    showMensaje
  } = useContext(Context);
  const [tasa,loadingTasa] = useTasa({isNetworkAvailable})
  const mensaje = useMemo(()=>parseInt(descuento?.descuento || "0") === 0 ? "" :`descuento de ${descuento?.descuento}% aplicable hasta el dia ${descuento?.dia_final || 0} despues de ordenado`,[descuento]);
  const from: number = carritoPage *3;
  const to: number = (carritoPage + 1) * 3;
  const showDialog = () => setPendiente(true);

  const hideDialog = () => setPendiente(false);
  const crearPago = async () => {
    
    const detalles = setDetalles(carrito || []);
    const data: PedidosToServer = {
      usuario_id: usuarioLog?.id || 0,
      adm_clientes_id: cliente?.id || 0,
      adm_empresa_id: 1,
      imagen: '',
      fecha_at: new Date().toISOString().substr(0, 10),
      fecha_in: new Date().toISOString().substr(0, 10),
    };
    const dataToLocalDb: IPedidosConDetalles = {
      usuario_id: usuarioLog?.id as number,
      adm_clientes_id: cliente?.id as number ,
      adm_empresa_id: 1,
      rest_estatus_id:3,
      imagen: '',
      detalles: setDetalles(carrito, true),
      fecha: moment(new Date()).format('dddd, MMMM Do, h:mm:ss a'),
      total: total as number,
      fecha_at: new Date().toISOString().substr(0, 10),
      fecha_in: new Date().toISOString().substr(0, 10),
    };
      const state: boolean = isNetworkAvailable ? await isNetworkAvailable() : false;
     try {
      if (state) { 
        
        
        const enviar = JSON.stringify({data, data1:setDetallesServer(carrito)});
        const response = await Fetch(`pedidos`, {method:"POST",tenant:getTenant ? getTenant() : "" }, enviar);  
        const utilData = JSON.parse(response.data).data;
        saveRealizado(
          {
            ...dataToLocalDb,
            id: utilData.id,
            adm_clientes_id: utilData.adm_clientes_id,
            adm_empresa_id: utilData.adm_empresa_id,
          },
          'realizados',
        );
        setMessage('Su pedido ha sido realizado existosamente sera redirigido en breve');
        setTimeout(() => {
          regresar();
        }, 5000);
      } else {
        const PendienteToDb: PedidoPendiente = {
          data: data,
          data1: JSON.stringify(detalles),
          total: total || 0,
          show: dataToLocalDb,
          fecha: moment(new Date()).format('dddd, MMMM Do, h:mm:ss a'),
        };
        savePendiente(PendienteToDb);
        setPendiente(true);
      }
    } catch (e) {
      console.log(e,"error");
      const PendienteToDb: PedidoPendiente = {
        data: data,
          data1: JSON.stringify(detalles),
          total: total || 0,
          show: dataToLocalDb,
          fecha: moment(new Date()).format('dddd, MMMM Do, h:mm:ss a'),
      };
      savePendiente(PendienteToDb);
      setPendiente(true);
    }
  };

  const saveRealizado = (data: IPedidosConDetalles, model: string) => {
    const process = (realm: any) => {
      try {
        const result = realm.create('realizados', data);
      } catch (e) {
        console.log(e);
      }
    };
    customRequest(process);
  };

  const savePendiente = (data: PedidoPendiente) => {
    const process = (realm: any) => {
      try {
        const pendings = realm.objects("pendiente");
        data.id = pendings.length;
        const result = realm.create('pendiente', data);
      } catch (e) { 
        console.log(e);
      }
    };
    customRequest(process);
  };

  const regresar = () => {
    props.navigation.navigate('Clientes');
  };

  const setDetalles = useCallback(
    (productos: Array<Product>, des = false) : DetallesToServer[] => {
      const detalles: Array<DetallesToServer | DetalleConNombre> = productos.map((element) => {
        return des
          ? {
              adm_conceptos_id: element.id,
              cantidad: element.cantidad || 0,
              precio:element.precio_a,
              precio_dolar: element.precio_dolar, 
              iva:0,
              iva_dolar:element.impuesto,
              imagen: '',
              descuento:parseInt(descuento.descuento),
              usuario_id: usuarioLog.id,
              descripcion: element.descripcion,
              nombre: element.nombre,
              fecha_at: new Date().toISOString().substr(0, 10),
              fecha_in: new Date().toISOString().substr(0, 10),
            }
          : {
              adm_conceptos_id: element.id,
              cantidad: element.cantidad || 0, 
              precio_dolar:element.precio_dolar,
              iva:0,
              descuento:parseInt(descuento.descuento),
              iva_dolar:element.impuesto,
              precio:element.precio_a,
              imagen: '',
              usuario_id: usuarioLog.id,
              fecha_at: new Date().toISOString().substr(0, 10),
              fecha_in: new Date().toISOString().substr(0, 10),
            };
      });
      return detalles;
    },
    [carrito],
  );
  const setDetallesServer = useCallback(
    (productos: Array<Product>, des = false) => {
      const deta: Array<DetallesToServer | DetalleConNombre> = productos.map((element) => {
        return des
          ? {
              adm_conceptos_id: element.id,
              cantidad: element.cantidad || 0,
              precio:parseFloat(element.precio_a),
              precio_dolar: parseFloat(element.precio_dolar), 
              iva:0,
              iva_dolar:parseFloat(element.impuesto),
              imagen: '',
              descuento:descuento?.descuento,
              usuario_id: usuarioLog.id,
              descripcion: element.descripcion,
              nombre: element.nombre,
              fecha_at: new Date().toISOString().substr(0, 10),
              fecha_in: new Date().toISOString().substr(0, 10),
            }
          : {
              adm_conceptos_id: element.id,
              cantidad: element.cantidad || 0,
              precio:parseFloat(element.precio_a),
              precio_dolar: parseFloat(element.precio_dolar), 
              iva:0,
              iva_dolar:parseFloat(element.impuesto),
              descuento:parseInt(descuento?.descuento),
              imagen: '',
              usuario_id: usuarioLog.id,
              fecha_at: new Date().toISOString().substr(0, 10),
              fecha_in: new Date().toISOString().substr(0, 10),
            };
      });
      return deta;
    },
    [carrito],
  );
  const handleProcess = () => {
    setModal(true);
    crearPago();
  };
  const checkCredito = ()=>{
    const limite = cliente?.limite_credito ? cliente?.limite_credito: 0;
    const monto = total ? total : 0;
    const avaible = limite <= monto ;
    const title = "Advertencia!";
    const body = "El monto excede el limite de credito disponible para este cliente es posible que su pedido sea eliminado por el gerente";
    if(avaible) showMensaje({visible:true,title,body,render:null});
  }
  useEffect(()=>{
    checkCredito()
  },[])
  
  return (
    <Container>
      <Modal
        height="40"
        width="70"
        show={modal}
        message={message}
        setModal={setModal}
      />
       <Portal>
        <Dialog visible={showPendiente} onDismiss={hideDialog}>
          <Dialog.Title>Su conexion a internet no se encuentra disponible</Dialog.Title>
          <Dialog.Content>
           <Paragraph> su pedido sera guargado Para que pueda enviarlo cuando sea Posible</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
          <Enviar android_ripple={{color: '#e8e5e54d'}} onPress={regresar}>
        <EnviarText>Entendido</EnviarText>
      </Enviar>
          </Dialog.Actions>
        </Dialog>
        </Portal>
      <Client>
        <ClientInfo style={{color:colors["primary-font"]}}>
          Para: <Bold>{cliente && cliente.nombre}</Bold>
        </ClientInfo>
        <ClientInfo style={{color:colors["primary-font"]}}>
          Ubicacion: <Bold>{cliente && cliente.direccion}</Bold>
        </ClientInfo>
      </Client>
      <PList>
        <Info style={{color:colors["primary-font"]}}>Lista de Productos</Info>
      
        <Detalles>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{color:colors["primary-font"]}} >Nombre</DataTable.Title>
              <DataTable.Title style={{color:colors["primary-font"]}} numeric>Precio</DataTable.Title>
              <DataTable.Title style={{color:colors["primary-font"]}} numeric>Descuento</DataTable.Title>
            </DataTable.Header>
            {carrito && carrito.map((element:Product, key: number) => {
              if (from <= key && key < to) {
                return (
                  <DataTable.Row key={key}>
                    <DataTable.Cell style={{color:colors["primary-font"]}}>{element.nombre}</DataTable.Cell>
                    <DataTable.Cell style={{color:colors["primary-font"]}} numeric>
                      {element.precio_dolar} x {element.cantidad}
                    </DataTable.Cell>
                    <DataTable.Cell style={{color:colors["primary-font"]}} numeric>
                      {element.oferta}%
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }
            })}
            <DataTable.Pagination
              page={carritoPage}
              numberOfPages={Math.floor(carrito.length / 3) + 1}
              onPageChange={(page) => {
                setCarritoPage(page);
              }}
              label={` Productos :${carrito.length}`}
            />
          </DataTable>
            <Caption>{mensaje}</Caption>
        </Detalles>
      </PList>
      <Total>Total:{total.toFixed(2)}</Total>
      <Enviar disabled={loadingTasa} android_ripple={{color: '#e8e5e54d'}} onPress={handleProcess}>
        <EnviarText>Enviar</EnviarText>
      </Enviar>
    </Container>
  );
};

export default React.memo(Checkout);
