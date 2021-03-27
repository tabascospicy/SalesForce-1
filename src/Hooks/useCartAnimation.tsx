import React, {useState, useRef, useCallback} from 'react';
import { InteractionManager } from 'react-native';
import {Easing, Value, timing} from 'react-native-reanimated';

const useCartAnimation = () => {
  const Open = useRef(new Value(1)).current;
  const phase = useRef(false);
  const [isCartOpen,setOpen] = useState(false);
  const startAnimation = ()=>{
    const config = {
        duration: 300,
        toValue: phase.current ? 1 : 0,
        easing: Easing.inOut(Easing.circle),
      };
      const anim = timing(Open, config);
      anim.start(()=>{
      });
      requestAnimationFrame(()=>{
        setOpen(!isCartOpen);
      })
      phase.current = !phase.current;
  }
  const pressed = useCallback((location: string = '') => {
    console.log("presionado")
    InteractionManager.runAfterInteractions(()=>{
      startAnimation();
    });
  },[isCartOpen,Open])
  const translateX = Open.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400],
  });
  const transform = [{translateX}];
  return {pressed, transform, phase,isCartOpen};
};

export default useCartAnimation;