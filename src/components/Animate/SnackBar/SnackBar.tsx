import React from 'react';
import Animation from 'components/Animate';
import styled from 'styled-components/native';
import { useEffect } from 'react';
const Snack = styled.View`
  background-color: #222831;
  padding: 10px;
  border-radius:10px;
`;
const Text = styled.Text`
  color: white;
  font-size: 12px;
  align-items:center;
  border-radius:10px;
`;

const SnackBar = ({show, message,setModal}: modalProps) => {
  useEffect(()=>{
    if(show===true){
      clearTimeout();
       const time = setTimeout(()=>{
        setModal(false);
      },1900);
      return ()=>time && clearTimeout(time)
    }
  },[show])
  return (
    <Animation.In
      condition={show}
      style={{
        zIndex: show ? 5 : 0,
        position: 'absolute',
        bottom: 0,
        left:'27%',
        marginBottom: 40,
        height: 40,
        borderRadius:10,
        backgroundColor:"cornflowerblue"
      }}>
      <Snack>
        <Text>{message}</Text>
      </Snack>
    </Animation.In>
  );
};

export default React.memo(SnackBar);
