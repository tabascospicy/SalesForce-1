import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import ActionButtons from 'components/NavActionButtons';
import useProductoView from 'Hooks/useProductoView';
import PImage from 'components/Producto/img';
import {
  Card,
  Container,
  BlueBackground,
  Line,
  Scroll,
  Title,
  Codigo,
  ButtonBox,
  Box,
  Descripcion,
  DescriptionTitle,
  height,
  Card2,
  width,
  Name,
  ButtonText
} from './styled';
import { Avatar, IconButton } from 'react-native-paper';
import ModalAgregar from 'components/Modal/producto/ModalAgregar';
import ModalDescuentos from 'components/Modal/producto/ModalDescuentos';
import { StackNavigationProp } from '@react-navigation/stack';

import Inventario from "./Inventario";
import useOnview from 'Hooks/onView';

//@ts-ignore
import accounting from "accounting";
import { RouteProp } from '@react-navigation/native';
import { theme } from 'theme';

type ProfileScreenNavigationProp = StackNavigationProp<RouteParamsList, "Producto">;

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
interface ProductoProps {
  producto: Product;
  disabled: boolean;
  dispatch: any;
  navigation: ProfileScreenNavigationProp;
  route: RouteProp<RouteParamsList, "Producto">
}

const Producto = ({
  disabled,
  dispatch,
  navigation,
  route,
  ...props
}: ProductoProps) => {
  const { id, imagen, nombre, precioProductoDolar } = route.params as any;
  const {
    add,
    showQr,
    handleChange,
    productosQr,
    showDialog,
    hideDialog,
    visible,
    selectedProduct,
    colors,
    toggleCarrito,
    detalles,
    qr,
    precio,
    monto,
    showImage,
    hideImage,
    Image,
    onInit,
    cantidad,
    descuentosVisible,
    marca,
    categoria,
    subcategoria,
    hideDescuentos,
    niveles,
    showDescuentos,
    descuentoUi,
  } = useProductoView({ navigation, precioProductoDolar, ...props });

  const { isOnView } = useOnview({ navigation, onInit });
  const sheetRef = React.useRef();
  const show = () => {
    //@ts-ignore
    sheetRef.current?.snapTo(550);
  };
  const Data = () => {
    return (
      <Card2 >
        <Title style={{width:"100%"}}>
          
          Detalles
        </Title>
      
    
        <Box>
          <DescriptionTitle>Categoría</DescriptionTitle>
          <Descripcion>{categoria || 'por asignar'}</Descripcion>
        </Box>
        
        <Box>
          <DescriptionTitle>Sub Categoría</DescriptionTitle>
          <Descripcion>{subcategoria || 'por asignar'}</Descripcion>
        </Box>
      
        <Box>
          <DescriptionTitle>Marca</DescriptionTitle>

          <Descripcion>{marca || 'por asignar'}</Descripcion>
        </Box>
      
        <Box>
          <DescriptionTitle>Uso</DescriptionTitle>
          <Descripcion>{selectedProduct?.producto?.uso || 'por asignar'}</Descripcion>
        </Box>
     
        <Box>
          <DescriptionTitle>Presentación</DescriptionTitle>
          <Descripcion>
            {selectedProduct?.producto?.presentacion || 'por asignar'}
          </Descripcion>
        </Box>
        <Box>
          <DescriptionTitle>Referencia </DescriptionTitle>
          <Descripcion>
              {selectedProduct?.producto.referencia || 'sin asignar'}
          </Descripcion>
        </Box>
      
        <Box>
          <DescriptionTitle>Empaque</DescriptionTitle>

          <Descripcion>
            {selectedProduct?.producto?.empaque || 'por asignar'}
          </Descripcion>
        </Box>

      </Card2>
    );
  };
  return (
    <>
    {isOnView && (
          <>
            <ModalDescuentos {...{ descuentosVisible, hideDescuentos, niveles }} />
            <ModalAgregar
              descuentoUi={descuentoUi.current}
              precio={precio.current}
              monto={monto.current}
              {...{
                selectedProduct,
                detalles,
                cantidad,
                visible,
                hideDialog,
                handleChange,
                add,
              }}
            />
          </>
        )}
    <Container >
          
      <Scroll>
        <BlueBackground />
        <ActionButtons
          toggle={toggleCarrito}
          list={selectedProduct?.shouldAdd}
          navigation={navigation}
          menu={false}
          back
        />
      
        <PImage style={{marginTop:12}} W={`${width - 20}px`} H={`${height / 3 + 50}px`} producto={{ id, imagen }} />


        <Card >
          <Codigo>
            {selectedProduct?.producto.codigo}
          </Codigo>
          <Name>
            {nombre}
          </Name>
        </Card>
        <Card >

          <DescriptionTitle>Descripción:</DescriptionTitle>
          <Descripcion>
            {selectedProduct?.producto?.descripcion || 'por asignar'}
          </Descripcion>
        </Card>
        <Card>
          <Line>
            <View>
              <Descripcion>Precio:{'  '}</Descripcion>
              <DescriptionTitle>
                {accounting.formatMoney(precio.current, {
                  symbol: '$',
                  thousand: '.',
                  decimal: ',',
                  precision: 2,
                })}
              </DescriptionTitle>
            </View>
            {selectedProduct?.shouldAdd && <View style={{ flexDirection: "row", alignItems: "center" }}>
              
                <ButtonBox
                 android_ripple={{color:"white", borderless: false}} onPress={showDialog}
                style={{elevation:3}}
                  icon="plus-circle-outline"
                >
                  <ButtonText>AGREGAR</ButtonText>
                </ButtonBox>
              
          
                <IconButton
                  
                  onPress={showDescuentos}
                  
                  icon="ticket-percent-outline"
                  style={{backgroundColor:theme.primary,elevation:3 }}
                  color={"white"}
                  size={30}
                />
              
            </View>}

          </Line>
        </Card>
        {
          <Data />
        }
        <Inventario concepto={selectedProduct?.producto?.id} />
      </Scroll>
    </Container>
    </>
  );
};

export default Producto;
