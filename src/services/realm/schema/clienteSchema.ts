
const ClientList = {
  name: 'clientList',
  properties: {
    clients: 'cliente[]'
  }
}
const Zona = {
  name:"zona",
  properties:{
    id:"int",
    nombre:"string"
  }
}

const Clientes = {
  name: 'cliente',
  properties: {
    adm_ciudad_id: 'int',
    adm_estado_id: 'int',
    adm_grupo_cliente_id: 'int',
    adm_tipo_estatus_id: 'int',
    adm_zonas_id:'int?',
    cedula: 'string?',
    contacto: 'string?',
    contribuyente: 'string?',
    correo_electronico: 'string?',
    correo_electronico2: 'string?',
    descuento: 'string?',
    direccion: 'string?',
    direccion_fisica: 'string?',
    empleado: 'int?',
    fecha_at: 'string?',
    fecha_in: 'string?',
    fecha_nac: 'string?',
    horario: 'string?',
    id: 'int',
    imagen: 'string?',
    limite_credito: 'int?',
    nombre: 'string?',
    nombre_comercial: 'string?',
    observacion: 'string?',
    pag_web: 'string?',
    sexo: 'string?',
    tarifa: 'string?',
    telefono1: 'string?',
    telefono2: 'string?',
    telefono3: 'string?',
    telefono_contacto: 'string?',
    usuario_id: 'int?'
  }
}


export default { Clientes, ClientList,Zona  };