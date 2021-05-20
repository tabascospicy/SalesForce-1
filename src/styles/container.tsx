import styled, { css } from "styled-components/native";
import {StyleSheet} from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import {Text} from "react-native-paper";
import {theme} from "theme";
export const Container = styled(SafeAreaView)`
  background-color:${({color}:any)=>color};
  align-items:${({align}:any) => align ? align : "center"};
  justify-content:${({justify}:any) => justify ? justify : "center"};
  position:relative;
`

export const Borders = styled(Container)`
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
  `
export const Font = styled(Text)`
  font-family:${({font=null}:any)=>font ? font : "RobotoCondensed-Regular"};
  letter-spacing:0.5px;
  color:${theme["primary-font"]};
  
`
export const InitFont = styled(Text)`
  font-family:"Anton-Regular";
`;
export const f = css`
  font-family:${({font=null}:any)=>font ? font : "Nunito-Regular"};
`
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
});