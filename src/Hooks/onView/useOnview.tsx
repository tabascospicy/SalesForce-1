import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type voidTemplate = VoidFunction | null;

type ProfileScreenNavigationProp = StackNavigationProp<RouteParamsList>;
type FunctionsParameters = {
  onInit?: voidTemplate;
  callback?: voidTemplate;
  navigation?:ProfileScreenNavigationProp;
};

const useOnview = (
  {onInit = null, callback = null,navigation,}: FunctionsParameters,
) => {
  const [isOnView, setIsOnView] = useState(false);
  const {name} = useRoute();
  useEffect(() => {
   
    const unsubscribe = navigation ? navigation.addListener('focus', () => {
      setIsOnView(true);
       onInit && onInit();
    }) : setIsOnView(true);
    const subs = navigation && navigation.addListener('blur', () => {
      setIsOnView(false);
      callback && callback();
    });
    return () => {
    setIsOnView(false);
    unsubscribe && unsubscribe();
    subs && subs();
    };
  }, []);


  return {isOnView};
};

export default useOnview;
