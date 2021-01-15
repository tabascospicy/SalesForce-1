//import {Menu} from "./style"
import React, {useContext } from 'react';
import styled from 'styled-components/native';
import {Dimensions,Image,Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from "components/RootNavigationRef/RootNavigationRef"
import Context from "services/context";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { Font } from 'styles';
const {width} = Dimensions.get('window');
const Menu = styled(SafeAreaView)`
  display: flex;
  max-width: ${width / 2 + 40}px;
  z-index: 1;
  padding:20px;
`;

const LogoView = styled.View`
  flex-grow: 1;
  align-items: center;
  flex-direction:row;
  justify-content: center;
`;

const OptionsView = styled.View`
  flex-grow: 2;
  align-items: center;
  justify-content: center;
`;
const Option = styled(Pressable)`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  opacity:${({isSelected}:any)=>isSelected ? 0.7 : 1};
`;
const OptionText = styled(Font)`
  font-size: 20px;
  flex-wrap: wrap;
  width:100px;
  color: white;
`;

const AccountSettings = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  position: relative;
`;

const SettingText = styled(Font)`
  font-size: 20px;
  flex-wrap: wrap;
  width: 140px;
  color: white;
`;

const AvatarDescription = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding:10px;
`;
const Name = styled(Font)`
  font-size: 20px;
  color: white;
  margin-bottom: auto;
`;

const Position = styled(Font)`
  font-size: 15px;
  opacity: 0.7;
  color: white;
`;


const SideMenu = (props:any) => {
  const {usuarioLog,selectedView,cerrarSesion} = useContext(Context);
  const navigate =  (direction : string) =>{
    RootNavigation.navigate(direction,{});
    props.pressed();
  }
  const handleCerrarSesion = () =>{
    props.pressed();
    cerrarSesion && cerrarSesion();
  }
  return (
    <Menu>
      <LogoView>
      <Image resizeMode="contain" style={{width:70,height:80}} source={require('assets/image/banner.jpeg')}></Image>
        <AvatarDescription>
           <Name style={{fontFamily:"nunito"}}>{usuarioLog?.nombre || ''}</Name>
          <Position>{usuarioLog?.login || ''}</Position>
        </AvatarDescription>
      </LogoView> 
      <OptionsView>
        <Option  isSelected={"Clientes" === selectedView ? false : true} onPress={()=>navigate("Clientes")}>
          <Icon name="people" size={30} color="white" />
          <OptionText>Lista de Clientes</OptionText>
        </Option>
        <Option isSelected={"Empresa" === selectedView ? false :  true} onPress={()=>navigate("Empresa")}>
          <Icon name="newspaper" size={30} color="white" />
          <OptionText>Productos</OptionText>
        </Option>
        <Option isSelected={"Pedidos" === selectedView ? false :  true} onPress={()=>navigate("Pedidos")}>
          <Icon name="paper-plane" size={30} color="white" />
          <OptionText>Pedidos</OptionText>
        </Option>
      </OptionsView>
      <AccountSettings>
          <Button icon={()=> <Icon name="exit" size={30} color="white" />} onPress={handleCerrarSesion} >
            <SettingText>Cerrar Sesion</SettingText>
          </Button>
      </AccountSettings>
    </Menu>
  );
};

export default SideMenu;
