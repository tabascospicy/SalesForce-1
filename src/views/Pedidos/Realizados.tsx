import React from "react";
import { useState } from "react";
import { Pressable } from "react-native";
import {DataTable} from 'react-native-paper';
import styled from "styled-components/native";
const Info = styled.Text``;
type Props = {
  pedidos:IPedidosConDetalles[],
  select:any,
  status:StatusPedido[],
  view:number,
  showMensaje:(m:MensajeContent)=>void,
}



const Realizados :React.FC<Props> = ({pedidos,select,status}) => {
  const [pedidosPage, setPedidosPage] = useState<number>(0);
  const fromR: number = pedidosPage * 6;
  const toR: number = (pedidosPage + 1) * 6;
  return(
    <DataTable>
    <DataTable.Header>
      <DataTable.Title>Fecha</DataTable.Title>
      <DataTable.Title numeric>total</DataTable.Title>
      <DataTable.Title numeric>estado</DataTable.Title>
    </DataTable.Header>
    {!pedidos[0] ? (
      <Info>No hay Pedidos Realizados</Info>
    ) : (
      pedidos.map((element:IPedidosConDetalles, key:number) => {
        if (fromR <= key && key < toR) {
          return (
            <Pressable
              key={key}
              android_ripple={{color: '#908e8e45'}}
              onPress={() => select(element)}>
              <DataTable.Row>
                <DataTable.Cell>{element.fecha}</DataTable.Cell>
                <DataTable.Cell numeric>{element.total.toFixed(2)}</DataTable.Cell>
                <DataTable.Cell numeric>{status[(element?.rest_estatus_id || 1 ) -1].nombre}</DataTable.Cell>
              </DataTable.Row>
            </Pressable>
          );
        }
      })
    )}
    <DataTable.Pagination
      page={pedidosPage}
      numberOfPages={Math.floor(pedidos.length / 5) || 1}
      onPageChange={(page) => {
        setPedidosPage(page);
      }}
      label={` ${pedidosPage} of ${Math.floor(pedidos.length / 5) || 1}`}
    />
  </DataTable>
  );
}

export default Realizados;