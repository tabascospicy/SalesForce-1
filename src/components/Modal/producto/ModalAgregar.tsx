import React, { FC , useContext} from 'react';
import { Button, Caption, Dialog, Portal,Divider } from 'react-native-paper';
import { Introducir } from 'views/Producto/styled';
import {Font} from "styles"
import styled from "styled-components";
import Context from "services/context";
const Description = styled(Font)`

`
type ModalAgregarProps = {
  visible:boolean;
  hideDialog:()=>void;
  selectedProduct?:UiProduct;
  precio:number;
  detalles:DetallesToAdd;
  descuentoUi:number;
  monto:number;
  cantidad:string;
  handleChange:(e:string)=>void;
  add:()=>void;
}
const ModalAgregar:FC<ModalAgregarProps> = ({visible,hideDialog,selectedProduct,precio,detalles,descuentoUi,monto,cantidad,handleChange,add}) => {
  const {colors,descuento} = useContext(Context);
  return (
    <Portal>
    <Dialog style={{elevation:4,backgroundColor:"white"}} visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={{color:colors && colors["primary-font"]}}><Font>{ selectedProduct && selectedProduct.producto.nombre}</Font></Dialog.Title>
      <Dialog.Content>
        <Description  style={{color:colors && colors["primary-font"]}}>
          Precio:<Caption>{(precio).toFixed(2)}$</Caption> 
        </Description>
        
        <Description style={{color:colors && colors["primary-font"]}}>
        <Divider />
        Iva :<Caption> {detalles.iva}%</Caption>
        </Description>
        <Description style={{color:colors && colors["primary-font"]}}>
        cantidad :<Caption> {cantidad}</Caption>
        </Description>
        <Description style={{color:colors && colors["primary-font"]}}>
        descuento :<Caption> {descuentoUi}%</Caption>
        </Description>
        <Description style={{color:colors && colors["primary-font"]}}>
        Total:<Caption>{monto.toFixed(2)}$</Caption>
        </Description>
        <Divider />
        <Description style={{marginTop: 30}}>Cantidad</Description>
        <Introducir
          keyboardType="numeric"
          clearTextOnFocus={true}
          onChangeText={handleChange}
          value={cantidad}
        />
      
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={add}>Agregar</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
  );
}

export default ModalAgregar;