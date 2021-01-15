import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from 'services/context';
import {useContext} from 'react';
import {Animated} from 'react-native';
import {Button} from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import {Font} from "styles";
const Nav = styled(Animated.View)`
  width: 98%;
  align-self: center;
  background-color: #484aa3;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 5px;
  margin-top: 3px;
  z-index: 1;
`;
const Name = styled(Font)`
  font-size: 16px;
  color: white;
`;
const Fecha = styled(Font)`
  color: white;
  font-size: 10px;
  text-align: center;
`;
const Des = styled.View`
  margin: auto;
  flex-direction: column;
`;

type ProfileScreenNavigationProp = StackNavigationProp<{}>;

interface NavBarProps extends VisualState {
  name: string;
  animate: any;
  navigation:ProfileScreenNavigationProp,
  cart?: boolean;
  pressed: () => void;
}

const Navbar = ({
  name,
  navigation,
  pressed,
  cart,
  animate = null,
  ...props
}: NavBarProps) => {
  const {fecha} = useContext(Context);
  const reload = () => {
    navigation.navigate('Load');
  };
  return (
    <Nav>
      <Button
        onPress={() => pressed('nav')}
       
        icon={() => <Icon size={30} color={'white'} name="menu-outline" />}
        color="#484aa3"
        >
        {''}
      </Button>
      <Des>
        <Name font={"Nunito-SemiBold"}>Lista De Clientes</Name>
        <Fecha>{fecha}</Fecha>
      </Des>
      <Button
        onPress={reload}
       
        icon={() => <Icon size={30} color={'white'} name="reload-outline" />}
        color="#484aa3"
       >
        {''}
      </Button>
    </Nav>
  );
};

export default Navbar;
