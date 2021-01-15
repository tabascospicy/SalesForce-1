import React, { useEffect } from "react";
import { useState } from "react";
import { Pressable } from "react-native";
import {DataTable} from 'react-native-paper';
import styled from "styled-components/native";
const Info = styled.Text``;
type Props = {
  pendientes:PedidoPendiente[],
  select:any,
  status:StatusPedido[]
}
const pendientes:React.FC<Props> = ({pendientes,select,status}) => {
 
  const [pendientesPage, setPendientesPage] = useState<number>(0);
 
  
  const fromP: number = pendientesPage * 6;
  const toP: number = (pendientesPage + 1) * 6;
  return (
    <DataTable>
    <DataTable.Header>
      <DataTable.Title>Fecha</DataTable.Title>
      <DataTable.Title >Total</DataTable.Title>
      <DataTable.Title numeric>Estado</DataTable.Title>
    </DataTable.Header>
    {!pendientes[0] ? (
      <Info>No hay Pedidos Sin Enviar</Info>
    ) : (
      pendientes.map((element:PedidoPendiente, key:number) => {
        if (fromP <= key && key < toP) {
          return (
            <Pressable
              key={key}
              android_ripple={{color: '#908e8e45'}}
              onPress={() => select(element.show,element)}>
              <DataTable.Row key={key}>
                <DataTable.Cell>{element.fecha}</DataTable.Cell>
                <DataTable.Cell>{element.total}</DataTable.Cell>
                <DataTable.Cell>sin enviar</DataTable.Cell>
              </DataTable.Row>
            </Pressable>
          );
        }
      })
    )}
    <DataTable.Pagination
      page={pendientesPage}
      numberOfPages={Math.floor(pendientes.length / 5) || 1}
      onPageChange={(page:number) => {
        setPendientesPage(page);
      }}
      label={` ${pendientesPage} of ${
        Math.floor(pendientes.length / 5) || 1
      }`}
    />
  </DataTable>
  );
}

export default pendientes;