import React from "react";
import { useEffect } from "react";
import LottieView from 'lottie-react-native';
import {Animated, Easing,View,Text} from 'react-native';
import {useRef} from 'react';
import { Caption } from "react-native-paper";
type LoadingProps = {
  calling:{
    success:boolean | null;
    process:0|1|2;
  }
  message?:string
}
const Loading:React.FC<LoadingProps>= ({calling,message=""}) => {
  const stop = useRef(false);
  const value = useRef(new Animated.Value(0)).current;
  const anim = () => {
    value.setValue(0);
    Animated.timing(value, {
      toValue: 0.47,
      easing: Easing.linear,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
      console.log(stop.current)
      if (!stop.current) {
        anim();
      }
    });
  };
  useEffect(() => {
    if (calling.success !== null) {
      value.setValue(calling.success === false ? 0.6 : 0);
      stop.current = true;
      Animated.timing(value, {
        toValue: calling.success === false ? 1 : 0.45,
        easing: Easing.linear,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  }, [calling]);
  useEffect(() => { 
    if (calling.process != 0) {
      anim();
    }
  }, []);
  return(
    <View style={{alignItems:"center",justifyContent:"center"
     }}>
    <LottieView
    source={require('assets/lottie/loading.json')}
    progress={value}
    style={{height:50}}
  />
  <Caption> {message ? message : "Enviando..."}</Caption>
  </View>
  )
}

export default Loading;