import React from "react";
import {Product,Cantidad,DescriptionContent,Description,PlusActions,Price,width,height,Bold} from "./styles";
import {BoxShadow} from 'react-native-shadow';
import {shadowSetting} from 'theme';
type DetalleFacturaProps = {
  colors:Theme,
  producto:DetalleFactura | DetalleConNombre,
  nombre:string
}

const shadowSet = {
  ...shadowSetting,
  height: height/9,
  width: width -10,
  border: 4,
  radius: 9,
  opacity: 0.07,
  x: 0,
  y: 3,
  style: {
    marginHorizontal:"auto",
     marginVertical:5,
     alignItems:"center",
     alignSelf:"center",
    justifyContent:"center"
    }
};
const Producto = ({colors,producto,nombre}:DetalleFacturaProps) => {
  
  return (
    <BoxShadow setting={shadowSet}>
    <Product>
    <DescriptionContent style={{flex: 1}}>
      <Description style={{color:colors["primary-font"]}} >{nombre}</Description>
      <Price style={{color:colors["primary-font"]}} ><Bold>Precio:</Bold>{producto.precio_dolar}</Price>
      <Price style={{color:colors["primary-font"]}} ><Bold>Cantidad:</Bold>{Math.round(producto.cantidad as number)}</Price>
    </DescriptionContent>
    <PlusActions>
      <Cantidad
      style={{color:colors["primary-font"]}} 
      ><Bold>Total</Bold> : {(Math.round(producto.cantidad as number) * parseFloat(producto.precio_dolar)).toFixed(2)}</Cantidad>
    </PlusActions>
  </Product>
  </BoxShadow>
  );
}

export default Producto;