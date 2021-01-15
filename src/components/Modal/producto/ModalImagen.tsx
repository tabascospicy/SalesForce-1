import React from 'react';
import {Dialog, Portal} from 'react-native-paper';
import PImage from 'components/Producto/img';
import {Image} from 'react-native';

type ModalImageProps = {
  hideImage: () => void;
  selectedProduct?: UiProduct;
  Image: boolean;
};
const ModalImagen = ({hideImage, selectedProduct,...props}: ModalImageProps) => {
  return (
    <Portal >
      <Dialog visible={props.Image} onDismiss={hideImage}>
        <Dialog.Content >
          <Image style={{width:300,height:200}} source={{uri:'file://' + selectedProduct.producto.imagen}} />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ModalImagen;
