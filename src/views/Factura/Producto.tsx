import React from "react";
import {Product,Cantidad,DescriptionContent,Description,PlusActions,Price,width,height} from "./styles";
import {BoxShadow} from 'react-native-shadow';
import {shadowSetting} from 'theme';
type DetalleFacturaProps = {
  colors:Theme,
  producto:DetalleFactura,
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
      <Price style={{color:colors["primary-font"]}} >Precio:{producto.precio_dolar}</Price>
    </DescriptionContent>
    <PlusActions>
      <Cantidad
      style={{color:colors["primary-font"]}} 
      >Cantidad : {Math.round(producto.cantidad)}</Cantidad>
    </PlusActions>
  </Product>
  </BoxShadow>
  );
}

export default Producto;