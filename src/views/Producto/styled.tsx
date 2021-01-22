import { Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";
import {StyleSheet} from "react-native";
import { Font } from "styles";

export const {height,width} = Dimensions.get('window');
export const Container = styled.View`
  flex-grow: 1;
  position: relative;
  background-color: #f5f5f8;
  z-index: 1;
`;

export const BlueBackground = styled.View`
  background-color: #484aa3;
  width: 100%;
  position: absolute;
  top: 0;
  height: ${height / 3 + 50}px;
`;

export const TopContent = styled.View`
  min-height: 200px;
  width: 100%;
`;
export const TopElements = styled.View`
  justify-content:space-between;
  padding:${height/16}px;
  align-items: center;
  height:${height/6}px;
`;
export const Tags = styled.View`
  align-items: flex-start;
  flex-wrap: wrap;
  background-color: #6567cc;
  border-radius:5px;
  padding:10px;

  justify-content: space-between;
`;
export const Tag = styled(Font)`
  font-size: 15px;
  padding: 3px;
  border-radius: 10px;
  margin:2px;
  opacity: 0.9;
`;
export const Bold = styled(Tag)`
  font-weight:bold;
`
export const Card = styled.View`
  padding: 20px;
  margin:10px;
  min-width:${width -50}px;
  border-radius: 17px;
  align-self: center;
  align-items: flex-start;
  background-color: white;
  position: relative;
  z-index:2;
  flex-wrap: wrap;
`;
export const Card2 = styled(Card)`
  width: 100%;
  z-index:9;
  height:${height/2+140}px;
`
export const Description = styled(Font)`
  font-size: 15px;
  color: black;
  background-color:#ffff;
  border-radius:20px;
`;
export const Price = styled(Font)`
  font-size: 15px;
  color: #002E2C;
  padding: 5px;
  margin-top:5px;
  padding:10px;
  background-color:#ffff;
  border-radius:20px;
  margin-right: 10px;
`;

export const Introducir = styled.TextInput`
  font-size: 20px;
  color: black;
  width: 100%;
  height: 45px;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-bottom: 10px;
`;
export const cart = StyleSheet.create({
  cart: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
});

export const Toggle = styled(Pressable)`
  height: 100%;
  background-color: black;
  opacity: 0.3;
  width: 10%;
`;
export const Cancel = styled(Pressable)`
  align-self: center;
  padding: 10px;
`;
export const CancelTxt = styled(Font)`
  font-size: 20px;
`;
export const Title = styled(Font)`
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 10px;
`;
export const Line = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding:5px;
`;
export const LineTitle = styled(Font)`
  font-weight: bold;
  font-size: 13px;
  letter-spacing: 0.3px;
  padding-top: 2px;
`;
export const LineText = styled(Font)`
  padding-left: 3px;
  font-size: 15px;
  letter-spacing: 0.3px;
`;
export const Separator = styled.View`
  height:1px;
  width:90%;
  opacity:0.2;
  background-color:black;
  align-self:flex-start;
`