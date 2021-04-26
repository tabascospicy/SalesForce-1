import React, { Component} from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { DataTable } from 'react-native-paper';
import reactotron from "reactotron-react-native";

type ModalDescuentosProps = {
  descuentosVisible:boolean,
  hideDescuentos:()=>void,
  niveles:Oferta[]
}




const ModalDescuentos = ({descuentosVisible,hideDescuentos,niveles}:ModalDescuentosProps) => {
  return (
    <Portal>
    <Dialog visible={descuentosVisible} onDismiss={hideDescuentos}>
      <Dialog.Title>Niveles de Descuentos </Dialog.Title>
      <Dialog.Content>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title >minimo</DataTable.Title>
          <DataTable.Title numeric>Descuento</DataTable.Title>
        </DataTable.Header>
        {niveles ? niveles.map((element,i)=>{
          return (
            <DataTable.Row key={i}>
                <DataTable.Cell >{element.min}</DataTable.Cell>
                <DataTable.Cell numeric>{element.descuento}%</DataTable.Cell>
            </DataTable.Row>)
        }) : <Text>no hay descuentos para este producto</Text>}
      </DataTable>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDescuentos}>Entendido</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
  );
}

export default ModalDescuentos;