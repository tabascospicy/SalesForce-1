import React, {useContext, useEffect, useRef, useState} from 'react';

import Context from 'services/context';
import {
  Button,
  Caption,
  DataTable,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import Database from 'services/realm';
import Pagos from 'services/FetchApis/Pagos';
import accounting from 'accounting';
import AdjuntarPago from './AdjuntarPago';
import useLoading from 'Hooks/Loading';
import {
  Client,
  Bold,
  ClientInfo,
  Container,
  Detalles,
  Del,
  DelText,
  Info,
  PList,
  Total,
  Client2,
ClientInfo2,
ClientSubtitle,
} from './styles';

import {InteractionManager, View} from 'react-native';
import { Checkbox } from 'react-native-paper';

type ProfileScreenNavigationProp = StackNavigationProp<
  RouteParamsList,
  'Pagar'
>;
type Params = RouteProp<RouteParamsList, 'Pagar'>;
type PagarProps = {
  navigation: ProfileScreenNavigationProp;
  route: Params;
};

type pago =
  | 'TRANSFERENCIA'
  | 'TARJETA DE DEBITO'
  | 'TARJETA DE CREDITO'
  | 'DIVISA';

type NameParameter = keyof enviarInpustValues;
const format = {
  symbol: '$',
  thousand: '.',
  decimal: ',',
  precision: 2,
}
const {readAll} = Database();
const Pagar: React.FC<PagarProps> = ({navigation, route}) => {
  const {factura} = route.params;
  const total = useRef(0);
  const {cliente, showMensaje, hideMensaje, getTenant,colors,handlePagos} = useContext(Context);
  const objetivoPagar = parseInt(factura.subtotal_dolar);
  const [pagos, setPagos] = useState<enviarInpustValues[]>([]);
  const [PagoPage, setPagoPage] = useState(0);
  const [tasa, setTasa] = useState('');
  const [empBancos, setEmpBancos] = useState([]);
  const pagoTemplate = useRef<enviarInpustValues>({});
  const from: number = PagoPage * 6;
  const to: number = (PagoPage + 1) * 6;
  const selectedBorrar = useRef(0);
  const [tiposDisponibles, setTiposDisponibles] = useState<TipoPago[]>([]);
  const [bancos, setBancos] = useState<Banco[]>([]);
  const [isAbono,setAbono] = useState<boolean>(false);

  const send = (x: any) => {
    const convertir =
      pagoTemplate.current.moneda.includes("Bs")
        ? parseFloat(pagoTemplate.current.monto) / parseFloat(tasa)
        : parseFloat(pagoTemplate.current.monto);
    const isNotValid = convertir + total.current > objetivoPagar;
    const referencia = pagoTemplate.current?.referencia && pagoTemplate.current?.referencia.length
    
    if (isNotValid && !isAbono || referencia < 6) {
      InteractionManager.runAfterInteractions(() => {
        showMensaje({
          visible: true,
          title: '',
          body: 'ha ingresado un monto mayor al pago o una referencia invalida',
          render: SumarPago,
          actions: ActionsModal,
        });
      });
      return;
    }else{
      showMensaje({visible: false, body: '', title: '', render: null});
    }
    total.current += convertir;
//    console.log({total:convertir,pago:pagoTemplate.current})
    setPagos([...pagos, pagoTemplate.current]);
    pagoTemplate.current = {};
  };

  const Cargando = () => (
    <>
      <ActivityIndicator animating={true} color={Colors.red800} />
    </>
  );

  const reqTasa = async () => {
    try {
      const tasas = await Pagos.FechtTasa(getTenant() || '');
      const ban = await Pagos.FechtBancos(getTenant() || '');
      setEmpBancos(ban);

      setTasa(tasas[0].tasa);
    } catch (e) {
      setTasa('');
      console.log(e, 'tasa');
    }
  };
  const [handleLoadTasa, loadingTasa] = useLoading(reqTasa);
  const SumarPago = () => (
    <AdjuntarPago
      guardar={guardar}
      bancos={bancos}
      empBancos={empBancos}
      restanteDolar={accounting.formatMoney(objetivoPagar - total.current,format) }
      restanteBs={accounting.formatMoney((objetivoPagar - total.current)* parseInt(tasa),{...format,symbol:""})}
      tiposDisponibles={tiposDisponibles}
    />
  );
  const ActionsModal = () => (
    <>
      <Button onPress={hideMensaje}>Cancelar</Button>
      <Button disabled={tasa === ''} onPress={send} labelStyle={{color:"white"}} mode="contained">
        Agregar Pago
      </Button>
    </>
  );
  const BorrarModal = () => (
    <>
      <Button onPress={hideMensaje}>Cancelar</Button>
      <Button disabled={tasa === ''} onPress={borrar} mode="contained">
        Borrar
      </Button>
    </>
  );
  const borrar = () => {
    const filtrados = pagos.filter(
      (element, index) => index !== selectedBorrar.current,
    );
    const monto = pagos[selectedBorrar.current].moneda === "USD" ? parseFloat(pagos[selectedBorrar.current].monto) : parseFloat(pagos[selectedBorrar.current].monto) / parseFloat(tasa);
    total.current -= monto;
    showMensaje({visible: false, title: 'A', body: '', render: null});
    setPagos(filtrados);
  };

  const setBorrarModal = (i: number) => {
    showMensaje({
      visible: true,
      title: 'Advertencia',
      body: 'esta seguro que desea borrar este pago?',
      render: null,
      actions: BorrarModal,
    });
    selectedBorrar.current = i;
  };
  const ShowModal = () => {
    let title = 'Agregar pago';
    let body = '';
    showMensaje({
      visible: true,
      title,
      body,
      render: SumarPago,
      actions: ActionsModal,
    });
  };
  const guardar = (name: NameParameter, value: string | number) => {

    pagoTemplate.current[name] = value;
  };
  const readTipos = async () => {
    const tipos = ((await readAll('TipoPago')) as unknown) as TipoPago[];
    const bancos = ((await readAll('Banco')) as unknown) as Banco[];
    setTiposDisponibles(tipos);
    setBancos(bancos);
  };

  const EnviarConfirmado = async () => {
    try {
      showMensaje({
        visible: true,
        body: '',
        title: 'Enviando',
        render: Cargando,
        actions: Cargando,
      });
 
      const response = await Pagos.Pagar(
        getTenant(),
        pagos,
        factura,
        cliente,
        tasa,
        {isAbono,total:total.current}
      );
      handlePagos(pagos);
      requestAnimationFrame(() => {
        showMensaje({
          visible: true,
          body: 'Enviado satisfactoriamente',
          title: 'Exito',
          render: null,
        });
        setTimeout(() => {
          navigation.navigate('Cliente');
        }, 2000);
      });
    } catch (error) {
      console.log(error);
    
      showMensaje({
        visible: true,
        title: 'Disculpe!',
        body: 'Pareceque ha habido un error en el envio de los datos',
        render: null,
      });
    }
  };

  useEffect(() => {
    readTipos();
    handleLoadTasa('');
  }, []);

 
  return (
    <Container>
      <Client2>
        <ClientSubtitle style={{color:colors["primary-font"]}}>
          Para: 
        </ClientSubtitle>
        <ClientInfo2 style={{color:colors["primary-font"]}}>
          <Bold>{cliente && cliente.nombre}</Bold>
        </ClientInfo2>
        <ClientSubtitle style={{color:colors["primary-font"]}}>
          <Bold>{cliente && cliente.direccion}</Bold>
        </ClientSubtitle>
      </Client2>
      <PList>
        <Info>Lista de Pagos</Info>
        
        <Detalles>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Monto</DataTable.Title>
              <DataTable.Title>Moneda</DataTable.Title>
              <DataTable.Title numeric>Metodo</DataTable.Title>
              <DataTable.Title numeric>{''}</DataTable.Title>
            </DataTable.Header>
            {pagos &&
              pagos.map((element, key: number) => {
                if (from <= key && key < to) {
                  return (
                    <DataTable.Row key={key}>
                      <DataTable.Cell>
                        {accounting.formatMoney(element.monto, {
                          symbol: '',
                          thousand: '.',
                          decimal: ',',
                          precision: 2,
                        })}
                      </DataTable.Cell>
                      <DataTable.Cell>{element.moneda.split('_')[0]}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {element.adm_tipo_pago_id.split('_')[0]}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <Del onPress={() => setBorrarModal(key)}>
                          <DelText>X</DelText>
                        </Del>
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                }
              })}
            <DataTable.Pagination
              page={PagoPage}
              numberOfPages={Math.floor(pagos.length / 6) + 1}
              onPageChange={(page) => {
                setPagoPage(page);
              }}
              label={`  total:${total.current.toFixed(2)}$  restante:${accounting.formatMoney(objetivoPagar - total.current ,format )}`}
            />
          </DataTable>
          <Caption>
            tasa :
            {accounting.formatMoney(tasa, {
              symbol: 'Bs',
              thousand: '.',
              decimal: ',',
              precision: 2,
            })}
            Bs
          </Caption>
          {loadingTasa ? (
            <ActivityIndicator animating={loadingTasa} color={Colors.red800} />
          ) : (
            <Button
              disabled={tasa === '' || empBancos === []}
              onPress={ShowModal}
              style={{width:"100%"}}
              labelStyle={{color:"white"}}
              mode="contained">
              + Agregar Pago
            </Button>
          )}
        </Detalles>
      </PList>
      <Total>Total a pagar :{
         accounting.formatMoney(objetivoPagar, {
          symbol: '$',
          thousand: '.',
          decimal: ',',
          precision: 2,
        })
      }</Total>
      
        <Button
          mode={'contained'}
          labelStyle={{color:"white",marginTop:20}}
          disabled={objetivoPagar > (Math.ceil(total.current))}
          onPress={EnviarConfirmado}
          style={{marginBottom: 10, height: 70,borderRadius:38,marginTop: 'auto'}}>
          Enviar
        </Button>
     
    </Container>
  );
};

export default Pagar;
