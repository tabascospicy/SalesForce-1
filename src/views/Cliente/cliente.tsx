import React, {useContext, useEffect, useRef, useState} from 'react';
import Description from 'components/Description';
import ActionButtons from 'components/NavActionButtons';
import Context from 'services/context';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import DataBase from 'services/realm';
import {BlueBackground, Content, GlobalContainer} from './styles';
import Facturas from './Facturas';
const {customRequest} = DataBase();
import useOnView from 'Hooks/onView';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import ClientDescription from 'views/Cliente/Data';
import {StackNavigationProp} from '@react-navigation/stack';

type ProfileScreenNavigationProp = StackNavigationProp<RouteParamsList,"Cliente">;
interface PropsClienteScreen {
  navigation: ProfileScreenNavigationProp;
  route: any;
}
const {readAll} = DataBase();
const Cliente = ({navigation, route, ...props}: PropsClienteScreen) => {
  const {cliente, resetCarrito, colors, handleDescuento} = useContext(Context);
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const tipos = useRef<TipoFactura[]>([{inicial: '', id: 0, nombre: ''}]);
  const [isCreditNotAvaible, setCredito] = useState<boolean>(false);
  const [payments, setPayments] = useState({
    descuento: '',
    method: '',
    index: 0,
  });
  const [plan, setPlan] = useState<PlanPago[]>([]);
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const readPlanes = (realm: Realm) => {
    try {
      const planes: PlanPago[] = realm.objects<PlanPago[]>('planes_pago');
      setPlan(planes);
    } catch (e) {
      console.log(e, 'error');
    }
  };
  const onInit = () => {
    resetCarrito && resetCarrito();
    customRequest(readPlanes);
    readFacturas();
  };
  const callback = () => {
 //   setFacturas([]);
  };
  const {isOnView} = useOnView({onInit, callback, navigation});
  useEffect(() => {
    isOnView && checkDeuda();
  }, [facturas]);

  const checkDeuda = () => {
    let deuda = 0;
    if (facturas.reduce) {
      deuda = facturas.reduce((i, current, acum) => {
        const monto =
          parseInt(current.subtotal_dolar || '0') -
          parseInt(current.abono_dolar || '0');
        return monto + acum;
      }, 0);
    } else {
      deuda = 0;
    }

    const limite = cliente?.limite_credito || 0;

    setCredito(!(deuda <= limite));
  };
  const nav = () => {
    if (payments.method === '') {
      handleDescuento && handleDescuento({descuento:"0",dia_inicial:0,dia_final:0,nombre:"",id:0})
    } 
      navigation.navigate('Agregar',{disabled:false});
  };

  const readFacturas = async () => {
    const result = await readAll('factura', `adm_clientes_id = ${cliente.id}`);
    const dbtipos = await readAll('TFactura');
    tipos.current = dbtipos;
    setFacturas(result);
  };

  return (
    <GlobalContainer>
      <BlueBackground>
        <ActionButtons relo navigation={navigation} cart={false} {...props} />
        <Description cliente={cliente} />
      </BlueBackground>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{color: colors.ButtonStrong}}>
            Campo Vacio
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Uno o mas campos estan vacios Por favor verifique antes de
              continuar
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Hecho</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Content>
        <Tab.Navigator
          initialRouteName="Descriptíon"
          tabBarPosition="top"

          tabBarOptions={{
            indicatorStyle:{backgroundColor:colors.secondary},
            activeTintColor: colors.secondary,
            pressColor:colors.secondary,
            labelStyle: {
              fontSize: 11,
              fontWeight: 'bold',
            },
          }}>
          <Tab.Screen name="Descripción">
            {(props) => (
              <ClientDescription
                isCreditNotAvaible={isCreditNotAvaible}
                handleDescuento={handleDescuento}
                setPayments={setPayments}
                payments={payments}
                cliente={cliente}
                nav={nav}
                plan={plan}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Facturas Pendientes">
            {(props) =>
              isOnView ? (
                <Facturas
                  {...{isOnView,facturas, tipos: tipos.current, navigation, route}}
                />
              ) : (
                <></>
              )
            }
          </Tab.Screen>
        </Tab.Navigator>
      </Content>
    </GlobalContainer>
  );
};
export default React.memo(Cliente);
