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
  ProductTitle,
  Product,
  Symbol,
} from './styles';
import Icon from 'react-native-vector-icons/Octicons';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';
import { InteractionManager, View } from 'react-native';

type ProfileScreenNavigationProp = StackNavigationProp<{}>;

interface ProductoPros {
  navigation: ProfileScreenNavigationProp;
  producto: Product;
  disabled: boolean;
  dispatch: any;
  id: number;
  edit:boolean
}
const Column = styled(View)`
  flex-direction:column;
  align-self:flex-start;
`
const ProductoCard = ({disabled = false, producto, id = 0,edit=true}: ProductoPros) => {
  const [text, setText] = useState(`${producto.cantidad}`);
  const input = useRef();
  const timer = useRef();
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

  const plus = () => {
    const number = producto.cantidad;

    InteractionManager.runAfterInteractions(()=>{
      EditCantidad && EditCantidad(text ? number + 1 : 0, id);
    })
      
  };

  const rest = () => {
    const number = producto.cantidad;
    ///
  
    InteractionManager.runAfterInteractions(()=>{
EditCantidad && EditCantidad(text ? number - 1 : 0, id);
    })
    
  };



  const add =
    (letter: string) => {
      EditCantidad && EditCantidad( parseInt(letter),id);
    }
  return (
    <Product disabled={disabled}>
      <Image style={{elevation:3,backgroundColor:"white",maxWidth:90}} W="90px" H={'90px'} producto={producto} />
      <DescriptionContent >
        <ProductTitle style={{color: colors['primary-font']}}>
          {producto.nombre}
        </ProductTitle>
        <Description style={{color: colors['primary-font'],opacity:0.2,fontSize:12}}>
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
        {edit && <><Button onPress={del} style={{alignSelf:"flex-end"}}>
          <Icon size={20} color={"gray"} name={'x'} />
        </Button>
        <View style={{flexDirection:"row"}}>
        <IconButton
          icon="plus"
          style={{backgroundColor:"#EBF4FF"}}
          color={"black"}
          size={20}
          onPress={plus}
        />
        <Cantidad
          style={{color: colors['primary-font']}}
          clearTextOnFocus
          onChangeText={add}
          ref={input}
          value={producto.cantidad?.toString()}
          keyboardType={'numeric'}
        />
         <IconButton
          icon="minus"
          onPress={rest}
          style={{backgroundColor:"#EBF4FF"}}
          color={"black"}
          size={20}
        />
        </View></>}
     
      
      </PlusActions>
    </Product>
  );
};

export default React.memo(ProductoCard);
