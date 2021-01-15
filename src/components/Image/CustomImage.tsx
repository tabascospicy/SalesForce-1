import styled from "styled-components/native";
import React from "react";


const Background = styled.View`
  height: 100%;
  width: 100%;
  position:absolute;
  background: white;
  opacity: 0.7;
  border-radius:${(props:imageProps)=>props.rounded ? 50 : 5}px;
  z-index: 1;
`;
const Avatar = styled.Image`
height:${(props:imageProps) =>props.height};
width:${(props:imageProps) =>props.width};
  z-index: 2;
`;
const AvatarContainer = styled.View`
  margin-right: 20px;
  position: relative;
  height:${(props:imageProps) =>props.height};
  width:${(props:imageProps) =>props.width};
  align-items:center;
  justify-content:center;
`;

type imageProps = {
  height?:string | undefined,
  width?:string | undefined,
  src?:string | undefined,
  rounded? : boolean | undefined,
}
const CustomImage = ({height = '60px' , width = '60px' , src=require("assets/people.png"),rounded} : imageProps) => {
  return (
    <AvatarContainer height={height} width={width}>
    <Avatar resizeMode="contain" rounded={rounded} height={height} width={width}  source={src} />
    <Background />
  </AvatarContainer>
  );
}

export default React.memo(CustomImage);
