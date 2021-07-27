import { Pressable } from "react-native";
import styled from "styled-components/native";
import { Font } from "styles";

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
  font-weight: bold;
  color: black;
  opacity:0.7;
  font-size: 15px;
`;

export const DescriptionContent = styled.View`
  justify-content: center;
  flex-grow: 1;
`;
export const PlusActions = styled.View`
  height: 100%;
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