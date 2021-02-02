import { Pressable } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-grow: 1;
  margin-top: 20px;
  position: relative;
  z-index: 9;
  flex-wrap: wrap;
`;
export const Enviar = styled(Pressable)`
  padding: 20px;
  align-self: center;
  background-color: #e05263;
  border-radius: 10px;
  margin-top: auto;
  margin-bottom: 30px;
`;
export const EnviarText = styled.Text`
  font-size: 20px;
  color: white;
`;
export const Detalles = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
export const Info = styled.Text`
  font-size: 20px;
  opacity: 0.8;
  padding: 10px;
`;

export const PList = styled.View`
  background-color: white;
  width: 97%;
  border-radius: 12px;
  align-self: center;
  padding: 10px;
  flex-wrap: wrap;
`;
export const Client = styled.View`
  background-color: white;
  width: 97%;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 12px;
  align-self: center;
`;
export const ClientInfo = styled.Text`
  font-weight: bold;
  font-size: 17px;
`;
export const Bold = styled.Text`
  font-weight: 500;
`;
export const Total = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  color: white;
  border-radius: 13px;
  align-self: flex-start;
  background-color: #43aa8b;
  margin-top: 10px;
`;

export const Del = styled(Pressable)`
  padding:10px;
  padding-right:20px;
  padding-left:20px;
  border-radius:5px;
  background-color: #c23c43;
`
export const DelText = styled.Text`
font-size:13px;
color:white;
font-weight: bold;
`