import styled from 'styled-components/native';
import {Dimensions, StyleSheet} from 'react-native';
import {Transitioning} from 'react-native-reanimated';
import {Font} from "styles"
import { shadowSetting,theme } from 'theme';

const {height,width} = Dimensions.get("window");
export const GlobalContainer = styled.View`
  flex-grow: 1;
  background-color: #f5f5f8;
  flex-direction: column;
  position: relative;
`;

export const Content = styled.View`
  flex-grow: 1;
  flex-direction: column;
  margin-top: 55px;
`;
export const shadow = {
    ...shadowSetting,
    width: width - 30,
    height:height/3 +50,
    y:3,
    style: {
      marginHorizontal:"auto",
       marginVertical:10,
       alignItems:"center",
       alignSelf:"center",
      justifyContent:"center"
      }
}
export const BlueBackground = styled.View`
  position: absolute;
  top: -10px;
  height: 25%;
  border-radius: 10px;
  height: 23%;
  background-color:${theme.primary};
  width: 100%;
`;
export const Card = styled.View`
  padding: 20px;
  width: ${width - 30}px;
  align-self: center;
  height:${height/3 +50}px;
  border-radius:10px;
  align-items: flex-start;
  background-color: white;
`;
export const DataSection = styled.View`
  padding:5px;
  width:100%;
  border-radius:10px;
`
export const Data = styled(Font)`
  font-size: 15px;
`;
export const DataTitle = styled(Data)`
font-size:20px;
font-weight:bold;
`
export const Bold = styled(Data)`
  font-weight:bold;
`
export const ListContainer = styled.SafeAreaView`
  flex-grow: 1;
  padding-top: 10px;
`;
export const List = styled.FlatList`
  flex-grow: 1;
`;
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const FacturaContainer = styled(Transitioning.View)`
  width: 95%;
  align-self: center;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom:20px;
  border-radius: 20px;
`;


export const PickerContainer = styled.View`
  height: 50px;
  width: 100%;
  border-radius:10px;

  margin-bottom: 30px;
  border-bottom-color:${theme.secondary};
  border-bottom-width:2px;
`
export const shadowSet = {
  ...shadowSetting,
  width: 95,
  height: height / 3,
  style: {
    marginHorizontal:"auto",
     marginVertical:10,
     alignItems:"center",
     alignSelf:"center",
    justifyContent:"center"
    }
};
export const styles = StyleSheet.create({
  picker: {
    height:"100%",
    width: "100%", 
  },
});
