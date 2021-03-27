import React, {useContext, useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import ActionButtons from 'components/NavActionButtons';
import Producto from 'components/Producto';
import Modal from 'components/Animate/modal';
import Animated from 'react-native-reanimated';
import SearchInput from 'components/Inputs/SearchInput';
import Context from 'services/context';
import useCartAnimation from 'Hooks/useCartAnimation';
import Cart from 'components/Cart';
import QRCode from 'react-native-qrcode-generator';
import {Paragraph} from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

const GlobalContainer = styled.View`
  flex-grow: 1;
  background-color: #f5f5f8;
  flex-direction: column;
  position: relative;
`;
const cart = StyleSheet.create({
  cart: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    zIndex: 4,
  },
});

const BlueBackground = styled.View`
  max-height: 160px;
  min-height: 170px;
  background-color: #484aa3;
  flex-grow: 1;
  z-index: 1;
`;
const Productos = styled.Text`
  font-size: 18px;

  text-align: left;
  width: 80%;
  font-weight: bold;
  color: white;
  padding: 10px;
  opacity: 0.9;
  align-self: center;
`;
const Toggle = styled(Pressable)`
  height: 100%;
  background-color: black;
  opacity: 0.3;
  width: 10%;
`;
const Cancel = styled(Pressable)`
  align-self: center;
  padding: 10px;
`;
const CancelTxt = styled.Text`
  font-size: 20px;
`;
interface productList {
  empresa: Empresa;
  dispatch: any;
  navigation:StackNavigationProp<RouteParamsList,"MinifiedList">;
  route:RouteProp<RouteParamsList,"MinifiedList">;
}
const opciones: FilterOptions = {
  grupo: 'adm_grupos_id',
  subgrupo: 'adm_subgrupos_id',
  marcas: 'adm_marcas_id',
};
const MinifiedList:React.FC<productList> = (props) => {
  const {disabled} = props.route.params;
  const {productos, filter,qr,productosQr,showQr,pressed} = useContext(Context);
  const [minified, setMinified] = useState<Product[]>([]);
  const productsCopy = useRef(productos);
  

  const Buscar = (nombre: string) => {
    const Filtrados: Product[] =
      productsCopy.current &&
      productsCopy.current.filter((element, index) => {
        return element.nombre.toLowerCase().includes(nombre.toLowerCase());
      });
    setMinified((prev) => Filtrados || []);
  };

  useEffect(() => {
    const seleccionado: selected = opciones[filter.db];
    const init = productos.filter((element) => {
      return element[seleccionado] === parseInt(filter.id);
    });
    productsCopy.current = init;
    setMinified(init);
  }, []);

  return (
    <GlobalContainer>
      <Modal lott={false} show={qr}>
        <QRCode
          value={productosQr.current}
          size={200}
          bgColor="black"
          fgColor="white"
        />
        <Cancel onPress={showQr}>
          <CancelTxt>X Cerrar</CancelTxt>
        </Cancel>
      </Modal>
      <BlueBackground
        style={{borderBottomEndRadius: 20, borderBottomStartRadius: 20}}>
        <ActionButtons disabled={disabled} toggle={pressed} list menu={false} back {...props} />
        <Productos>
          {filter.display}:{filter.nombre}
        </Productos>
        <SearchInput buscar={Buscar} />
      </BlueBackground>
      {minified.length != 0 ? (
        <Producto.List disabled={disabled} {...props} list={minified} title={'Productos'} />
      ) : (
        <Paragraph>No hay Productos en Esta seleccion</Paragraph>
      )}
    </GlobalContainer>
  );
};

export default MinifiedList;
