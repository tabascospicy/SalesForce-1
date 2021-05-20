import React, {useContext, useMemo, useRef, useState} from 'react';
import {Caption, Title, Text, Button} from 'react-native-paper';
import {FacturaContainer, Row,shadowSet} from './style';
import {Transition, Transitioning} from 'react-native-reanimated';
import Context from "services/context"
import {style} from "styles/container";
import {View} from 'react-native';
import { Badge } from 'react-native-paper';
import moment from "moment";
import {BoxShadow} from 'react-native-shadow';
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
  const {colors} = useContext(Context);
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
          <View style={{flexDirection:"row"}}>
            <Badge style={{marginBottom:"auto",marginTop:"auto",backgroundColor:colors?.buttonsLight2}} visible={true} size={10}></Badge>
             <Title> Nro {item.numero_factura}</Title>
          </View>
          <Caption>SubTotal : {item.subtotal_dolar}</Caption>
          <Text>Monto : {monto.toFixed(2)}</Text>
          <Caption>{moment(item.fecha_at).format("LLL")}</Caption>
        </View>
        <Button color={colors?.buttonsLight2} icon={'dots-vertical'} onPress={handlePress}>
          Detalles
        </Button>
      </Row>
      {pressed && (
        <>
          <Row>
            <Caption>Nro Fiscal </Caption>
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
          <Button color={colors?.ButtonStrong} onPress={Action}>Ir a Pagar</Button>
        </>
      )}
    </FacturaContainer>
  );
};

export default Factura;
