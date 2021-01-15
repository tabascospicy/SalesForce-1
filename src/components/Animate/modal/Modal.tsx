import React from 'react';
import {Dimensions, Pressable, View} from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import Animate from './../index';
import {Text} from 'react-native';
import { Paragraph } from 'react-native-paper';
const {height} = Dimensions.get('window');

const Container = styled(Pressable)`
  background-color:rgba(0,0,0,0.4)
  z-index:1;
  position:absolute;
  top:0;
  flex-grow:1;
  height:100%;
  width:100%;
  justify-content:center;
  align-items:center;
`;

const Box = styled.View`
  width: ${props=>props.width}%;
  height: ${props=>props.height}%;
  position: relative;
  padding:10px;
  background-color: white;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const Modal = ({
  show,
  lott = true,
  children,
  message = '',
  disable = () => {},
  height='70',
  width='70',
}: modalProps) => {
  return (
    <Animate.In
      condition={show}
      style={{
        zIndex: show ? 9 : 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Box height={height} width={width}>
          {lott ? (
            <>
              <LottieView
                source={require('assets/lottie/loading.json')}
                autoPlay
                loop
              />
              <Paragraph style={{position: 'absolute', bottom: 0, marginBottom: 20}}>
                {message}
              </Paragraph>
            </>
          ) : (
            children
          )}
        </Box>
        <Container onPress={disable}></Container>
      </View>
    </Animate.In>
  );
};

export default React.memo(Modal);
