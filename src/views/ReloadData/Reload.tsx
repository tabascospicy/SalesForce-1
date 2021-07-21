import React, {useContext, useState} from 'react';
import {useEffect} from 'react';
import {Button, Dimensions, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
const {height} = Dimensions.get('window');
import Context from 'services/context';
import {useRef} from 'react';
import {Title} from 'react-native-paper';
import {theme} from "theme"
import useOnview from 'Hooks/onView';
import LoadingAnimation from './LoadAnimation';
const Content = styled.View`
  flex-grow: 1;
  background-color:${theme.primary};
  align-items: center;
  justify-content: center;
`;

const Box = styled.View`
  background-color: white;
  width: 90%;
  height: ${height / 3 + 100}px;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 30px;
  padding: 30px;
`;
const Cosas = styled.View`
  flex-grow: 1;
  position: absolute;

  bottom: 20px;
`;

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,
  },
});
const Reload = ({navigation}: any) => {
  const {
    calling,
    mensaje,
    percent,
    handleCall,
    CheckAndStart,
    handleDescuento,
  } = useContext(Context);
  

  const eventRef = useRef(() => {});
  const onInit = () => {
    eventRef.current = navigation.addListener('beforeRemove', (e) => {
      if (calling.loading) {
        e.preventDefault();
        return;
      }
    });
  };
  const cleanEvent = () => eventRef.current();
  useOnview({navigation, callback: cleanEvent, onInit});
 const goBack = ()=>{
  navigation.navigate('Clientes');
 }
  useEffect(() => {
    handleDescuento && handleDescuento(0);
    if (!calling.loading) {
      CheckAndStart && CheckAndStart(goBack);
    }
  }, []);

  const Load = async () => {
    if (calling.success === false) {
      CheckAndStart && CheckAndStart(goBack);
    } else {
      handleCall && handleCall({success: null, loading: false});
      navigation.navigate('Clientes');
    }
  };
  return (
    <Content>
      <Box style={style.shadow}>
        <LoadingAnimation {...{calling: calling as CallStatus}} />
        <Cosas>
          <Title>
            {mensaje} {percent.toFixed(2)}%
          </Title>
          {!calling.loading && (
            <Button
              color={theme.secondary}
              title={
                calling.success != null && calling.success === true
                  ? 'Ir a Inicio'
                  : 'Reintentar'
              }
              onPress={Load}></Button>
          )}
        </Cosas>
      </Box>
    </Content>
  );
};

export default Reload;
