import { Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";
import { Font } from "styles";
import {Caption} from "react-native-paper"
export const {width,height} = Dimensions.get("window");
export const Product = styled(Pressable)`
  flex-grow: 1;
  height: ${height/9}px;
  width: ${width -10}px;
  background-color:white;
  border-radius:10px;
  padding: 10px;
  justify-content: center;
  align-items:center;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const Column  = styled.View`
 flex-grow: 1;
 flex-direction:column;
`

  export const Subtitle = styled(Font)`
     font-weight: bold;
  opacity: 0.6;
  font-size: 14px;
  text-align: center;
  `


export const Description = styled(Font)`
  flex-wrap: wrap;
  flex-direction: column;
  font-weight: bold;
  color: black;
  opacity:0.7;
  font-size: 10px;
`;
export const Price = styled(Description)`
  font-size:15px;
  margin-top:4px;
`
export const Cantidad = styled(Caption)`
  flex-wrap: wrap;
  flex-direction: column;
  font-weight: bold;
  color: black;
  opacity:0.7;
  font-size: 15px;
`;
export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
  background-color: white;
  align-items: center;
`;
export const Title = styled(Font)`
  font-weight: bold;
  opacity: 0.9;
  font-size: 20px;
  text-align: center;
`;
export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const DescriptionContent = styled.View`
  justify-content: center;
  flex-grow: 1;
`;
export const PlusActions = styled.View`
  height: 100%;
  max-width: 100px;
  align-items: center;
  justify-content: space-between;
`;
export const Plus = styled(Pressable)`
    border-radius:3px;
    padding:13px;
    padding-top:5px;
    padding-bottom:5px;
    background-color:#484aa3;
`;
export const Symbol = styled(Font)`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const Container = styled.SafeAreaView`
  flex-grow: 1;
  padding: 10px;
  padding-right:5px;
  width: 100%;
`;


export const List = styled.ScrollView``;

export const Number = styled(Font)`
  font-size: 15px;
  padding: 5px;
  border-radius: 50px;
  border-width: 1px;
  border-color: black;
`;