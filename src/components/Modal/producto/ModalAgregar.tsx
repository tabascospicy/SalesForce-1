import React, { FC , useContext} from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import { Description, Introducir } from 'views/Producto/styled';
import Context from "services/context";
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
  const {colors} = useContext(Context);
  return (
    <Portal>
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={{color:colors["primary-font"]}}>{ selectedProduct && selectedProduct.producto.nombre}</Dialog.Title>
      <Dialog.Content>
        <Description  style={{color:colors["primary-font"]}}>
          Precio : {precio.toFixed(3)}${'\n'}
        </Description>
        <Description style={{color:colors["primary-font"]}}>
         
          Iva : {detalles.iva}%{'\n'}

        </Description>
        <Description style={{color:colors["primary-font"]}}>
          cantidad : {cantidad}{'\n'}
        </Description>
        <Description style={{color:colors["primary-font"]}}>
          descuento : {descuentoUi}%{'\n'}
        </Description>
        <Description style={{color:colors["primary-font"]}}>
          Total:{monto.toFixed(2)}$
        </Description>
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