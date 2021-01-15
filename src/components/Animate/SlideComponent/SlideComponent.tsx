import React,{useRef} from "react"
import { Transitioning, Transition } from 'react-native-reanimated';

const SlideComponent = ({ref,children,render}:any) => {
  const transitionRef = useRef();
  const transition = (
    <Transition.Sequence>
      <Transition.Together>
      <Transition.Out  interpolation="easeInOut" durationMs={200}  type="slide-left"></Transition.Out>
      <Transition.Out  interpolation="easeInOut" durationMs={200}  type="fade"></Transition.Out>
      </Transition.Together>
      <Transition.Together>
      <Transition.In  interpolation="easeInOut" durationMs={200}  type="fade"></Transition.In>
      <Transition.In  interpolation="easeInOut" durationMs={200}  type="slide-right"></Transition.In>
      </Transition.Together>
    </Transition.Sequence>
  ) 

  return (
    <>
    <Transitioning.View  ref={transitionRef} transition={transition}>
          {children(transitionRef)}
      </Transitioning.View> 
      {render(transitionRef)}
      </>
  );
}

export default SlideComponent;