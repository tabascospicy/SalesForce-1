import React, {useContext, useEffect, useState} from 'react';
import {useRef} from 'react';
import Context from 'services/context';
import FechtImage from 'services/FetchApis/Imagenes';
import RNFechtBlob from "rn-fetch-blob";
import Database from 'services/realm';
const {customRequest} = Database();
const useLoadImages = (producto: any) => {
  const {isNetworkAvailable,ImageSrc} = useContext(Context);
  const storage = useRef('');
  const [message, setMessage] = useState('');
  const call = useRef<string>();
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    checkAvability();
  }, []);
  const check = ()=>{
    try {
       console.log(RNFechtBlob.session('app').list());
    } catch (error) {
      console.log(error,"error")
    }
  }
  const checkAvability = async () => {
    if (producto.imagen.length < 15) {
      LoadImage();
    } else {    
      setImage(producto.imagen);
    }
  };

  const LoadImage = async () => {
    if (isNetworkAvailable && isNetworkAvailable()) {
      try {
        let img = ImageSrc ? ImageSrc.current : "";
        call.current = await FechtImage.FetchImagen(producto.imagen,img);
        storage.current = call.current;
        customRequest(SaveImage);
        setImage(storage.current);
      } catch (e) {
        setImage(producto.imagen);
      }
    } else {
      setImage(producto.imagen);
    }
  };
  const SaveImage = async (realm: Realm) => {
    try {
      const productos = realm.objects('producto');
      let esteProducto = productos.filtered(`id = ${producto.id}`) ;
      let P = esteProducto[0] as unknown as Product;
      P.imagen = storage.current;
    } catch (e) {
      console.log(e, '\n\n', storage.current, '\n \n error aqui fue we');
    }
  };
  return {message, image};
};

export default useLoadImages;
