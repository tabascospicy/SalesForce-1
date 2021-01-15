import React, {useContext, useRef, useState} from 'react';
import {Button, Caption} from 'react-native-paper';
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from '@react-navigation/stack';
import { navigationRef } from 'components/RootNavigationRef/RootNavigationRef';

type ProfileScreenNavigationProp = StackNavigationProp<{}>;

interface ProductoPros {
  navigation:ProfileScreenNavigationProp,
  producto: Product;
  disabled: boolean;
  dispatch: any;
  id: number;
}
const ProductoCard = ({disabled = false, producto, id = 0}: ProductoPros) => {
  const [text, setText] = useState(`${producto.cantidad}`);
  const input = useRef();
  const {EditCantidad, deleteProduct, colors, ofertas} = useContext(Context);
  let timer = useRef<any>();
  const del = useCallback(() => {
    deleteProduct && deleteProduct(producto);
  }, [producto, text]);

  const refresh = useCallback(() => {
    EditCantidad && EditCantidad(text ? parseInt(text) : 0, id);
  }, [text]);
  const plus = () => {
    const number = parseInt(text);
    setText(`${number + 1}`);
    ///
    if(timer.current){
      clearTimeout(timer.current);
    }    
    timer.current = setTimeout(() => {
      EditCantidad && EditCantidad(text ? number + 1 : 0, id);
    }, 300);
  };

  const editar = ()=>{
    input?.current && input?.current.focus();
  };

  const add = useCallback(
    (letter: string) => {
      setText(letter);
    },
    [text],
  );
  return (
    <Product style={{elevation: 2}} disabled={disabled}>
      <Image W="40px" H={'60px'} producto={producto} />
      <DescriptionContent style={{flex: 1}}>
        <Description style={{color:colors["primary-font"]}} >{producto.nombre}</Description>
        <Description style={{color:colors["primary-font"]}} >Precio:{producto.precio_dolar}</Description>
        {producto.oferta ? <Caption>-{producto.oferta}%</Caption> : <></>}
        <Button
          mode="contained"
          onPress={del}
          style={{width: 110, marginTop: 8}}
          color={colors && colors.buttonLight}>
          Remover
        </Button>
      </DescriptionContent>
      <PlusActions>
        <Cantidad
        style={{color:colors["primary-font"]}} 
          clearTextOnFocus
          onChangeText={add}
          onEndEditing={refresh}
          ref={input}
          value={text}
          keyboardType={'numeric'}
        />
     <Button onPress={editar}>
       <Icon size={30} color={colors.terceary} name={"tooltip-edit"} />
     </Button>
      </PlusActions>
    </Product>
  );
};

export default React.memo(ProductoCard);
