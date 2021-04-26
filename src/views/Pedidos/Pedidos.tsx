import React, {useContext, useEffect, useRef, useState} from 'react';
import ActionButtons from 'components/NavActionButtons';
import Database from 'services/realm';
import {pedidoDetalles} from 'services/defaultData';
import {Button, Portal} from 'react-native-paper';
import Realizados from './Realizados';
import Pendientes from './Pendientes';
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
import useReEnvioPedidos from 'Hooks/useReEnvioPedidos';
import {InteractionManager} from 'react-native';
const {customRequest} = Database();
const Pedidos = ({navigation, ...props}: any) => {
  const [pedidos, setPedidos] = useState<IPedidosConDetalles[]>([]);
  const [pendientes, setPendientes] = useState<PedidoPendiente[]>([]);
  const [enEspera, setEnEspera] = useState<IPedidosConDetalles[]>([]);
  const [view, setView] = useState(0);
  const {SendPedidoPendiente, cancelar,onProcess} = useReEnvioPedidos({navigation});
  const {
    AskPedidos,
    isNetworkAvailable,
    usuarioLog,
    showMensaje,
    handleSelectedFactura,
    handleButtonActionFactura,
  } = useContext(Context);
  const [selectedP, setSelectedP] = useState<IPedidosConDetalles>(
    pedidoDetalles,
  );
  const [showP, setP] = useState<boolean>(false);
  const enter = useRef(false);
  const pend = useRef(false);
  const [visible, setVisible] = useState(false);
  const StatusPedidos = useRef<StatusPedido[]>([{nombre: '', id: 0}]);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const readPedidos = (realm: any) => {
    const req: DB.models = 'realizados';
    const req2: DB.models = 'statusPedido';
    const dbPedidos = realm.objects(req);
    const status = realm.objects(req2);
    const espera = dbPedidos.filtered('rest_estatus_id = 3');
    const facturados = dbPedidos;
    const readPendientes = realm.objects('pendiente');
    StatusPedidos.current = status;
    setPedidos(facturados);
    setEnEspera(espera);
    setPendientes(readPendientes);
  };

  const LoadPedidos = async () => {
    const connected = isNetworkAvailable ? await isNetworkAvailable() : false;
    if (connected) {
      reactotron.log('apunto de llamar');
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
      
        AskPedidos &&
          AskPedidos(usuarioLog?.id || 0).then(() => {
            customRequest(readPedidos);
          });
      }
    }
  }, [pedidos]);
  const selectEnviado = (element: IPedidosConDetalles) => {
    const Cancelar = () => (
      <Button onPress={() => cancelar(element.id as number)}>Cancelar</Button>
    );
    configureDataAndJump(element, Cancelar);
  };
  const configureDataAndJump = (
    element: IPedidosConDetalles,
    boton: React.FC,
  ) => {
    handleSelectedFactura && handleSelectedFactura(element);
    handleButtonActionFactura && handleButtonActionFactura({action: boton});
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('Factura', {
        name: 'Pedidos',
        detalle: `Realizado el ${element.fecha_at}`,
        total: element.total,
      });
    });
  };
  const selectPendiente = (element: PedidoPendiente) => {
    const Enviar = () => (
      <Button onPress={() => SendPedidoPendiente(element)}>Enviar</Button>
    );
    configureDataAndJump(element.show, Enviar);
  };

  const toggP = () => {
    setView(1);
  };
  const toggR = () => {
    setView(0);
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
        </NavButtons>
      </BlueBackground>
      <Content>
        {view === 0 && (
          <Card style={Style.shadow}>
            <Title>Enviados</Title>
            {!onProcess && <Realizados
              {...{showMensaje, select: selectEnviado}}
              pedidos={pedidos}
              status={StatusPedidos.current}
            />}
          </Card>
        )}
        {view === 1 && (
          <Card style={Style.shadow}>
            <Title>Sin enviar</Title>
            {!onProcess && <Pendientes
              pendientes={pendientes}
              status={StatusPedidos.current}
              select={selectPendiente}
            /> }
          
          </Card>
        )}
      </Content>
    </GlobalContainer>
  );
};

export default React.memo(Pedidos);
