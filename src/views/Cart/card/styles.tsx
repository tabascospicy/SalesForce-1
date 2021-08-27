import { Pressable , Dimensions} from "react-native";
import styled from "styled-components/native";
import { Font } from "styles";

const {width} = Dimensions.get("screen");
export const Product = styled(Pressable)`
  min-height: 40px;
  max-height:120px;
  border-radius:10px;
  padding: 10px;
  justify-content: center;
  align-items:center;
  margin-bottom: 10px;
  flex-wrap:wrap;
  flex-direction: row;
`;
export const Description = styled(Font)`
  
  flex-direction: column;
  font-weight: bold;
  color: black;
  opacity:0.7;
  font-size: 15px;
`;
export const Cantidad = styled.TextInput`

  flex-direction: column;
  text-align: center;
  font-weight: bold;
  color: black;
  opacity:0.7;
  font-size: 15px;
`;

export const DescriptionContent = styled.View`
  flex-grow: 1;
  height:100%;
  padding-top:10px;
  padding-bottom:10px;
  max-width: ${width/2 -50}px;
`;

export const ProductTitle = styled(Font)`
align-self:flex-start;
font-weight: bold;
margin-bottom: auto;
`
export const PlusActions = styled.View`
  height: 100%;
  flex:1;
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