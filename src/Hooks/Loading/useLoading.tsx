import React, { useState} from 'react';
const useLoading = (action:(x:any)=>Promise<any>) => {
  const [loading, setLoading] = useState(false);
  const doAction = (...args:any) => {
    setLoading(true);
    return action(...args).finally(() => setLoading(false));
  };
  return [doAction, loading];
}

export default useLoading;