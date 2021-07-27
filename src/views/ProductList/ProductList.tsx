import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { Pressable, StyleSheet} from 'react-native';
import ActionButtons from 'components/NavActionButtons';
import Modal from 'components/Animate/modal';

import SearchInput from 'components/Inputs/SearchInput';
import Context from 'services/context';
import {theme} from "theme";
import QRCode from 'react-native-qrcode-generator';
import {useRef} from 'react';
import SnackBar from 'components/Animate/SnackBar';
import ProductNavigator from 'components/ProductSection';
import { StackNavigationProp } from '@react-navigation/stack';


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
  max-height: 130px;
  background-color: ${theme.primary};
  flex-grow: 1;
  z-index: 1;
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
  navigation:StackNavigationProp<RouteParamsList,"Agregar">;
  route:any;
}

const ProductList:React.FC<productList> = (props) => {
  const {disabled} = props.route.params;
  const {productos, carrito, handleLista,ExtraFunction,pressed,showQr,productosQr,qr} = useContext(Context);
  const [snack, showSnack] = useState(false);
  const templateBusqueda = useRef("");

  const remenber = (text: string) => {
    templateBusqueda.current = text
  }

  const Buscar = (nombre: string) => {

    if(ExtraFunction && ExtraFunction.current !== null){
      ExtraFunction && ExtraFunction.current(nombre);
    }else{
      const Filtrados =
      productos &&
      productos.filter((element, index) => {
        return element.nombre.toLowerCase().includes(nombre.toLowerCase());
      });
      handleLista && handleLista((prev) => Filtrados || []);
    }
    
  };

  useEffect(() => {
   handleLista && handleLista(productos);
  }, [productos]);

  useEffect(() => {
   productosQr.current = JSON.stringify(carrito.map((element) => element.id));
  }, [carrito]);

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

      <SnackBar
        setModal={showSnack}
        show={snack}
        message={'producto agregado al carrito'}
      />
      <BlueBackground
        style={{borderBottomEndRadius: 20, borderBottomStartRadius: 20}}>
        <ActionButtons disabled={disabled} toggle={pressed} list menu={false} back {...props} />
        <SearchInput {...{remenber,value:templateBusqueda.current}} buscar={Buscar} />
      </BlueBackground>
      <ProductNavigator disabled={disabled} {...props} />
    </GlobalContainer>
  );
};
export default React.memo(ProductList);
