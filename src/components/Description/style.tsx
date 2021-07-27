import styled from "styled-components/native";
import { Font } from "styles";
import {StyleSheet} from "react-native";
export const Container = styled.View`
  width: 70%;

  align-self: center;
  padding-top:15px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
 
`;
export const Portada = styled.View`
  align-items: center;
  justify-content: center;
`;
export const Name = styled(Font)`
  font-size: 23px;
  color: white;
  padding-bottom: 10px;
`;
export const Direction = styled(Font)`
  font-size: 15px;
  color: white;
  padding-bottom: 5px;
`;
export const shadow = StyleSheet.create({
  shadow: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});