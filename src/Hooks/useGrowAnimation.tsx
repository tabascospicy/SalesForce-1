import React, {useState, useRef} from 'react';
import {Easing, Value, timing} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
const {height,width} = Dimensions.get('screen');

const useGrowAnimation = () => {
  const Open = useRef(new Value(0)).current;
  const phase = useRef(false);
  const [isOpen, setOpen] = useState(false);
  const startAnimation = () => {
    const config = {
      duration: 500,
      toValue: phase.current ? 0 : 1,
      easing: Easing.inOut(Easing.circle),
    };
    const anim = timing(Open, config);
    anim.start();
    phase.current = !phase.current;
  };
  const pressed = (location: string = '') => {
    setOpen(!isOpen);
    startAnimation();
  };

  const translateX = Open.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width/2 +50],
  });
  const scale = Open.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.4],
  });
  const back = [
    {
      scale: Open.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  ];
  const transform = [{translateX}];
  return {pressed, transform, phase, isOpen, back};
};

export default useGrowAnimation;
