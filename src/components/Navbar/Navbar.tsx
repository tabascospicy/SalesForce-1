import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from 'services/context';
import {useContext} from 'react';
import {Animated} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {Dimensions} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {Font} from "styles";
import {theme} from "theme";
const {width} = Dimensions.get("screen");
const Nav = styled(Animated.View)`
  width: 98%;
  align-self: center;
  background-color: ${theme.primary};
  align-items: center;
  flex-direction: row;
  
  padding: 5px;
  z-index: 1;
`;
const Name = styled(Font)`
  font-size: 18px;
  color: white;
`;
const Button = styled(PaperButton)`
  
  
`
const Fecha = styled(Font)`
  color: white;
  font-size: 13px;
  text-align: center;
`;
const Des = styled.View`
  align-items:center;
  margin:auto;
  flex-direction: column;
`;
const Box = styled.View`
 width: ${width/7}px;
`
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
    <Nav >
      <Box>
      <Button
        style={{marginLeft:-10}}
        onPress={() => pressed('nav')}
        color={theme.secondary}
        >
          
        <Icon size={30} color={'white'} name="menu-outline" />
      </Button>
      </Box>
      <Des>
        <Name font={"Nunito-SemiBold"}>Lista de clientes</Name>
        <Fecha>{fecha}</Fecha>
      </Des>
      <Box>
      <Button
        onPress={reload}
        color={theme.secondary}
       >
        <Icon size={25} color={'white'} name="reload-outline" />
      </Button>
      </Box>
    </Nav>
  );
};

export default Navbar;
