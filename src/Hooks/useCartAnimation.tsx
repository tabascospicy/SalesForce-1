import React, {useState, useRef, useCallback} from 'react';
import {Easing, Value, timing} from 'react-native-reanimated';

const useCartAnimation = () => {
  const [Open] = useState(new Value(1));
  const phase = useRef(false);
  const [isOpen,setOpen] = useState(false);
  const startAnimation = ()=>{
    const config = {
        duration: 500,
        toValue: phase.current ? 1 : 0,
        easing: Easing.inOut(Easing.circle),
      };
      const anim = timing(Open, config);
      anim.start();
      phase.current = !phase.current;
  }
  const pressed = useCallback((location: string = '') => {
      setOpen(!isOpen)
      startAnimation();
  },[isOpen,Open])
  const translateX = Open.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400],
  });
  const transform = [{translateX}];
  return {pressed, transform, phase,isOpen};
};

export default useCartAnimation;