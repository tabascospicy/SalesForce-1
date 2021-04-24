import React, {useEffect, useState, useContext, useRef} from 'react';
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
const {height} = Dimensions.get('screen');
type ProfileScreenNavigationProp = StackNavigationProp<{}>;

type props = {
  navigation: ProfileScreenNavigationProp;
  pressed: VoidFunction;
  clientes: Array<Cliente>;
  visual: any;
};
const BlueBackground = styled(Animated.View)`
  position: absolute;
  top: 0;
  height: 300px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  background-color: ${({color}: any) => color};
`;
let temp = {
  item: {
    nombre: '',
    direccion: '',
    id: 1,
  },
  id: 1,
};
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
  useEffect(() => {
    readUbicaciones();
    return () => {
      timer?.current && clearTimeout(timer.current || 0);
    };
  }, []);
  useEffect(() => {
    if (!calling?.loading) {
      clientes && setClientes([...clientes]);
    }
  }, [clientes]);

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
  const handleUbicacionSelect = (item: DropDownItem) => {
    setFilterZona(item.value);
  };
  const Buscar = (nombre: string) => {
    const Filtrados =
      clientes &&
      clientes.filter((element, index) => {
        return element.nombre.toLowerCase().includes(nombre.toLowerCase());
      });
    setClientes((prev) => Filtrados || []);
  };
  const onScroll = ScrollEvent;
  return (
    <View style={{position: 'relative'}}>
      <BlueBackground color={colors?.primary || ""} />
      <Navbar navigation={navigation} name="Home" pressed={pressed}></Navbar>
      <Animated.View style={{flexDirection: 'row'}}>
        <SearchInput  buscar={Buscar} />
      </Animated.View>
      {isOnView && (
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
          keyExtractor={(item) => (item.id + Math.random()).toString()}
          data={list}
          onScroll={onScroll}
        />
      )}
    </View>
  );
};

export default React.memo(Home);
