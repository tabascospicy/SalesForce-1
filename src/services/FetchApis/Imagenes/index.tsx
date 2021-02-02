import Global from 'services/variables_globales';
import RNFechtBlob from 'rn-fetch-blob';
import reactotron from 'reactotron-react-native';
let dirs = RNFechtBlob.fs.dirs;
const date = new Date();
const FetchImagen = async (url: string, ImageSrc: string) => {
  try {
    const ext = url.split('.')[1];
    return RNFechtBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      path: dirs.DCIMDir + '/' + url,
      fileCache:true,
      appendExt: ext,
      trusty: true,
      session: 'app',
    })
      .fetch('GET', `${Global.imagen}/${ImageSrc}/img/conceptos/${url}`, {
        //some headers ..
        'Access-Control-Allow-Origin': '*',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Content-Type': `image/${ext}`,
        'Keep-Alive': 'timeout=5000, max=9000'
      })
      .then( async (res) => {
        // the temp file path

        RNFechtBlob.session('app').add(res.path());

        return res.path();
      }).catch(e=>{
        console.log(e)
      });
  } catch (e) {
    return 'error';
  }
};
const FechtLogo = (url: string, ImageSrc: string) => {
  try {
    const ext = url.split('.')[1];
    return RNFechtBlob.config({
      fileCache: true,
      trusty: true,
      session: 'app',
      path: dirs.DocumentDir + '/' + url,
      appendExt: ext,
    })
      .fetch('GET', `${Global.imagen}/${ImageSrc}/img/empresa/${url}`, {
        //some headers ..
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-control': Global.header,
        'tenant-id': Global.tenant_id,
      })
      .then((res) => {
        // the temp file path
        RNFechtBlob.session('app').add(res.path());
        return res.path();
      });
  } catch (e) {
    console.log(e);
    return 'error';
  }
};
export default {FetchImagen, FechtLogo};
