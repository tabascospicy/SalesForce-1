import React, {useEffect, useState} from 'react';
import {Button, Dialog, Portal, DataTable} from 'react-native-paper';
import realm from 'services/realm/schema';
import Database from 'services/realm';

type DetalleFProps = {
  visible: boolean;
  hideDialog: () => void;
  marcarFacturado: () => void;
  detalles: Array<DetalleFactura>;
  id: number;
};
const DetalleFactura = ({
  visible,
  hideDialog,
  detalles,
  marcarFacturado,
  id,
}: DetalleFProps) => {
  const [productos, setProductos] = useState<Product[]>([]);
  useEffect(() => {
    readProductos();
  }, [detalles]);
  const readProductos = async () => {
    try {
    
      realm.write(() => { 
         let producto: any = [];
        detalles.forEach((element) => {
          let productDb = realm
            .objects('producto')
            .filtered(`id = ${element.adm_conceptos_id}`);
         producto.push(productDb[0].nombre.split(" ")[4]);
        });
     
          setProductos(producto);
      });    
    } catch (e) {
      console.log(e);
    }
  };
  const handleMarcar = () => {
    marcarFacturado();
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Detalles</Dialog.Title>
        <Dialog.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nombre</DataTable.Title>
              <DataTable.Title numeric>Catintidad</DataTable.Title>
              <DataTable.Title numeric>Precio</DataTable.Title>
            </DataTable.Header>
            {detalles.map((element, key: number) => {
              {
                return (
                  <DataTable.Row key={key}>
                    <DataTable.Cell>
                      {productos[key] ? productos[key] : 'sin asignar'}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>{element.cantidad}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {element.precio_dolar}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }
            })}
          </DataTable>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleMarcar}>Pagar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DetalleFactura;
