import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Caption, Title, Text, Button} from 'react-native-paper';
import {FacturaContainer, Row} from './style';
import {Transition, Transitioning} from 'react-native-reanimated';
import reactotron from 'reactotron-react-native';
import {style} from "styles/container";
import {View} from 'react-native';
import moment from "moment"
type facturaProps = {
  item: Factura;
  tipo:string;
  ShowDetalles:(x:DetalleFactura[],id:Factura)=>void;
  showPagar:(id:number)=>void;
  id:number
};

const Factura = ({item,tipo="",ShowDetalles,showPagar,id}: facturaProps) => {
  const [pressed, setPressed] = useState(false);
  const transitionRef = useRef();
  const handle = ()=>{
    showPagar(item.id);
  }
  const transition = (
    <Transition.Together>
      <Transition.Change
        interpolation="easeInOut"
        durationMs={200}>
            <Transition.In
        type="fade"
        interpolation="easeInOut"
        durationMs={200}></Transition.In>
      <Transition.Out
        type="fade"
        interpolation="easeInOut"
        durationMs={200}></Transition.Out>
        </Transition.Change>
    
    </Transition.Together>
  );
  const handlePress = () => {
    transitionRef.current.animateNextTransition();
    setPressed(!pressed);
  };

  const calcularMonto = useMemo(()=>{

    return parseFloat(item.subtotal_dolar || "0") + parseFloat(item.iva_dolar ||"0") - parseFloat(item.descuento_dolar || "0")
  },[])
  const monto = calcularMonto;
  const Action = () =>{
    ShowDetalles(item.detalles,item);
  }
  return (
    <FacturaContainer
      style={style.shadow}
      ref={transitionRef}
      transition={transition}>
      <Row>
        <View>
          <Title>{item.numero_factura}</Title>
          <Caption> SubTotal : {item.subtotal_dolar}</Caption>
          <Text>Monto : {monto.toFixed(2)}</Text>
          <Caption>{moment(item.fecha_at).format("LLL")}</Caption>
        </View>
        <Button icon={'details'} onPress={handlePress}>
          Detalles
        </Button>
      </Row>
      {pressed && (
        <>
          <Row>
            <Caption>Nro Fiscal : </Caption>
            <Text>{item.numero_fiscal}</Text>
          </Row>
          <Row>
            <Caption>Tipo Factura :</Caption>
            <Text>{tipo}</Text>
          </Row>
          <Row>
            <Caption> Serial Impresora</Caption>
            <Text>{item.serial_impresora}</Text>
          </Row>
          <Button onPress={Action}>Mas</Button>
        </>
      )}
    </FacturaContainer>
  );
};

export default Factura;
