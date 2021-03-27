import React, {useEffect, useContext, Fragment, useState} from 'react';
import {Easing, Dimensions, Pressable, Text} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import List from './List';
import {Surface} from 'react-native-paper';
import Context from 'services/context';
import reactotron from 'reactotron-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Font } from 'styles';
const CartContainer = styled.View`
  flex-grow: 1;
  z-index: 5;
  height: 100%;
  width: 80%;
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
  flex-direction: row;
  padding: 20px;
  justify-content: space-around;
  background-color: white;
  align-items: center;
`;
const Label = styled(Font)``
const Total = styled(Font)`
  font-size: 13px;
`;

const Ordernar = styled(Pressable)`
  padding: 10px;
  color: white;
  background-color: #e05263;
`;
const QrButton = styled(Pressable)`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;
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
    props.pressed();
    requestAnimationFrame(()=>{
      navigation.navigate('Checkout');
    })
  };
  reactotron.log(props.isOpen,"menu");
  const {carrito,colors} = useContext(Context);
  return (
    <CartContainer>
      <TitleContainer>
        <IconContainer>
          <Number style={{color:colors["primary-font"]}}>{carrito.length}</Number>
          <Icon name="cart" size={30} color={colors["primary-font"]} />
        </IconContainer>
        <Title style={{color:colors["primary-font"]}} >Carrito</Title>
      </TitleContainer>
      <List {...{isOpen:false}}  />
      <BottomLabel>
        <QrButton onPress={showQr} android_ripple={{color: 'pink', radius: 20}}>
          <Icon size={20} name="qr-code-outline"></Icon>
        </QrButton>
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
          <Total>{Monto}</Total>
        </Row>
        {parseInt(desUi) !== 0 && (
          <Row>
            <Total>Descuento</Total>
            <Total> {desUi}%</Total>
          </Row>
        )}
      </TotalBox>
      <Ordernar onPress={nav}>
        <Text style={{color: 'white'}}>Ordenar</Text>
      </Ordernar>
    </Fragment>
  );
};

export default React.memo(Cart);
