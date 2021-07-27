import styled from 'styled-components/native';
import React, { useRef} from 'react';
import useLoadImage from "Hooks/useLoadImages";
import { ActivityIndicator, Colors } from 'react-native-paper';
import {Image} from "react-native"


const Avatar = styled(Image)`
  height: ${(props: imageProps) => props.height};
  width: ${(props: imageProps) => props.width};
`;
const AvatarContainer = styled.View`
  margin-right: 20px;
  position: relative;
  flex: 1;

  margin-left:20px;
  align-items: center;
  justify-content: center;
  border-radius:10px;
`;

type imageProps = {
  height?: string | undefined;
  width?: string | undefined;
  src?: string | undefined;
  rounded?: boolean | undefined;
  producto:any;
  H:string;
  style:any;
  W:string
};
const CustomImage = ({
  producto,
  H ='100px',
  style={marginTop:0},
  W = '80px'
}: imageProps) => {
  
const {image} = producto ? useLoadImage(producto) : {image:""};
  const ref = useRef();
  return (
    <AvatarContainer style={style} >
       <Avatar  ref={ref} resizeMode="contain" height={H} width={W} source={require("assets/image/image.png")}  />  
    </AvatarContainer>
  );
};

export default CustomImage;
