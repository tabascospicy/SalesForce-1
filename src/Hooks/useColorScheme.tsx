import React, { useState } from 'react';
import {theme} from "theme";
//android_ripple={{color: '#e8e5e54d'}}
export const useColor = ():Theme => {
  const [colors,setColorScheme] = useState<Theme>(theme)
  return {...colors}
}

export default useColor;