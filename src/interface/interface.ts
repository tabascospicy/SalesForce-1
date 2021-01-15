interface IPedidosConDetalles extends PedidosToServer  {
  detalles?: DetalleConNombre[];
  fecha:string,
  total:number,
  rest_estatus_id?:number,
};

interface DetalleConNombre extends DetallesToServer {
  nombre?:string,
  descripcion?:string
}
interface PedidoPendiente  {
  data:PedidosToServer,
  data1:DetallesToServer[] | string,
  fecha:string,
  total:number,
  adm_clientes_id?:number,
  adm_empresa_id?:number,
  show:IPedidosConDetalles,
  id?:number
}


type LoginData = {
  correo:string,
  usuario:string,
  password:string
}

 interface GlobalContext extends UiContext,DbContext{
  colors?:Theme,
}

type SesionState = 0 |1 |2;

//0 for Login with empresa email
//1 for User Login
//2 for logged