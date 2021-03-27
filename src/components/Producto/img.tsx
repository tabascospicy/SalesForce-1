import styled from 'styled-components/native';
import React, { useRef} from 'react';
import useLoadImage from "Hooks/useLoadImages";
import { ActivityIndicator, Colors } from 'react-native-paper';
import reactotron from 'reactotron-react-native';


const Avatar = styled.Image`
  height: ${(props: imageProps) => props.height};
  width: ${(props: imageProps) => props.width};
  z-index: 2;
`;
const AvatarContainer = styled.View`
  margin-right: 20px;
  position: relative;
  align-self:flex-start;
  margin-left:20px;
  height: ${(props: imageProps) => props.height};
  width: ${(props: imageProps) => props.width};
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
  W:string
};
const CustomImage = ({
  height = '60px',
  width = '60px',
  rounded=true,
  producto,
  H ='50px',
  W = '90px'
}: imageProps) => {
  
const {image} = producto ? useLoadImage(producto) : {image:""};
  const ref = useRef();
 
  return (
    <AvatarContainer height={height} width={width}>
      {image ? <Avatar ref={ref} defaultImage={{uri:"assets/image/picture.png",width:20,height:20}} resizeMode="contain" rounded={rounded} height={H} width={W} source={{uri:'file://' + image}} /> :  <ActivityIndicator animating={true} color={Colors.red800} />  }
    </AvatarContainer>
  );
};

export default CustomImage;
