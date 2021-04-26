import React, { useContext } from "react";
import { useState } from "react";
import { Pressable } from "react-native";
import {DataTable} from 'react-native-paper';
import styled from "styled-components/native";
import { Font } from "styles";
import Context from 'services/context';
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
  const {clientes} = useContext(Context)
  const fromR: number = pedidosPage * 6;
  const toR: number = (pedidosPage + 1) * 6;
  return(
    <DataTable>
    <DataTable.Header>
      <DataTable.Title >numero</DataTable.Title>
      <DataTable.Title >Cliente</DataTable.Title>
      <DataTable.Title >Fecha</DataTable.Title>
      <DataTable.Title numeric>total</DataTable.Title>
     
    </DataTable.Header>
    {!pedidos[0] ? (
      <Info>No hay Pedidos Realizados</Info>
    ) : (
      pedidos.map((element:IPedidosConDetalles, key:number) => {
        if (fromR <= key && key < toR) {
          const cliente = clientes?.find((x => element.adm_clientes_id === x.id ));
          const nombre = cliente?.nombre || "No encontrado"
          return (
            <Pressable
              key={key}
              android_ripple={{color: '#908e8e45'}}
              onPress={() => select(element)}>
              <DataTable.Row>
                <DataTable.Cell>{element.id}</DataTable.Cell>
                <DataTable.Cell><Font style={{fontSize:8,fontWeight:"bold"}}>{nombre}</Font></DataTable.Cell>
                <DataTable.Cell>{<Font style={{fontSize:10,fontWeight:"bold"}}>{element.fecha.split(" ")[0]}</Font>}</DataTable.Cell>
                <DataTable.Cell numeric ><Font style={{fontSize:10,fontWeight:"bold"}}>{element.total.toFixed(2)}</Font></DataTable.Cell>
                
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