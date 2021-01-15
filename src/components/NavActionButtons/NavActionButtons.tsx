import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from 'services/context';
import {useContext} from 'react';
import {Font} from "styles"
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

const IconButton = styled(Icon.Button)`
  background-color: ${(props) => (props.outlined ? 'white' : '#484aa3')};
`;
const Fecha = styled(Font)`
  color: white;
  font-size: 10px;
  text-align: left;
  font-weight: bold;
  align-self: center;
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
  ...props
}: any) => {
  const {fecha} = useContext(Context);
  const handleBack = () => {
    props.navigation.goBack();
  };
  const reload = () => {
    props.navigation.navigate('Load');
  };
  return (
    <Container>
      <Actions>
        {menu && (
          <IconButton
            outlined={outlined}
            onPress={() => props.pressed('nav')}
            name="menu-outline"
            size={30}
            color={outlined ? '#484aa3' : 'white'}
          />
        )}
        {back && (
          <IconButton
            outlined={outlined}
            onPress={handleBack}
            name="arrow-back"
            size={30}
            color={outlined ? '#484aa3' : 'white'}
          />
        )}
        <Fecha>{fecha} </Fecha>
        {list && (
          <IconButton
            outlined={outlined}
            onPress={toggle}
            name="cart"
            size={30}
            color={outlined ? '#484aa3' : 'white'}
          />
        )}
        {relo && (
          <IconButton
            outlined={outlined}
            onPress={reload}
            name="reload-outline"
            size={30}
            color={outlined ? '#484aa3' : 'white'}
          />
        )}
      </Actions>
    </Container>
  );
};

export default React.memo(NavActionButtons);
