import React, {useState, useRef} from 'react';
import { 
  Animated, Dimensions
 } from 'react-native';
const {height} = Dimensions.get("screen")

const useScrollAnimation = (navHeight:number=400) => {
  const scrollY = new Animated.Value(0);
  const navbarHeight = height /4 -100;
  const ScrollEvent = Animated.event([
    {
      nativeEvent: {
        contentOffset: {
          y: scrollY,
        },
      },
    },
  ], {
    useNativeDriver: false,
  });
  const scaleY = scrollY.interpolate({
    inputRange:[0,100],
    outputRange:[1,0.20],
    extrapolate:"clamp"
  });
  const translateY = scrollY.interpolate({
    inputRange:[0,100],
    outputRange:[0,-88],
    extrapolate:"clamp"
  });
  const ScaleNav = scrollY.interpolate({
    inputRange:[0,100],
    outputRange:[1,-55],
    extrapolate:"clamp"
  })
  const opacityNav = scrollY.interpolate({
    inputRange:[0,100],
    outputRange:[1,0],
    extrapolate:"clamp"
  })
  const scaleList =scrollY.interpolate({
    inputRange:[0,100],
    outputRange:[1,1.1],
    extrapolate:"clamp"
  });
  const translateBackground = scrollY.interpolate({
    inputRange:[0,100],
    outputRange:[0,-240],
    extrapolate:"clamp"
  })
  const transform = [{translateY:translateBackground}];

  return {transform ,ScrollEvent,opacityNav,ScaleNav, translateY,scaleList};
};

export default useScrollAnimation;
