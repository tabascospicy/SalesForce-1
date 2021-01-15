import { Pressable } from "react-native";
import styled from "styled-components/native";
import { Font } from "styles";

export const Product = styled(Pressable)`
  flex-grow: 1;
  min-height: 40px;
  max-height:120px;
  background-color:white;
  border-radius:10px;
  padding: 10px;
  justify-content: center;
  align-items:center;
  margin-bottom: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const Description = styled(Font)`
  flex-wrap: wrap;
  flex-direction: column;
  font-weight: bold;
  color: black;
  opacity:0.7;
  font-size: 8px;
`;
export const Cantidad = styled.TextInput`
  flex-wrap: wrap;
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
  max-width: 50px;
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