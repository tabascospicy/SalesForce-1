import styled from "styled-components/native";
import {theme} from "theme";
export const GlobalContainer = styled.View`
  flex-grow: 1;
  background-color: #f5f5f8;
  flex-direction: column;
  position: relative;
`;

export const Content = styled.View`
  flex-grow: 1;
  flex-direction: column;
`;

export const BlueBackground = styled.View`
  border-bottom-right-radius:20px;
  border-bottom-left-radius:20px;
  background-color:${theme.primary};
  width: 100%;
  padding-bottom:20px;
`;
export const Card = styled.View`
  padding: 30px;
  width: 87%;
  align-self: center;
  align-items: flex-start;
  margin-top: 20px;
  background-color: white;
`;
export const Data = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

