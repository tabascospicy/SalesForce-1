
import React, { useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Todos from './todos';
import Busqueda from "./Busqueda";
const Tab = createMaterialTopTabNavigator();
const ProductNavigator = () => {
  
  return (
      <Tab.Navigator
        initialRouteName="Productos"
        tabBarPosition="top"

        tabBarOptions={{
          activeTintColor: '#484aa3',
          labelStyle: {
            fontSize: 11,
            fontWeight:"bold"
          },
        }}>
        <Tab.Screen name="Productos">
          {(props: any) => <Todos {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Categorias">
          {(props: any) => <Busqueda name={"grupo"} display="Categorias"  {...props}/>}
        </Tab.Screen>
        <Tab.Screen name="SubCatego-rias" >
          {(props: any) => <Busqueda name={"subgrupo"} display="SubCategorias"  {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Marcas" >
          {(props: any) => <Busqueda name={"marcas"}  display="Marcas" {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
  );
};

export default ProductNavigator;
