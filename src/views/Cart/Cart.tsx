import React, {useEffect, useContext, Fragment, useState} from 'react';
import { Pressable, Text, View} from 'react-native';
import styled from 'styled-components/native';

import List from './List';
import Context from 'services/context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Font } from 'styles';
import {theme } from "theme"
import { IconButton } from 'react-native-paper';
const CartContainer = styled.View`
  flex-grow: 1;
  z-index: 5;
  background-color: #f8f9fa;
  flex-direction: column;
  z-index: 20;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
  background-color: white;
  align-items: center;
`;
const Title = styled(Font)`
  font-weight: bold;
  opacity: 0.9;
  font-size: 30px;
  flex-grow: 1;
  text-align: center;
`;
const IconContainer = styled.View`
  flex-direction: row;
  flex:1;
  align-items: center;
`;
const Number = styled(Font)`
  font-size: 15px;
  padding: 5px;
  border-radius: 50px;
  border-width: 1px;
  border-color: black;
`;
const BottomLabel = styled.View`
  padding: 20px;
  justify-content: space-around;
  background-color: white;
  align-items: center;
`;
const Label = styled(Font)`
font-size: 15px;
  font-weight:bold;`
const Total = styled(Font)`
  font-size: 15px;
  font-weight:bold;
`;

const Ordernar = styled(Pressable)`
  padding: 15px;
  color: white;
  width:85%;
  border-radius:25px;
  elevation:3;
  background-color: ${theme.secondary};
  align-items: center;
`;
const OrdernarText = styled(Font)`
  font-weight: bold;
  font-size:15px;
`
const TotalBox = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

type CartProps = {
  navigation:StackNavigationProp<{}>;
  showQr?:()=>void,
}
const Cart = ({navigation, showQr, ...props}:CartProps) => {
  const nav = () => {
    requestAnimationFrame(()=>{
      navigation.navigate('Checkout');
    })
  };
  const handleBack = () => {
    props.navigation.goBack();
  };
  const {colors} = useContext(Context);
  return (
    <CartContainer>
      <TitleContainer>
        <IconContainer>
        <IconButton
          icon="arrow-left"
         
          onPress={handleBack}
          color={"black"}
          size={25}
        />
        </IconContainer>
        <Title style={{color:colors["primary-font"]}} >Carrito</Title>
        <View style={{flex:1}}></View>
      </TitleContainer>
      <List {...{isOpen:false}}  />
      <BottomLabel>
        <Totales {...{ nav,navigation}} />
      </BottomLabel>
    </CartContainer>
  );
};


interface TotalesProps  extends CartProps {
  nav:()=>void
}
const def = {
  id: 0,
  nombre: "ninguno",
  dia_inicial: 0,
  dia_final: 0,
  descuento: "0"
}
const Totales = ({navigation,nav}:TotalesProps) => {
  const {descuento, total,colors} = useContext(Context);
  const [desUi,setDesUi] = useState<string>("0");
  const Monto = total ? total.toFixed(2) : "0";
  useEffect(()=>{
  const des = {descuento:descuento?.descuento};
  descuento  && setDesUi(des.descuento);
  },[descuento])
  useEffect(()=>{
    const des = {descuento:descuento?.descuento}
    descuento && setDesUi(des.descuento);
    },[])
  return (
    <Fragment>
      <TotalBox>
        <Row>
          <Label>Total:</Label>
          <Total>${Monto}</Total>
        </Row>
        {parseInt(desUi) !== 0 && (
          <Row>
            <Total>Descuento</Total>
            <Total> {desUi}%</Total>
          </Row>
        )}
      </TotalBox>
      <Ordernar onPress={nav} android_ripple={{color:"white"}}>
        <OrdernarText style={{color: 'white',fontWeight:"bold"}}>ORDENAR</OrdernarText>
      </Ordernar>
    </Fragment>
  );
};

export default React.memo(Cart);
