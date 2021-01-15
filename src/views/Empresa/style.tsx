import styled from "styled-components/native";
import {Font} from "styles";
export const GlobalContainer = styled.View`
  flex-grow: 1;
  background-color: #f5f5f8;
  flex-direction: column;
  position: relative;
`;

export const Content = styled.View`
  flex-grow:1;

  flex-direction: column;
  
  margin-top:40px;
`;
export const BlueBackground = styled.View`
  position: absolute;
  top: -10px;
  border-radius:10px;
  height: 33%;
  background-color: #484aa3;
  width: 100%;
  min-height:200px;
`;
export const Productos = styled(Font)`
font-size:22px;
padding-top:30px;
padding-bottom:10px;
text-align:left;
width:80%;
font-weight:bold;
opacity:0.7;
align-self:center;
`
