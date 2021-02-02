import useCheckConnection from 'Hooks/useCheckConnection';
import React, {useContext, useEffect, useState} from 'react';
import Pagos from 'services/FetchApis/Pagos';
import Context from 'services/context';
import useLoading from 'Hooks/Loading';

type TasaProp = {
  isNetworkAvailable: () => Promise<boolean>;
};

const useTasa = ({isNetworkAvailable}: TasaProp) => {
  const [tasa, setTasa] = useState('');
  const {getTenant} = useContext(Context);
  const [empBancos, setEmpBancos] = useState([]);
  const reqTasa = async () => {
    try {
      if ( await isNetworkAvailable()) {
        const tasas = await Pagos.FechtTasa(getTenant() || '');
        const ban = await Pagos.FechtBancos(getTenant() || '');
        setEmpBancos(ban);
        setTasa(tasas[0].tasa);
      }
    } catch (e) {
      setTasa('');
      console.log(e, 'tasa');
    }
  };

  const [doAction, loading] = useLoading(reqTasa);

  useEffect(() => {
    doAction('');
  }, []);

  return [tasa, loading, empBancos];
};

export default useTasa;
