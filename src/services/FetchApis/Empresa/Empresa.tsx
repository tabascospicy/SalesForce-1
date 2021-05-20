import {call} from 'react-native-reanimated';
import reactotron from 'reactotron-react-native';
import Fetch from 'services/fecth/index';
import Imagen from '../Imagenes';
const FetchEmpresaById = async (id: number,Tenant:string) => {
  try {
    const response = await Fetch(`empresa/${id}`, {method:"GET",tenant:Tenant});
    
    return await JSON.parse(response.data).data;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
};


const FetchCantidadConceptos = async (id: number,Tenant:string) => {
  try {
    const response = await Fetch(`empresa/${id}/conceptos/?visible_fuerza_venta=1`, {method:"GET",tenant:Tenant});
    
    const total = JSON.parse(response.data).data;
    return total;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
};

const FetchAllImagesProductos = async (productos: Product[],setPercent:any,Tenant:string,ImageSrc:string) => {
  try {
    const cantidad = productos.length;
    const calls = Math.floor(cantidad / 80) || 1;
    const flag = cantidad >= 80 ? new Array(80).fill(0) :new Array(cantidad).fill(0);
    const counter = 45 / calls;
    let index = 0;
    const DeafultImageLocalRoute = await Imagen.FetchImagen("default.png",ImageSrc);
    for (var i = 0; i < calls; i++) {
      const rutes = await Promise.all(
        flag.map((element, f) => {
          return productos[f + index]?.imagen  ? productos[f + index]?.imagen === "default.png" ? DeafultImageLocalRoute: Imagen.FetchImagen(productos[f + index].imagen,ImageSrc) :DeafultImageLocalRoute;
        }),
      );
      rutes.map((rute, r) => {
       if(r + index < productos.length) productos[r + index].imagen = rute;
      });
      index += 80;
    }
    return productos;
  } catch (error) {
    console.log(error, '\n error');
    return null;
  }
};

const FetchConceptosEmpresa = async (id: number,Tenant:string) => {

  return FetchCantidadConceptos(id,Tenant);
};
const FetchDepositosEmpresa = (Tenant:string)=> {
  return Fetch(`depositos/`, {method:"GET",tenant:Tenant});
}
const FetchConcepto = (id:number,Tenant:string)=> {
  return Fetch(`conceptos/${id}`, {method:"GET",tenant:Tenant});
}
const FetchAllAboutOne = Promise.all([FetchEmpresaById, FetchConceptosEmpresa]);

export default {
  FetchAllImagesProductos,
  FetchEmpresaById,
  FetchConceptosEmpresa,
  FetchAllAboutOne,
  FetchDepositosEmpresa,
  FetchConcepto
};
