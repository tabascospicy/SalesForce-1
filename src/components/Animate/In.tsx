import React, {useEffect, useRef, useState} from 'react';
import {Transition, Transitioning} from 'react-native-reanimated';

const In = ({children,condition=null,style=[]}: any) => {
  const [ready, setReady] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    requestAnimationFrame(() => {
      ref.current.animateNextTransition();
      setReady(true);
    });
  }, []);

  const transition = (
    <Transition.Sequence>
      <Transition.In durationMs={400}  interpolation="easeIn" type="fade" ></Transition.In>
      <Transition.Out durationMs={400}  interpolation="easeIn" type="fade" ></Transition.Out>
    </Transition.Sequence>
  );
    const When = condition !== null ? condition && children : ready && children
  return (
    <Transitioning.View transition={transition} style={{flex: 1,...style}} ref={ref}>
      {When}
    </Transitioning.View>
  );
};

export default React.memo(In);
