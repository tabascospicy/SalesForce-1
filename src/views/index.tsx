import React, {useContext, useEffect, useState} from 'react';
import SideMenu from 'components/Sidemenu';
import {StyleSheet, Pressable, Dimensions} from 'react-native';
import Clientes from './Home';
import useGrowAnimation from 'Hooks/useGrowAnimation';
import Animated from 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Mensaje from "components/Modal/Mensaje";;
import Producto from './Producto';
import Empresa from './Empresa';
import Context from 'services/context';
import EnviarPago from "./EnviarPago"
import {navigationRef} from 'components/RootNavigationRef/RootNavigationRef';
import Checkout from './Checkout';
import Cliente from './Cliente';
import Pedidos from './Pedidos';
import Factura from "./Factura"
import ProductList from './ProductList';
import Login from './Login/Login';
import Reload from './ReloadData';
import styled from 'styled-components/native';
import MinifiedList from './MinifiedList';
import Sesion from './Sesion';
import Cart from 'components/Cart/Cart';
const Styles = StyleSheet.create({
  viewsContainer: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'white',
    top: 0,
    height: '100%',
    width: '100%',
    //  alignItems:"center",
  },
});
export const Toggle = styled(Pressable)`
  height: 100%;
  background-color: black;
  opacity: 0.3;
  width: 20%;
`;
const {height} = Dimensions.get('window');
const Regresar = styled.View`
  z-index: ${(props) => (props.isOpen ? 8 : 1)};
  height: 47%;
  width: 35%;
  position: absolute;
  right: 0px;
  top: ${height / 4 +20}px;
  background-color:white;
  opacity:0.1;
`;
export const cart = StyleSheet.create({
  cart: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    zIndex: 4,
    elevation:2
  },
});

const Stack = createStackNavigator<RouteParamsList>();
const index = ({productos, clientes, startAll}: any) => {
  const routeNameRef = React.useRef("");
  const previousRouteName = React.useRef("");
  const {pressed, transform, isOpen} = useGrowAnimation();
  const {handleSelectedView, SesionState,VerificarStorage,empresa,showQr,transformCarrito,toggleCarrito} = useContext(Context);
  return (
    < >
      <SideMenu pressed={pressed} />
      <Regresar isOpen={isOpen}>
        <Pressable
          style={{flex: 1}}
          onPress={() => pressed('menu')}></Pressable>
      </Regresar>
      <Animated.View style={{...Styles.viewsContainer, transform,}}>
      <Animated.View style={{...cart.cart, transform:transformCarrito}}>
        <Toggle onPress={toggleCarrito} />
        <Cart pressed={toggleCarrito} navigation={ navigationRef.current} showQr={showQr} />
      </Animated.View>
      <Mensaje />
        <NavigationContainer
          onReady={() => {
             (routeNameRef.current = navigationRef.current.getCurrentRoute().name);
            if(SesionState===2 && VerificarStorage && VerificarStorage()
            ){
              navigationRef.current.navigate("Load")
            }
          }}
          ref={navigationRef}
          onStateChange={() => {
             previousRouteName.current = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute()
              .name;
             handleSelectedView &&  handleSelectedView(currentRouteName);
            // Save the current route name for later comparision
            if(SesionState === 2 && (previousRouteName.current === "Sesion" ||previousRouteName.current ==="Login") && VerificarStorage() ){
              previousRouteName.current = "Clientes"
              navigationRef.current.navigate("Load")
            }
            routeNameRef.current = currentRouteName;
          }}>
          <Stack.Navigator screenOptions={{headerShown: false}}> 
            {SesionState === 0 && (
              <Stack.Screen name="Sesion">
               
                {(props: any) => <Login {...props} pressed={pressed}></Login>}
                
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
                    <Clientes
                      clientes={clientes}
                      {...props}
                      pressed={pressed}></Clientes>
                  )}
                </Stack.Screen>
                <Stack.Screen name="Load">
                  {(props: any) => (
                    <Reload
                      startAll={startAll}
                      {...props}
                      pressed={pressed}></Reload>
                  )}
                </Stack.Screen>
                <Stack.Screen name="Factura">
                  {(props) => (
                    <Factura {...props} ></Factura>
                  )}
                </Stack.Screen>
                <Stack.Screen name="Pedidos">
                  {(props: any) => (
                    <Pedidos
                      startAll={startAll}
                      {...props}
                      pressed={pressed}></Pedidos>
                  )}
                </Stack.Screen>
                <Stack.Screen name="Empresa">
                  {(props: any) => (
                    <Empresa
                      productos={productos}
                      {...props}
                      empresa={empresa}
                      pressed={pressed}></Empresa>
                  )}
                </Stack.Screen>

                <Stack.Screen name="Cliente">
                  {(props: any) => (
                    <Cliente {...props} pressed={pressed}></Cliente>
                  )}
                </Stack.Screen>
                <Stack.Screen name="Pagar">
                  {(props: any) => (
                    <EnviarPago {...props} ></EnviarPago>
                  )}
                </Stack.Screen>
                <Stack.Screen name="Checkout">
                  {(props: any) => <Checkout pressed={pressed} {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Agregar">
                  {(props: any) => <ProductList pressed={pressed} {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Producto"  >
                  {(props: any) => <Producto pressed={pressed} {...props} />}
                </Stack.Screen>
                <Stack.Screen name="MinifiedList">
                  {(props: any) => <MinifiedList {...props} />}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        
      </Animated.View>
    </>
  );
};

export default index;
