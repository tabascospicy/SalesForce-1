import React, {useContext} from 'react';
import {StyleSheet, Pressable, Dimensions} from 'react-native';
import Clientes from './Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Producto from './Producto';
import Empresa from './Empresa';
import Context from 'services/context';
import EnviarPago from './EnviarPago';
import {navigationRef} from 'components/RootNavigationRef/RootNavigationRef';
import Checkout from './Checkout';
import Cliente from './Cliente';
import Pedidos from './Pedidos';
import Factura from './Factura';
import ProductList from './ProductList';
import Login from './Login/Login';
import Reload from './ReloadData';
import styled from 'styled-components/native';
import MinifiedList from './MinifiedList';
import Sesion from './Sesion';

export const Toggle = styled(Pressable)`
  height: 100%;
  background-color: black;
  opacity: 0.3;
  width: 20%;
`;
const {height} = Dimensions.get('window');

export const cart = StyleSheet.create({
  cart: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    zIndex: 4,
    elevation: 2,
  },
});
interface NavigatorProps {
  productos:Product[],
  clientes:Cliente[],
  pressed:()=>void,
  isOpen:boolean,
  startAll:()=>void
}
const Stack = createStackNavigator<RouteParamsList>();
const Navigator:React.FC<NavigatorProps> = ({productos, clientes, startAll,pressed,isOpen}) => {
  const routeNameRef = React.useRef('');
  const previousRouteName = React.useRef('');
  const {
    handleSelectedView,
    SesionState,
    VerificarStorage,
    empresa,
  } = useContext(Context);
  const NavigationStateHandler = () =>{
    previousRouteName.current = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute()
      .name;
    handleSelectedView && handleSelectedView(currentRouteName);
    // Save the current route name for later comparision
    if (
      SesionState === 2 &&
      (previousRouteName.current === 'Sesion' ||
        previousRouteName.current === 'Login') &&
      VerificarStorage &&
      VerificarStorage()
    ) {
      previousRouteName.current = 'Clientes';
      navigationRef.current.navigate('Load');
    }
    routeNameRef.current = currentRouteName;
  }
  const CheckStorageAtInit = () =>{
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    if (SesionState === 2 && VerificarStorage && VerificarStorage()) {
      navigationRef.current.navigate('Load');
    }
  }
  
  return (
        <NavigationContainer
          onReady={CheckStorageAtInit}
          ref={navigationRef}
          onStateChange={NavigationStateHandler}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {SesionState === 0 && (
              <Stack.Screen name="Sesion">
                {(props: any) => (
                    <Login {...props} pressed={pressed}></Login>
                )}
              </Stack.Screen>
            )}
            {SesionState === 1 && (
              <Stack.Screen name="Login">
                {(props: any) => <Sesion {...props} pressed={pressed}></Sesion>}
              </Stack.Screen>
            )}
            {SesionState === 2 && (
              <>
                <Stack.Screen name="Clientes">
                  {(props: any) => (
                      <Clientes clientes={clientes} {...props} pressed={pressed}></Clientes>
                  )}
                </Stack.Screen>

                <Stack.Screen name="Load">
                  {(props: any) => (
                    <Reload startAll={startAll} {...props} pressed={pressed}></Reload>
                  )}
                </Stack.Screen>

                <Stack.Screen name="Factura">
                  {(props) => (<Factura {...props}></Factura>)}
                </Stack.Screen>

                <Stack.Screen name="Pedidos">
                  {(props: any) => (
                    <Pedidos startAll={startAll} {...props} pressed={pressed}></Pedidos>
                  )}
                </Stack.Screen>
                <Stack.Screen name="Empresa">
                  {(props: any) => (<Empresa productos={productos} {...props} empresa={empresa} pressed={pressed}></Empresa>
                  )}
                </Stack.Screen>

                <Stack.Screen name="Cliente">
                  {(props: any) => (
                    <Cliente {...props} pressed={pressed}></Cliente>
                  )}
                </Stack.Screen>
                <Stack.Screen name="Pagar">
                  {(props: any) => <EnviarPago {...props}></EnviarPago>}
                </Stack.Screen>
                <Stack.Screen name="Checkout">
                  {(props: any) => <Checkout pressed={pressed} {...props} />}
                </Stack.Screen>
                <Stack.Screen initialParams={{disabled: true}} name="Agregar">
                  {(props: any) => <ProductList pressed={pressed} {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Producto">
                  {(props: any) => <Producto pressed={pressed} {...props} />}
                </Stack.Screen>
                <Stack.Screen name="MinifiedList">
                  {(props: any) => <MinifiedList {...props} />}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
  );
};

export default Navigator;
