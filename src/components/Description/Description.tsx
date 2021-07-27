import React from 'react';
import CustomImage from 'components/Image';
import {Container,Name,Portada,shadow} from './style';
import { Avatar } from 'react-native-paper';
interface DescriptionProps {
  cliente : Cliente | Empresa
}
const Description = ({cliente}: DescriptionProps) => {
  const isStore = cliente?.cedula?.includes("J") || cliente?.nombre?.includes("C.A")
  return (
    <Container>
      <Name>{ cliente?.nombre_comercial || cliente.nombre}</Name>
      <Avatar.Image size={90} source={isStore ?require("assets/shops.png") : require("assets/people.png")} />
    </Container>
  );
};

export default Description;