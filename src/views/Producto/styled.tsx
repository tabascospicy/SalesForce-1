import { Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";
import {StyleSheet} from "react-native";
import { Font } from "styles";
import {theme} from "theme"
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
export const {height,width} = Dimensions.get('window');
export const Container = styled(SafeAreaView)`
  flex-grow: 1;
  position: relative;
  background-color: #f5f5f8;
  z-index: 1;
`;
export const Scroll = styled(ScrollView)`

`
export const BlueBackground = styled.View`
  background-color: ${theme.primary};
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

`;
export const Tags = styled.View`
  align-items: flex-start;
  flex-wrap: wrap;
  background-color: ${theme.primary};
  border-radius:5px;
  padding:10px;
  justify-content: space-between;
`;
export const Tag = styled(Font)`
  opacity: 0.9;
`;
export const Codigo = styled(Tag)`
font-weight:bold;
font-size:17px;
opacity:0.5;
`
export const Name = styled(Tag)`
  font-weight:bold;
  font-size:23px;
  letter-spacing: 0.6px;
`


export const Bold = styled(Tag)`
  font-weight:bold;
`
export const Card = styled.View`
  padding: 20px;
  width:${width -20}px;
  border-radius: 17px;
  align-self: center;
  align-items: flex-start;
  position: relative;
`;
export const Card2 = styled(Card)`
 flex-direction: row;
 flex-wrap: wrap;
`
export const Descripcion = styled(Font)`
  font-size: 15px;
  opacity:0.5;
`;
export const DescriptionTitle = styled(Font)`
  font-size: 18px;
  font-weight:bold;
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

export const ButtonBox = styled(Pressable)`
  padding-top:12px;
  padding-bottom:12px;
  padding-left:28px;
  padding-right: 28px;
  border-radius:25px;
  background-color: ${theme.secondary};
`
export const ButtonText = styled(Font)`
color: white;
  letter-spacing: 0.6px;
  font-weight: bold;
  font-size:15px;
  
`
export const Box = styled.View`
 padding:8px;
 border-radius:10px;
 margin:10px;
 background-color:white;
 flex-direction: column;
`

export const Line = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const LineTitle = styled(Font)`
  font-weight: bold;
  font-size: 15px;
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
