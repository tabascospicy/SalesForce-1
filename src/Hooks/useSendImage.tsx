import React, {useContext} from 'react';
import {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import Fecht from 'services/fecth';
import Context from 'services/context';
import Pedidos from 'services/FetchApis/Pedidos';
import reactotron from 'reactotron-react-native';

const {ActualizarPedido} = Pedidos;
const useSendImage = () => {
  const {getTenant} = useContext(Context);
  const [capture, setCapture] = useState<unknown>(null);
  const [calling, setCalling] = useState(false);
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setCapture(response);
      }
    });
  };

  const Send = async (id:number) => {
    if (!capture) return;
    try {
      const image = (capture as unknown) as string;
      let formdata = new FormData();
      setCalling(true);
      formdata.append('image', image);
      const actualizar = await ActualizarPedido(id, 3);
      const T = getTenant ? getTenant() :"";
      const enviada = await Fecht(
        `/main/pagos/${id}`,
        {method: 'POST', tenant: T},
        formdata,
        true,
      );
      reactotron.log && reactotron.log(enviada);
      setCalling(false);
    } catch (e) {
      setCalling(false);
      console.log(e);
    }
  };

  return {capture, handleChoosePhoto, calling,Send};
};

export default useSendImage;
