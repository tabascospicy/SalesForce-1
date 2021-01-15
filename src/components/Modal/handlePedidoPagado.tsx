import useSendImage from "Hooks/useSendImage";
import React, { useEffect, useState } from "react";
import { Pressable,Image } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import styled from "styled-components/native";
import { Font } from "styles";
import {ActivityIndicator, Colors} from 'react-native-paper';

type DetalleFProps = {
  visible:boolean;
  hideDialog:()=>void;
  id:number
}
const Mensaje = styled(Font)``

const PlaceHolderImage = styled.View`
background-color:gray;
opacity:0.6;
border-color:gray;
border-width:2px;
border-style:dashed;
flex-grow:1;
`
const InputImage = styled(Pressable)`
  flex-grow:1;
`
const HandlePedidoPagado = ({visible,hideDialog,id}:DetalleFProps) => {
  const [confirmado,setConfirmado] = useState<boolean>(false);
  const {handleChoosePhoto,capture,calling,Send} = useSendImage(id);
  const handleConfirm = () =>{
    if(capture){
setConfirmado(true);
  }
    
  }
  const DismissAll = () =>{
    hideDialog();
    setConfirmado(false);
  }
  return (
    <Portal>
    <Dialog visible={confirmado} onDismiss={DismissAll}>
      <Dialog.Title>
          Actualizar
      </Dialog.Title>
      <Dialog.Content>
        Esta seguro que desea Actualizar esta factura?
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={Send}>Hecho</Button>
      </Dialog.Actions>
    </Dialog>
    <Dialog visible={visible} onDismiss={DismissAll}>
      <Dialog.Title>
          Seleccione su Imagen
      </Dialog.Title>
      <Dialog.Content>
        <InputImage onPress={handleChoosePhoto}>
         {capture ? <PlaceHolderImage /> : <Image src={{uri:capture}} /> } 
        </InputImage>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleConfirm}>Hecho</Button>
      </Dialog.Actions>
    </Dialog>
    <Dialog visible={calling}>
    <ActivityIndicator
          animating={calling}
          color={Colors.red800}
        />
        {!calling && <Mensaje>El pedido ha sido actualizado</Mensaje>}
    </Dialog>
  </Portal>
  );
}

export default HandlePedidoPagado;