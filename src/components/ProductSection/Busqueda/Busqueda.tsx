import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import Producto from 'components/Producto';
import Context from 'services/context';
import DataBase from 'services/realm';
import {List} from 'react-native-paper';
import * as RootNavigation from 'components/RootNavigationRef/RootNavigationRef';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
const {customRequest} = DataBase();

type ProfileScreenNavigationProp = StackNavigationProp<{}>;

interface Buscar {
  name: string;
  navigation:ProfileScreenNavigationProp,
  display: string;
}
const Busqueda = ({name, display,navigation}: Buscar) => {
  const {handleFilter,ExtraFunction} = useContext(Context);
  const [busqueda, setBusqueda] = useState([]);

  const readData = (realm: Realm) => {
    const opciones = realm.objects(name);
    setBusqueda(opciones);
  };
  const BuscarFiltro = (nombre:string) =>{

    const Filtrados =
      busqueda.filter((element, index) => {
        return element.nombre.toLowerCase().includes(nombre.toLowerCase());
      });
      setBusqueda(Filtrados);
  }
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      ExtraFunction.current = BuscarFiltro;
    });
    return unsubscribe;
  },[navigation]);
  const handleSelect = (id: number, nombre: string) => {
  handleFilter &&  handleFilter({nombre, id, display,db:name});
    RootNavigation.navigate('MinifiedList');
  };
  useEffect(() => {
    customRequest(readData);
  }, []);

  return (
    <SafeAreaView>
      <List.Section>
        <List.Subheader>{display}</List.Subheader>
        <ScrollView>
          {busqueda.map((element, key) => {
            return (
              <List.Item
                title={element.nombre}
                key={key}
                onPress={() => handleSelect(element.id, element.nombre)}
              />
            );
          })}
        </ScrollView>
      </List.Section>
    </SafeAreaView>
  );
};

export default Busqueda;
