import React, {useContext, useRef, useState, useMemo} from 'react';
import {Button, IconButton} from 'react-native-paper';
import Context from 'services/context';
import {useCallback} from 'react';
import Image from 'components/Producto/img';
import {
  Cantidad,
  Description,
  DescriptionContent,
  PlusActions,
  Product,
  Symbol,
} from './styles';
import Icon from 'react-native-vector-icons/Octicons';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';
import { View } from 'react-native';

type ProfileScreenNavigationProp = StackNavigationProp<{}>;

interface ProductoPros {
  navigation: ProfileScreenNavigationProp;
  producto: Product;
  disabled: boolean;
  dispatch: any;
  id: number;
}
const Column = styled(View)`
  flex-direction:column;
  align-self:flex-start;
`
const ProductoCard = ({disabled = false, producto, id = 0}: ProductoPros) => {
  const [text, setText] = useState(`${producto.cantidad}`);
  const input = useRef();
  const {EditCantidad, deleteProduct, colors, descuento} = useContext(Context);
  const PercentageDescuento = useMemo(
    () => (producto.oferta || 0) / 100,
    [],
  );
  const precio_dolar = useMemo(() => parseFloat(producto.precio_dolar), []);
  const precio = useMemo(
    () => precio_dolar - PercentageDescuento * precio_dolar,
    [],
  );
  const del = useCallback(() => {
    deleteProduct && deleteProduct(producto);
  }, [producto, text]);

  const refresh = useCallback(() => {
    EditCantidad && EditCantidad(text ? parseInt(text) : 0, id);
  }, [text]);

  const editar = () => {
    input?.current && input?.current.focus();
  };

  const add = useCallback(
    (letter: string) => {
      setText(letter);
    },
    [text],
  );
  return (
    <Product disabled={disabled}>
      <Image style={{elevation:3,backgroundColor:"white",maxWidth:90}} W="90px" H={'90px'} producto={producto} />
      <DescriptionContent style={{flex: 1}}>
        <Description style={{color: colors['primary-font']}}>
          {producto.nombre}
        </Description>
        <Description style={{color: colors['primary-font'],opacity:0.2}}>
          CANTIDAD: {producto.cantidad}
        </Description>
        {producto.oferta ? (
          <>
            <Description
              style={{
                color: colors['primary-font'],
              }}>
              {' '}
              -{producto.oferta}%
            </Description>
            <Description
              style={{
                color: colors['primary-font'],
                textDecorationLine: 'line-through',
            
              }}>
              ${parseInt(producto.precio_dolar).toFixed(2)}
            </Description>
            <Description
              style={{
                color: colors['primary-font'],
            
              }}>
              ${ precio.toFixed(2)}
            </Description>
          </>
        ) : (
          <>
             <Description
              style={{
                color: colors['primary-font'],
            
              }}>
              ${ precio.toFixed(2)}
            </Description>
          </>
        )}
      </DescriptionContent>
      <PlusActions>
      <Button onPress={del} style={{alignSelf:"flex-end"}}>
          <Icon size={20} color={"gray"} name={'x'} />
        </Button>
        <View style={{flexDirection:"row"}}>
        <IconButton
          icon="plus"
          style={{backgroundColor:"#EBF4FF"}}
          color={"black"}
          size={25}
        />
        <Cantidad
          style={{color: colors['primary-font']}}
          clearTextOnFocus
          onChangeText={add}
          onEndEditing={refresh}
          ref={input}
          value={text}
          keyboardType={'numeric'}
        />
         <IconButton
          icon="minus"
          style={{backgroundColor:"#EBF4FF"}}
          color={"black"}
          size={25}
        />
        </View>
      
      </PlusActions>
    </Product>
  );
};

export default React.memo(ProductoCard);
