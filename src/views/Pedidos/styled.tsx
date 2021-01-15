import styled from "styled-components/native";
import {StyleSheet} from "react-native";
const GlobalContainer = styled.View`
  flex-grow: 1;
  background-color: #f5f5f8;
  flex-direction: column;
  position: relative;
`;

const Content = styled.View`
  flex-grow: 1;
`;
const Card = styled.View`
  width: 95%;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  margin-top: 20px;
  align-self: center;
`;
const BlueBackground = styled.View`
  background-color: #484aa3;
  width: 100%;
  z-index: 20;
`;

const Productos = styled.Text`
  font-size: 23px;
  margin-top: 30px;
  text-align: left;
  width: 80%;
  font-weight: bold;
  color: white;
  opacity: 0.9;
  align-self: center;
`;
const Title = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: bold;
`;
const NavButtons = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 5px;
  margin-left:10px;
`;
const Style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
const Info = styled.Text``;

export {
  Info,
  Style,
  NavButtons,
  Title,
  Productos,
  BlueBackground,
  Card,
  Content,
  GlobalContainer
}