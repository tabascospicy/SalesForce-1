import React from "react";
import { } from "./style"
import styled from "styled-components/native"
import { Caption, Text, Button } from 'react-native-paper';
import { Font } from "styles"
import accounting from "accounting"
export const FacturaContainer = styled.View`
  width: 95%;
  align-self: center;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom:20px;
  border-radius: 20px;
`;

export const Column = styled.View`
flex-direction: column;
flex:1;
`
const Row = styled.View`
  flex-direction:row;
`

const Title = styled(Font)`
  font-size:15;
  font-weight:bold;
`
const Pago = (props) => {
  console.log({ lol: props.item })
  const { item } = props
  return (
    <FacturaContainer>
      <Row>
      <Column>
        <Caption>Metodo</Caption>
        <Title>{props.item.adm_tipo_pago_id.split("_")[0]}</Title>
      </Column>
      <Column>
        <Caption>Monto</Caption>
        <Title >{props.item.moneda.includes("USD") ? "$" : "Bs"}{accounting.formatMoney(props.item.monto, {
          symbol: '',
          thousand: '.',
          decimal: ',',
          precision: 2})}</Title>
      </Column></Row>
      {props.item.adm_tipo_pago_id.split("_")[0] === "TRANSFERENCIA" &&<>
      <Column>
          <Caption>Referencia</Caption>
          <Title >{item.referencia}</Title>
        </Column>
        <Row>
        <Column>
          <Caption>Banco Destino</Caption>
          <Title>{item.bancoDestino.split("_")[0]}</Title>
        </Column>
        <Column>
            <Caption>Banco origen</Caption>
            <Title >{item.banco_id.split("_")[0]}</Title>
          </Column></Row>
        </>
}
    </FacturaContainer>
  );
}

export default Pago;