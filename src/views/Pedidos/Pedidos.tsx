import React, {useContext, useEffect, useRef, useState} from 'react';
import ActionButtons from 'components/NavActionButtons';
import Database from 'services/realm';
import {pedidoDetalles} from 'services/defaultData';
import PedidoDescripcion from 'components/Description/Pedido';
import {Button, Portal} from 'react-native-paper';
import Realizados from 'components/CheckPedidos/Realizados';
import Pendientes from 'components/CheckPedidos/Pendientes';
import Context from 'services/context';
import {
  Content,
  BlueBackground,
  Card,
  GlobalContainer,
  NavButtons,
  Productos,
  Style,
  Title,
} from './styled';
import reactotron from 'reactotron-react-native';
const {customRequest} = Database();
const Pedidos = ({navigation, ...props}: any) => {
  const [pedidos, setPedidos] = useState<IPedidosConDetalles[]>([]);
  const [pendientes, setPendientes] = useState<PedidoPendiente[]>([]);
  const [enEspera,setEnEspera] = useState<IPedidosConDetalles[]>([]);
  const [view, setView] = useState(0);
  const {AskPedidos, isNetworkAvailable, usuarioLog} = useContext(Context);
  const [selectedP, setSelectedP] = useState<IPedidosConDetalles>(
    pedidoDetalles,
  );
  const [showP, setP] = useState<boolean>(false);
  const enter = useRef(false);
  const pend = useRef(false);
  const [visible, setVisible] = useState(false);
  const StatusPedidos = useRef<StatusPedido[]>([{nombre:"",id:0}]);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const readPedidos = (realm: any) => {
    const req :DB.DBmodels = "realizados";
    const req2 :DB.DBmodels = "statusPedido";
    const dbPedidos = realm.objects(req);
    const status = realm.objects(req2);
    const espera = dbPedidos.filtered("rest_estatus_id = 3");
    const facturados = dbPedidos.filtered("rest_estatus_id = 2");
    console.log([...dbPedidos], 'Realizas');
    const readPendientes = realm.objects('pendiente');
    StatusPedidos.current = status;
    setPedidos(facturados);
    setEnEspera(espera);
    setPendientes(readPendientes);
  };

  const LoadPedidos = async () => {
    const connected = isNetworkAvailable ? await isNetworkAvailable() : false;
    if (connected) {
      reactotron.log("apunto de llamar")
      AskPedidos &&
        AskPedidos(usuarioLog.id).then(() => {
          customRequest(readPedidos);
          
        });
    } else {
      customRequest(readPedidos);
    }
  };
  useEffect(() => {
    LoadPedidos();
  }, []);
  useEffect(() => {
    setP(showP);
  }, [selectedP]);

  useEffect(() => {
    if (enter.current === false) {
      customRequest(readPedidos);
      enter.current = true;
      if (isNetworkAvailable && isNetworkAvailable()) {
        reactotron.log(usuarioLog, 'usuario');
        AskPedidos &&
          AskPedidos(usuarioLog?.id || 0).then(() => {
            customRequest(readPedidos);
          });
      }
    }
  }, [pedidos]);

  const select = (element: IPedidosConDetalles, ped = null) => {
    setSelectedP(element);
    pend.current = ped;
    showDialog();
  };

  const toggP = () => {
    setView(1);
  };
  const toggR = () => {
    setView(0);
  };
  const toggE = () => {
    setView(2);
  };
  return (
    <GlobalContainer>
      <BlueBackground
        style={{borderBottomEndRadius: 22, borderBottomStartRadius: 22}}>
        <ActionButtons
          toggle={props.pressed}
          navigation={navigation}
          cart={false}
          {...props}
        />
        <Productos>Pedidos</Productos>
        <NavButtons>
          <Button
            contentStyle={{
              opacity: view === 0 ? 1 : 0.5,
              borderBottomColor: 'white',
              borderBottomWidth: view === 0 ? 3 : 0,
            }}
            color={'white'}
            onPress={toggR}>
            Realizados
          </Button>
          <Button
            contentStyle={{
              opacity: view === 1 ? 1 : 0.5,
              borderBottomColor: 'white',
              borderBottomWidth: view === 1 ? 3 : 0,
            }}
            color={'white'}
            onPress={toggP}>
            Sin Enviar
          </Button>
          <Button
            contentStyle={{
              opacity: view === 2 ? 1 : 0.5,
              borderBottomColor: 'white',
              borderBottomWidth: view === 2 ? 3 : 0,
            }}
            color={'white'}
            onPress={toggE}>
            En Espera
          </Button>
        </NavButtons>
      </BlueBackground>
      <Portal>
        <PedidoDescripcion
          LoadPedidos={LoadPedidos }
          pending={pend}
          visible={visible}
          hideDialog={hideDialog}
          pedido={selectedP}
          view={view}
          status={StatusPedidos.current}
        />
      </Portal>
      <Content>
        {view === 0 && (
          <Card style={Style.shadow}>
            <Title>Pedidos Facturados</Title>
            <Realizados pedidos={pedidos} select={select} status={StatusPedidos.current} />
            
          </Card>
        )}
        {view === 1 && (
          <Card style={Style.shadow}>
            <Title>Pedidos Sin enviar</Title>
            <Pendientes pendientes={pendientes} status={StatusPedidos.current} select={select} />
          </Card>
        )}
        {view === 2 && (
          <Card style={Style.shadow}>
            <Title>Pedidos En Espera</Title>
            <Realizados view={view} pedidos={enEspera}  status={StatusPedidos.current} select={select}  />
          </Card>
        )}
      </Content>
    </GlobalContainer>
  );
};

export default Pedidos;
