import React from "react";
import { useEffect } from "react";
import LottieView from 'lottie-react-native';
import {Animated, Easing,View,Text} from 'react-native';
import {useRef} from 'react';
const Loading = ({calling}:any) => {
  const stop = useRef(false);
  const value = useRef(new Animated.Value(0)).current;
  const anim = () => {
    value.setValue(0);
    Animated.timing(value, {
      toValue: 0.3,
      easing: Easing.linear,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
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
    if (calling.process) {
      anim();
    }
  }, []);
  return(
    <View style={{alignItems:"center",justifyContent:"center"
     }}>
    <LottieView
    source={require('assets/lottie/loading.json')}
    progress={value}
    style={{height:100}}
    resizeMode={"cover"}
  />
  <Text>Enviando...</Text>
  </View>
  )
}

export default Loading;