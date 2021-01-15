import styled from 'styled-components/native';
import {Dimensions, Pressable,StyleSheet,Animated} from 'react-native';
import {Font} from "styles"

export const {height,width} = Dimensions.get('window');

const Button = Animated.createAnimatedComponent(Pressable)

export const Container = styled(Button)`
  background-color:white;
  border-radius:10px;
`;

export const AnimateContent = styled(Animated.View)`
height: ${height / 10}px;
margin: 5px;
width: ${width-30}px;
padding:10px;

flex-direction: row;
align-items: center;
`

export const Info = styled.View`
  flex-grow: 1;
  flex-direction: column;
  padding-left:10px;
`;

export const Name = styled(Font)`
  font-size: 20px;
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