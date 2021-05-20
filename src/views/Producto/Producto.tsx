import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import ActionButtons from 'components/NavActionButtons';
import useProductoView from 'Hooks/useProductoView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {Button} from 'react-native-paper';
import PImage from 'components/Producto/img';
import {
  Card,
  Container,
  BlueBackground,
  Line,
  LineText,
  LineTitle,
  Separator,
  Tag,
  Title,
  TopElements,
  Card2,
  Bold,
} from './styled';
import ModalImagen from 'components/Modal/producto/ModalImagen';
import ModalAgregar from 'components/Modal/producto/ModalAgregar';
import ModalDescuentos from 'components/Modal/producto/ModalDescuentos';
import ModalQr from 'components/Modal/producto/ModalQr';
import {StackNavigationProp} from '@react-navigation/stack';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Inventario from "./Inventario";
import useOnview from 'Hooks/onView';
//@ts-ignore
import accounting from "accounting";
import { RouteProp } from '@react-navigation/native';

type ProfileScreenNavigationProp = StackNavigationProp<RouteParamsList,"Producto">;

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
  route:RouteProp<RouteParamsList,"Producto">
}

const Producto = ({
  disabled,
  dispatch,
  navigation,
  route,
  ...props
}: ProductoProps) => {
  const {id,imagen,nombre,precioProductoDolar} = route.params as any;
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
  } = useProductoView({navigation, precioProductoDolar, ...props});
  
  const {isOnView} = useOnview({navigation,onInit});
  const sheetRef = React.useRef();
  const show = () => {
    //@ts-ignore
    sheetRef.current?.snapTo(550);
  };
  const Data = () => {
    return (
      <Card2 style={{padding: 10, marginTop: 20, elevation: 13}}>
        <Title>
          <Icon name="clipboard-list-outline" size={25} color="#ECDF22" />
          Detalles
        </Title>
        <Line>
          <LineTitle>Descripcion:</LineTitle>
          <LineText>
            {selectedProduct?.producto?.descripcion || 'por asignar'}
          </LineText>
        </Line>
        <Separator />
        <Line>
          <LineTitle>Categoria:</LineTitle>
          <LineText>{categoria || 'por asignar'}</LineText>
        </Line>
        <Separator />
        <Line>
          <LineTitle>SubCategoria:</LineTitle>
          <LineText>{subcategoria || 'por asignar'}</LineText>
        </Line>
        <Separator />
        <Line>
          <LineTitle>Marca:</LineTitle>

          <LineText>{marca || 'por asignar'}</LineText>
        </Line>
        <Separator />
        <Line>
          <LineTitle>Uso:</LineTitle>
          <LineText>{selectedProduct?.producto?.uso || 'por asignar'}</LineText>
        </Line>
        <Separator />
        <Line>
          <LineTitle>Presentacion:</LineTitle>
          <LineText>
            {selectedProduct?.producto?.presentacion || 'por asignar'}
          </LineText>
        </Line>
        <Separator />
        <Line>
          <LineTitle>Empaque:</LineTitle>

          <LineText>
            {selectedProduct?.producto?.empaque || 'por asignar'}
          </LineText>
        </Line>
        { selectedProduct?.shouldAdd && (
          <Button
            onPress={showDialog}
            mode={'contained'}
            style={{
              alignSelf: 'center',
              marginTop: 8,
              width: '100%',
            }}
            contentStyle={{zIndex: 3}}
            color={colors?.ButtonStrong}>
            Agregar
          </Button>
        )}
      </Card2>
    );
  };
  return (
    <Container>
      {isOnView && (
        <>
        {console.log("a ver")}
          <ModalDescuentos {...{descuentosVisible, hideDescuentos, niveles}} />
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
          <ModalImagen {...{hideImage, selectedProduct, Image}} />
          <ModalQr productosQr={productosQr.current as unknown as string} {...{qr, showQr}} />
        </>
      )}

      <BlueBackground />
      <ActionButtons
        toggle={toggleCarrito}
        list={selectedProduct?.shouldAdd}
        navigation={navigation}
        menu={false}
        back
      />

      <TopElements>
        <Pressable onPress={showImage}>
          
          <PImage  H={'90px'} producto={{id,imagen}} />
        </Pressable>
      </TopElements>
      <Card style={style.shadow}>
        <Tag>
          <Bold>Nombre:</Bold>
          {nombre}
        </Tag>
        <Tag style={{marginBottom: 4}}>
          <Bold>Codigo:</Bold>
          {selectedProduct?.producto.codigo}
        </Tag>

        <Tag>
          <Bold>Referencia :</Bold>{' '}
          {selectedProduct?.producto.referencia || 'sin asignar'}
        </Tag>
        <Tag>
          <Bold>Precio:{'  '}</Bold>
          <Icon2
            style={{marginRight: 5}}
            name="dollar"
            size={12}
            color="#002E2C"
          />
          {accounting.formatMoney(precio.current, {
                          symbol: '',
                          thousand: '.',
                          decimal: ',',
                          precision: 2,
                        })}
        </Tag>
        <Button
          labelStyle={{color: 'white'}}
          style={{alignSelf: 'flex-end'}}
          mode={'contained'}
          color={'#43AA8B'}
          onPress={showDescuentos}>
          Descuentos
        </Button>
        <Button
          style={{marginTop: 'auto', alignSelf: 'center'}}
          onPress={show}
          color={colors && colors['primary-font'] || ""}
          icon={() => (
            <Icon3
              size={50}
              color={colors && colors['primary-font'] ||""}
              name={'chevron-up-sharp'}></Icon3>
          )}>
          Mas Detalles {''}
        </Button>
      </Card>
      {isOnView && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={[0, 550]}
          borderRadius={10}
          renderContent={Data}
        />
      )}
      <Inventario concepto={selectedProduct?.producto?.id} />
    </Container>
  );
};

export default Producto;
