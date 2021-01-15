
 const pedido  = {
  name:'pedido',
  properties:{
    usuario_id: 'int',
    adm_clientes_id: 'int',
    adm_empresa_id: 'int',
    imagen: 'string',
    fecha_at: 'string',
    fecha_in: 'string',
    total:'float?',
  }
}

 const detalles  = {
  name:'detalles',
  properties:{
    adm_conceptos_id: 'int',
    cantidad: 'int',
    precio:'string',
    precio_dolar:"string",
    iva:"int",
    iva_dolar:"int",
    descuento:"int",
    imagen: 'string',
    id:'int?',
    nombre:'string?',
    descripcion:'string?',
    rest_pedidos_id:'int?',
    fecha_at: 'string',
    fecha_in: 'string',
    rest_estatus_id:"int?",
    estado:"string?",
    observacion:"string?",
    rest_areas_id:"int?",
    motivo:"string?",
    impreso:'int?',
    entrada:"int?",
    usuario_id:"int?",
    cortesia:"int?",
    rest_motivo_anul_id:"string?",
  }
}
 const pendiente = {
  name:'pendiente',
  properties:{
    data:'pedido',
    data1:'string',
    show:'PendienteD',
    fecha:'string',
    total:'float?',
    id:'int'
  }
}
const PendienteDetalles = {
  name:'PendienteD',
  properties:{
    id:'int?',
    usuario_id: 'int?',
    adm_clientes_id: 'int?',
    adm_empresa_id: 'int?',
    imagen: 'string?',
    rest_mesas_id:'int?',
    rest_estatus_id:'int?',
    cant_personas:'int?',
    fecha_at: 'string?',
    fecha_in: 'string?',
    autorizo:"string?",
    motivo:"string?",
    observacion:"string?",
    detalles:'detalles[]',
    adm_enc_facturas_id:"int?",
    fecha:'string?',
    total:'float?',
  }
}
 const Realizado = {
  name:'realizados',
  properties:{
    id:'int?',
    usuario_id: 'int?',
    adm_clientes_id: 'int?',
    adm_empresa_id: 'int?',
    imagen: 'string?',
    rest_mesas_id:'int?',
    rest_estatus_id:'int?',
    cant_personas:'int?',
    fecha_at: 'string?',
    fecha_in: 'string?',
    autorizo:"string?",
    motivo:"string?",
    observacion:"string?",
    detalles:'detalles[]',
    adm_enc_facturas_id:"int?",
    fecha:'string?',
    total:'float?',
  }
}
const StatusPedido = {
  name:"statusPedido",
  properties:{
    id:"int",
    nombre:"string"
  }
}

export default {pendiente,detalles,pedido,Realizado,PendienteDetalles,StatusPedido}