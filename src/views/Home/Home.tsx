import React, {useEffect, useState, useContext, useRef, useMemo} from 'react';
import styled from 'styled-components/native';
import {FlatList, Animated, View} from 'react-native';
import ClientesCard from 'components/ClienteCard';
import Navbar from 'components/Navbar';
import SearchInput from 'components/Inputs/SearchInput';
import Context from 'services/context';
import useScrollAnimation from 'Hooks/ScrollAnimation/useScrollAnimation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dimensions} from 'react-native';
import DataBase from 'services/realm';
import useOnView from 'Hooks/onView';
import DropDownPicker from 'react-native-dropdown-picker';
import {theme} from "theme" 
import { TopContent } from 'views/Producto/styled';
const {height} = Dimensions.get('screen');
type ProfileScreenNavigationProp = StackNavigationProp<{}>;

type props = {
  navigation: ProfileScreenNavigationProp;
  pressed: VoidFunction;
  clientes: Array<Cliente>;
  visual: any;
};

const TopBarContent = styled(Animated.View)`
background-color:${theme.primary};
margin-bottom:10px;
`;


type DropDownItem = {
  value: number;
  label: string;
};
const def: DropDownItem = {
  value: 0,
  label: 'zona',
};
const AnimatedList = Animated.createAnimatedComponent(FlatList);
const AnimatedDropwDown = Animated.createAnimatedComponent(DropDownPicker);
const {readAll} = DataBase();
const Home = ({pressed, visual, navigation, ...props}: props) => {
  const {calling, clientes, colors} = useContext(Context);
  const [list, setClientes] = useState(clientes);
  const [ubicaciones, setUbicaciones] = useState<DropDownItem[]>([def]);
  const [filterZona, setFilterZona] = useState(0);
  const timer = useRef(0);
  const {isOnView} = useOnView({navigation});
  const {ScrollEvent} = useScrollAnimation();
  const readClientes = async () => {
    try {
      const clientList = (((await readAll(
        'clientList',
      )) as unknown) as Cliente[]);
      const clientes = clientList[0]?.clients
      setClientes(clientes)
    } catch (e) {
      console.log(e, 'errooooor');
    }
  };
  useEffect(() => {
    readUbicaciones();
    readClientes();
    return () => {
      timer?.current && clearTimeout(timer.current || 0);
    };
  }, []);


  useEffect(() => {
    buscarEnZona();
  }, [filterZona]);

  const buscarEnZona = () => {
    const Filtrados =
      clientes &&
      clientes.filter((element, index) => {
        return element?.adm_zonas_id !== null
          ? filterZona === 0
            ? true
            : filterZona === element.adm_zonas_id
          : filterZona === 0;
      });
    setClientes((prev) => [...(Filtrados || [])] || [def]);
  };
  const readUbicaciones = async () => {
    try {
      const ubicacionesBase = (((await readAll(
        'zona',
      )) as unknown) as GenericType[]) || [def];
      if (ubicacionesBase.length === 1) {
        timer.current = setTimeout(() => {
          readUbicaciones();
        }, 2000);
      }
      const items: DropDownItem[] = ubicacionesBase.map((element, key) => {
        return {label: element.nombre, value: element.id};
      });

      setUbicaciones([def, ...items]);
    } catch (e) {
      console.log(e, 'errooooor');
    }
  };

  const Buscar = (nombre: string) => {
    const Filtrados =
      clientes &&
      clientes.filter((element, index) => {
        return element.nombre.toLowerCase().includes(nombre.toLowerCase());
      });
    setClientes((prev) => Filtrados || []);
  };
  const show = useMemo(()=>isOnView,[isOnView]);
  const onScroll = ScrollEvent;

  return (
    <View >
      <TopBarContent>
      <Navbar navigation={navigation} name="Home" pressed={pressed}></Navbar>
      <Animated.View >
        <SearchInput  buscar={Buscar} />
      </Animated.View>
      </TopBarContent>
      {show && (
        <AnimatedList
          scrollEventThrottle={16}
          renderItem={(item: Item, index: number) => (
            <ClientesCard
              navigation={navigation}
              {...props}
              item={item}
              key={index}
              id={index}
            />
          )}
          maxToRenderPerBatch={9}
          keyExtractor={(item,index) => (`${item.id}${index}`)}
          data={list}
          onScroll={onScroll}
        />
      )}
    </View>
  );
};

export default React.memo(Home);
