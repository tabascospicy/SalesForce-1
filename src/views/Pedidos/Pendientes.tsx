import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Pressable } from "react-native";
import {DataTable} from 'react-native-paper';
import styled from "styled-components/native";
import {Font} from "styles";
import Context from 'services/context';
const Info = styled.Text``;
type Props = {
  pendientes:PedidoPendiente[],
  select:any,
  status:StatusPedido[]
}
const pendientes:React.FC<Props> = ({pendientes,select,status}) => {
 
  const [pendientesPage, setPendientesPage] = useState<number>(0);
  const {clientes} = useContext(Context)
  
  const fromP: number = pendientesPage * 6;
  const toP: number = (pendientesPage + 1) * 6;
  return (
    <DataTable >
    <DataTable.Header>
      <DataTable.Title >id</DataTable.Title>
      <DataTable.Title  >Cliente</DataTable.Title>
      <DataTable.Title>Fecha</DataTable.Title>
      <DataTable.Title numeric>Total</DataTable.Title>
    </DataTable.Header>
    {!pendientes[0] ? (
      <Info>No hay Pedidos Sin Enviar</Info>
    ) : (
      pendientes.map((element:PedidoPendiente, key:number) => {
        if (fromP <= key && key < toP) {
          const cliente = clientes?.find((x => element.show.adm_clientes_id === x.id ));
          console.log(element.show);
          const nombre = cliente?.nombre || "No encontrado"
          return (
            <Pressable
              key={key}
              android_ripple={{color: '#908e8e45'}}
              onPress={() => select(element)}>
              <DataTable.Row key={key}>
                <DataTable.Cell>{element.id}</DataTable.Cell>
                <DataTable.Cell ><Font style={{fontSize:8,fontWeight:"bold"}}>{nombre}</Font></DataTable.Cell>
                <DataTable.Cell><Font style={{fontSize:8,fontWeight:"bold"}}>{element.fecha.split(" ")[0]}</Font></DataTable.Cell>
                <DataTable.Cell numeric><Font style={{fontSize:10,fontWeight:"bold"}}>{element.total.toFixed(2) }</Font></DataTable.Cell>
                
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

