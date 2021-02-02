import React, { useEffect, useRef } from "react";
import LottieView from 'lottie-react-native';
import {Animated, Easing} from "react-native";
interface LoadAnimationProps {
  calling:CallStatus;
}
const LoadAnimation = ({calling}:LoadAnimationProps) => {
  const value = useRef(new Animated.Value(0)).current;
  const stop = useRef(false);
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
    if (!calling.loading) {
      anim();
    }
  }, []);

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
  return (
    <LottieView
          source={require('assets/lottie/loading.json')}
          progress={value}
        />
  );
}

export default LoadAnimation;