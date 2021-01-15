import React, {useReducer} from 'react';
import { PermissionsAndroid } from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

type propsReq = {
  req?: string;
  permision?: string;
};

const useAskPermision = ({req}: propsReq) => {
  const checkPermision = () => {
    return check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
      (response) => {
        return response;
      },
    );
  };
  
  const requestPermision = async () => {
    const able = await checkPermision();
    if (able !== 'granted') {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((response) => {
      });
    }
  };
  const checkStoragePermission = async ()=>{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permiso Para Guardar datos en el telefono",
          message: "La aplicacion necesita permiso especial para informacion como imagenes entre otros",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permiso listo");
      } else {
        console.log("Permiso denegado permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  return {requestPermision,checkStoragePermission};
};

export default useAskPermision;
