namespace DB {
  export type models =
    | 'usuario'
    | 'tenant'
    | 'grupo'
    | 'zona'
    | 'Banco'
    | 'subgrupo'
    | 'marcas'
    | 'sesion'
    | 'existencia'
    | 'TipoPago'
    | 'planes_pago'
    | 'realizados'
    | 'PendienteD'
    | 'pendiente'
    | 'detalles'
    | 'pedido'
    | 'producto'
    | 'clientList'
    | 'cliente'
    | 'empresa'
    | 'tenant'
    | 'factura'
    | 'detalleFactura'
    | 'TFactura'
    | 'ofertas'
    | 'iva'
    | 'statusPedido';
}
type Oferta = {
  id: number;
  min: number;
  max: number;
  descuento: string;
  adm_conceptos_id: number;
  status: number;
};
type Factura = {
  id: number;
  numero_factura: string;
  numero_fiscal: string;
  serial_impresora: string;
  fecha_at: string;
  fecha_in: string;
  adm_vendedor_id: number;
  adm_clientes_id: number;
  subtotal: string;
  subtotal_dolar: string;
  iva: string;
  facturado: number;
  iva_dolar: string;
  estatus_pago: number;
  abono: string;
  abono_dolar: string;
  descuento_dolar: string;
  adm_tipos_facturas_id: number;
  adm_usuarios_id: number;
  adm_caja_id: number;
  observacion: string;
  adm_enc_presupuesto_id: number;
  anulada: number;
  usuario_modificador: string;
  devuelto: string;
  motivoreimpresion: string;
  afecta_factura: string;
  rest_pedidos_id: number;
  fecha_hora: string;
  coo: string;
  estatus_entrega: number;
  fecha_entrega: string;
  detalles: DetalleFactura[];
};
type TipoFactura = {
  id: number;
  nombre: string;
  inicial: string;
};

type DetalleFactura = {
  id: number;
  adm_enc_facturas_id: number;
  adm_conceptos_id: number;
  adm_vendedor_id: number;
  costo: string;
  costo_dolar: string;
  precio: string;
  precio_dolar: string;
  descuentopro: string;
  fecha_at: string;
  cantidad: string;
  despachado: number;
  devuelto: number;
  adm_seriales_id: number;
  monto_documento: string;
  adm_lotes_id: number;
};

type Product = {
  nombre: string;
  imagen: string;
  descripcion?: string;
  impuesto?: number;
  codigo: string;
  precio_dolar: string;
  referencia: number;
  id: number;
  adm_conceptos_id: number;
  cantidad?: number;
  precio_a: number;
  precio_b: number;
  precio_c: number;
  adm_empresa_id?: number;
  talla?: string;
  color?: string;
  descuento?: string;
  serial_estatico?: number;
  serial_dinamico?: number;
  existencia_minima?: string;
  existencia_maxima?: string;
  adm_tipos_conceptos_id?: number;
  adm_ubicacion_id?: number;
  costo?: number;
  ultimo_costo?: string;
  costo_mayor?: string;
  costo_promedio?: string;
  fecha_at?: string;
  fecha_in?: string;
  fecha_uc?: string;
  adm_grupos_id?: number;
  adm_subgrupos_id?: number;
  presentacion?: string;
  adm_unidades_id?: number;
  fecha_hora?: number;
  adm_marcas_id?: number;
  estado?: number;
  pvp?: string;
  utilidad?: string;
  utilidad_a?: string;
  utilidad_b?: string;
  utilidad_c?: string;
  utilidad_dolar?: string;
  costo_dolar?: string;
  precio_variable?: number;
  retiene?: number;
  farm_principio_activo_id?: number;
  costo_adicional?: string;
  costo_adicional2?: string;
  cant_ensamblado?: string;
  licor?: number;
  porcentaje?: number;
  visible_pv?: number;
  visible_web?: number;
  rest_areas_id?: number;
  setcortesia?: number;
  exento?: number;
  merma?: number;
  existencia_c?: number;
  obviar_ajuste?: number;
  iva?: number;
  empaque: string;
  uso: string;
  oferta: number;
};
type MensajeContent = {
  title: string;
  body: string;
  visible: boolean;
  render: React.FC | null;
  actions?: React.FC | null;
};
type Empresa = {
  nombre?: string;
  correo?: string;
  productos?: Array<Product>;
  adm_empresa_id?: number;
  isLoading?: boolean;
  isLoadingProducts?: boolean;
  totalCount?: number;
  empty?: boolean;
  id?: string | number;
  rif?: string;
  business_type?: number;
  razon_social?: string;
  nombre_comercial?: string;
  fecha_registro?: string;
  direccion?: string;
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;
  pag_web?: string;
  correo_electronico?: string;
  correo_electronico2?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  imagen?: string;
  firma_digital?: string;
  tipo_imagen?: string;
  licencia_licores?: boolean | number;
  nota?: string;
  marca_agua?: string;
  tipo_calculo?: number;
  contribuyente_especial?: boolean | number;
  nota2?: string;
  color_presupuesto?: string;
  img_barcode?: string;
  modelo?: number;
  estado_id?: string | number;
  municipio_id?: string | number;
  activo?: number;
  tipo_plan_id?: number;
};
type StatusPedido = {
  nombre: string;
  id: number;
};
type VisualState = {
  isCartOpen: boolean;
  isMenuOpen: boolean;
  selectedEmpresa: number;
  disabled: boolean;
  selectedProduct: Product;
};
type User = {
  isLogged: boolean;
  name: string;
  updated_at: string;
  imagen: string;
  adm_empresa_id: number;
  type: string;
};
type Cliente = {
  img: string;
  nombre: string;
  id: number;
  telefono: string;
  Rif: string;
  direccion: string;
  cedula: string;
  limite_credito: number;
  telefono_contacto: string;
  nombre_comercial: string;
  adm_zonas_id: number | null;
};
interface Cart {
  total: number;
  cliente: Cliente | null;
  productos: Array<Product>;
}

interface GlobalConfig {
  header: string;
  http: string;
  data: string;
  ImageSrc: string;
  public_key: string;
  auth: string;
  image: string;
  Base: string;
  imagen: string;
  tenant_id: string;
  nots: string;
  key_notificaciones: string;
  TOKEN_KEY: string;
}
type Item = {
  item: Cliente;
};
type modalProps = {
  show: boolean;
  message?: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type IUsuario = {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nac: string;
  recovery: string;
  recoverydate: string;
  login: string;
  password: string;
  perfil_id: string | number;
  email: string;
  tema: string;
  app_ajax: number;
  datagrid: number;
  adm_empresa_id: number | string;
  imagen: string;
  pool: string;
  usuario_at: string;
  usuario_in: string;
  adm_caja_id: string | number;
  adm_vendedor_id: string | number;
  telefono: string;
  bloqueado: number;
  verificado: number;
};

type IPago = {
  id?: string | number;
  emisor?: string;
  receptor?: string;
  adm_pedidos_id?: number;
  adm_tipo_pago_id?: number;
  adm_status_id?: number;
  monto?: number;
  codigo_referencia?: number;
  imagen?: string;
  adm_clientes_id?: number;
  metodo?: string;
  banco_origen?: string;
};

type PedidosToServer = {
  id?: string | number;
  adm_empresa_id: number;
  fecha_at: string;
  fecha_in: string;
  usuario_id: string | number;
  adm_clientes_id?: string | number;
  imagen: string;
};

type DetallesToServer = {
  id?: string | number;
  rest_pedidos_id?: string | number;
  adm_conceptos_id: string | number;
  cantidad: number;
  precio: string;
  descuento: number;
  iva: number;
  precio_dolar: string;
  iva_dolar: number;
  fecha_at: string;
  fecha_in: string;
};
type Transform = {
  translateX: any;
};
type UiContext = {
  cliente?: Cliente;
  total?: number;
  selectedFactura?: Factura;
  transformCarrito: unknown;
  productosQr?: unknown;
  filter?: Filtro;
  selectedView?: string;
  selectedProduct?: UiProduct;
  isOnline: boolean;
  seeMessage?: MensajeContent;
  carrito?: Product[];
  descuento?: PlanPago;
  ofertas: number[];
  lista?: Array<Product>;
  qr: boolean;
  ButtonActionFactura?: {action: React.FC<{}> | null};
  handleSelectedFactura?: (x: Factura) => void;
  handleFilter?: (x: Filtro) => void;
  handleButtonActionFactura?: (x: any) => void;
  handleSelectedProduct: (x: UiProduct) => void;
  handleSelectedView: (x: string) => void;
  handleDescuento?: (x: PlanPago) => void;
  handleCDestino: (x: Cliente) => void;
  handleLista: (x: Product[]) => void;
  toggleCarrito: () => void;
  resetCarrito?: () => void;
  showQr: () => void;
  pressed: () => void;
  hideMensaje: () => void;
  showMensaje: (mensaje: MensajeContent) => void;
  isNetworkAvailable?: (check?: boolean) => Promise<boolean>;
  addProduct?: (x: Product, cantidad: number) => void;
  deleteProduct?: (x: Product) => void;
  ExtraFunction?: React.RefObject<VoidFunction>;
  EditCantidad?: (cantidad: number, position: number) => void;
  VerificarFecha?: () => boolean;
};
type UiProduct = {
  producto: Product;
  shouldAdd: boolean;
};
type Filtro = {
  nombre: string;
  id: string;
  db: 'grupo' | 'subgrupo' | 'marcas' | null;
  display: string;
};
type FilterOptions = {
  grupo: 'adm_grupos_id';
  subgrupo: 'adm_subgrupos_id';
  marcas: 'adm_marcas_id';
};
type selected = 'adm_grupos_id' | 'adm_subgrupos_id' | 'adm_marcas_id';
type placeholder = {
  nombre: string;
  login: string;
};
type DbContext = {
  productos?: Product[];
  percent: number;
  mensaje: string;
  clientes?: Cliente[];
  usuarioLog?: IUsuario | placeholder;
  calling?: CallStatus;
  fecha?: string;
  empresa?: Empresa;
  SesionState?: SesionState;
  ImageSrc?: React.MutableRefObject<string>;
  handleCall?: (x: CallStatus) => void;
  handleFecha: (x: string) => void;
  handleTenant?: (x: string) => void;
  handleSesionState?: (x: SesionState) => void;
  handleUsuario?: (x: IUsuario | placeholder) => void;
  CheckAndStart?: () => void;
  cerrarSesion?: () => void;
  CallApi?: () => Promise<void>;
  AskPedidos?: (id: number) => Promise<void>;
  getTenant?: () => string;
  VerificarSesion?: () => boolean;
  VerificarStorage?: () => boolean;
  VerificarFecha?: () => void;
};

type CallStatus = {
  success?: boolean | null;
  loading: boolean;
};

type PlanPago = {
  id: number;
  nombre: string;
  dia_inicial: number;
  dia_final: number;
  descuento: string;
};

type Theme = {
  'primary-font': string;
  'terceary-font': string;
  primary: string;
  buttonLight: string;
  ButtonStrong: string;
  secondary: string;
  Light: string;
  buttonsPrimary: string;
  buttonsLight2: string;
};

type DetallesToAdd = {
  marca: string;
  categoria: string;
  subcategoria: string;
  iva: number;
};

type result = {
  nombre: string;
};
type RouteParamsList = {
  Pagar: {factura: Factura};
  Sesion: any;
  Login: any;
  Clientes: any;
  Load: any;
  Pedidos: any;
  Empresa: any;
  Cliente: any;
  Factura: any;
  Checkout: any;
  Agregar: any;
  Producto: any;
  MinifiedList: any;
};
type GenericType = {
  id: number;
  nombre: string;
};
type TipoPago = GenericType;

type Banco = GenericType;

type ICobranza = {
  id?: number;
  fecha_at: string; //
  documento: number; //
  tipo: string; //
  adm_clientes_id: number; //
  monto_documento: number; //
  monto_documento_dolar?: number;
  saldo_deudor: number; //
  saldo_deudor_dolar?: number; //
  pago: number; //
  pago_dolar: number; //
  descuento: number; //
  descuento_dolar: number; //
  retencion: number; //
  retencion_dolar?: number; //
  tasa: number; //
  devuelto?: number;
  contabilizado?: number;
  revisado?: number;
};
type MovBanco = {
  id?: number;
  adm_banco_id: number; //
  adm_tipo_movimiento_id: number;
  adm_caja_id?: number;
  fecha_at: string;
  adm_tipo_pago_id: number;
  referencia: string;
  credito?: number;
  credito_dolar?: number;
  debito?: number;
  descripcion: string;
  beneficiario: number;
  adm_entidad_id?: number;
  origen?: string;
  documento?: number;
  efectivo?: number;
  cheque_mismo_banco?: number;
  cheque_otro_banco?: number;
  islr?: number;
  comision?: number;
  fecha_cheque_mismo_banco?: string;
  fecha_cheque_otro_banco?: string;
  conciliado?: boolean;
  fecha_conciliado?: string;
  islrnc?: number;
  riva?: number;
  estatus?: number;
  fecha_transaccion?: string;
  imagen?: string;
};

type MovCaja = {
  id?: number;
  adm_caja_id: number;
  fecha_at: string;
  fecha_in?: string;
  hora_in?: string;
  adm_tipo_pago_id: number;
  adm_tipo_movimiento_id: number;
  adm_banco_id?: number;
  referencia: string;
  debito: number;
  credito: number;
  credito_dolar: number;
  descripcion: string;
  origen?: string;
  numero_origen: string;
  adm_entidad_id?: number;
  islrnc?: number;
  riva?: number;
  fecha_transaccion?: string;
  imagen?: string;
};
type enviarInpustValues = {
  monto: string;
  referencia: string;
  adm_tipo_pago_id: string;
  bancoDestino: string;
  banco_id: string;
  moneda: 'Bs' | 'USD';
};
type enviarKeys =
  | 'referencia'
  | 'adm_tipo_pago_id'
  | 'banco_id'
  | 'monto'
  | 'moneda'
  | 'bancoDestino';

 interface IAbono {
  id: number;
  tercero: number;
  fecha_at: string;
  monto: number;
  monto_dolar: number;
  descripcion: string;
  tipo: string;
  monto_Restante: number;
  monto_Restante_dolar: number;
  detalles?: IDetAbono[];
}

 interface IDetAbono {
  id: number;
  adm_abonos_id: number;
  fecha_at: string;
  documento: number;
  tipo: string;
  monto_utilizado: number;
  monto_utilizado_dolar: number;
  tasa: number;
}
