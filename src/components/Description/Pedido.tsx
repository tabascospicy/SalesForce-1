import React, {useContext, useEffect, useState} from 'react';
import {DataTable, Paragraph, Dialog, Button, Caption} from 'react-native-paper';
import styled from 'styled-components/native';
import useReEnvioPedidos from 'Hooks/useReEnvioPedidos';
import {ActivityIndicator, Colors} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import Context from "services/context";
import Icon from "react-native-vector-icons/Feather"

const Row = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

interface PedidoDescripcionProps {
  pedido: IPedidosConDetalles | {};
  hideDialog: () => void;
  visible: boolean;
  view:number;
  pending: any;
  LoadPedidos:()=>Promise<void>;
}
const Pedido = ({
  pedido = {},
  hideDialog,
  visible,
  pending = false,
  view,
  LoadPedidos,
  
}: PedidoDescripcionProps) => {
  const [carritoPage, setCarritoPage] = useState<number>(0);
  const [productoNombre,setProductoNombre] = useState("");
  const {colors} = useContext(Context);
  const from: number = carritoPage * 6;
  const to: number = (carritoPage + 1) * 6;
  const {SendPedidoPendiente, calling, setCalling,cancelar,offline} = useReEnvioPedidos();
  const enviar = () => {
    SendPedidoPendiente(pending.current);
  };
  const HandleSelect = (nombre:string | undefined) =>{
   nombre && setProductoNombre(nombre)
  }
  const handleCancel = async ()=> {
    const ped = pedido as IPedidosConDetalles;
    await LoadPedidos();
    cancelar(ped.id);
  }
  useEffect(() => {
    setCalling({process: 0, success: null});
  }, [visible]);
  const Table = () => {
    return (
      <>
        <Dialog.Title>Realizado el </Dialog.Title>
        <Dialog.Content>
          <Paragraph>{pedido.fecha_at}</Paragraph>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nombre</DataTable.Title>
              <DataTable.Title numeric>Precio</DataTable.Title>
            </DataTable.Header>
            {pedido?.detalles &&
              pedido.detalles.map((element: DetalleConNombre, key: number) => {
                if (from <= key && key < to) {
                  return (
                    <DataTable.Row onPress={()=>HandleSelect(element.nombre)} key={key}>
                      <DataTable.Cell ><Icon  name={"eye"} size={15}/>{element.nombre}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {element.precio_dolar}X{element.cantidad}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                }
              })}
            <DataTable.Pagination
              page={carritoPage}
              numberOfPages={
                Math.floor(
                  ((pedido?.detalles && pedido.detalles.length) || 0) / 6,
                ) + 1
              }
              onPageChange={(page) => {
                setCarritoPage(page);
              }}
              label={` Total a Pagar: ${pedido.total.toFixed(2)} `}
            />
          </DataTable>
        <Caption>Ver Producto :{productoNombre}</Caption>
        </Dialog.Content>
        {pending.current && (
          <Dialog.Actions>
            <Button disabled={offline} color={colors?.ButtonStrong} mode={"contained"}  onPress={enviar}>Enviar</Button>
          </Dialog.Actions>
        )}
        {
          view ===2 && (
            <Dialog.Actions>
            <Button disabled={offline} color={colors?.ButtonStrong} mode={"contained"} onPress={handleCancel}>Cancelar</Button>
          </Dialog.Actions>
          )
        }
      </>
    );
  };
  const Loading = () => {
    return (
      <Row>
        <ActivityIndicator
          animating={calling.process === 1}
          color={Colors.red800}
        />
        <Paragraph>
          {calling.process === 1
            ? 'Enviando.. Por favor Espere'
            : 'envio Realizado'}
        </Paragraph>
      </Row>
    );
  };
  return (
    <Dialog visible={visible} onDismiss={hideDialog}>
      {calling.process !== 0 ? (
        <Dialog.Content>
          <Loading />
        </Dialog.Content>
      ) : (
        <Table />
      )}
    </Dialog>
  );
};

export default Pedido;
