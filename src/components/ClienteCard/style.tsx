import styled from 'styled-components/native';
import {Dimensions, Pressable,StyleSheet,Animated} from 'react-native';
import {Font} from "styles"

export const {height,width} = Dimensions.get('window');

export const Container = styled(Pressable)`
width: ${width-30}px;
padding:10px;
flex-direction: row;
align-items: center;
background-color:white;
border-radius:10px;
align-self:center;
margin-bottom:10px;
`;

export const Info = styled.View`
  flex-direction: column;
  flex:1;
`;

export const Name = styled(Font)`
  font-size: 18px;
  opacity: 0.9;
`;
export const Direccion = styled(Font)`
  opacity: 0.7;
  font-size: 12px;
`;
export const Style = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});