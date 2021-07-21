import { Dimensions } from "react-native";
import styled from "styled-components/native";
import {StyleSheet} from "react-native"
const {height,width} = Dimensions.get("screen")
import {Text} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {InitFont} from "styles";
import {theme } from "theme";
export const Content = styled(SafeAreaView)`
  flex-grow: 1;
  background-color: ${theme.primary} ;
  justify-content: flex-end;
  position: relative;
`;

export const Box = styled.View`
  background-color: white;
  flex-grow:1;
  padding:20px;
  position: relative;
  max-height: ${height / 3}px;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
  justify-content: center;
  align-items: center;
`;
export const Logo = styled.View`
  flex-grow:1;
  align-items: center;
  justify-content: center;
  position:relative;
`
export const LeftTitle = styled.View`
  position:absolute;
  flex-direction:column;
  align-items:center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width:${height/2+300}px;
`
export const Title1 = styled(InitFont)`
    font-size:50px;
    color:white;
    opacity:0.6;
`;
export const Title2 = styled(InitFont)`
  font-size:40px;
  opacity:0.4;
  color:white;
`;
export const Label = styled(Text)`
  font-size: 15px;
  color: black;
  font-weight:bold;
  opacity: 0.6;
`;
export const Title = styled(Text)`
  font-size: 23px;
  color: white;
  font-weight:bold;
  opacity: 0.9;
`;
export const Footer = styled(Text)`
  font-size: 15px;
  color: gray;
  opacity: 0.8;
  margin-top:auto;
  padding:10px;
`
export const Introducir = styled.TextInput`
  font-size: 20px;
  color: black;
  width: 80%;
  height: 45px;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-bottom: 10px;
`;

const TranslatetoBorder = width/3;
const TranslatetoBottom = 36;
export const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,

      height: 10,
    },

    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 2,
  },
  left:{
    flexWrap:"nowrap",
    transform: [{rotate:"90deg"},{translateY:TranslatetoBorder}],
  },
  align:{
    transform: [{translateY:TranslatetoBottom}],
  }

});