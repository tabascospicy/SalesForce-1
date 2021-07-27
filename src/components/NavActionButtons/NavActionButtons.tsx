import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from 'services/context';
import {useContext} from 'react';
import {Font} from 'styles';
import { IconButton, Colors } from 'react-native-paper';

const MyComponent = () => (
  <IconButtons
    icon="camera"
    color={Colors.red500}
    size={20}
    onPress={() => console.log('Pressed')}
  />
);
import {theme} from "theme";
import {Button} from 'react-native-paper';
const Container = styled.View`
  flex-direction: column;
  z-index: 8;
  align-items: center;
  max-height: 50px;
`;
const Actions = styled.View`
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

const IconButtons = styled(Icon.Button)`
  background-color: ${(props) => (props.outlined ? 'white' : theme.primary)};
`;

const Fecha = styled(Font)`
  color: white;
  font-size: 13px;
  text-align: center;
  margin:auto;
  flex-grow: 1;
`;
const NavActionButtons = ({
  toggle,
  cart = false,
  list,
  menu = true,
  back = false,
  outlined = false,
  relo,
  disabled = false,
  ...props
}: any) => {
  const {fecha} = useContext(Context);
  const handleBack = () => {
    props.navigation.goBack();
  };
  const reload = () => {
    props.navigation.navigate('Load');
  };
  const gotoCart = () => {
    props.navigation.navigate('Cart');
  };
  return (
    <Container>
      <Actions>
        {menu && (
          <IconButtons
            outlined={outlined}
            onPress={() => props.pressed('nav')}
            name="menu-outline"
            size={30}
            color={outlined ? theme.primary : 'white'}
          />
          
        )}
        {back && (
          <IconButton
          icon="arrow-left"
          outlined={outlined}
          onPress={handleBack}
          color={"white"}
          size={25}
        />
        )}
        <Fecha>{fecha} </Fecha>
        {(list && !disabled) && (
           <IconButton
           onPress={gotoCart}
           icon="cart"
           outlined={outlined}
           color={outlined ? theme.primary : 'white'}
           size={25}
         />
        )}
        {relo && (
         
          <IconButton
          outlined={outlined}
          onPress={reload}
          icon="reload"
          size={25}
          color={outlined ? theme.primary : 'white'}
        />
        )}
      </Actions>
    </Container>
  );
};

export default React.memo(NavActionButtons);
