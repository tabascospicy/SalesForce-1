
const EmpresaSchema = {
  name:'empresa',
  properties:{
    nombre_comercial: 'string',
    imagen: 'string?',
    nombre:'string',
    nota:'string',
    correo_electronico:'string',
    correo:'string',
    direccion: 'string',
    productos: 'producto[]',
    adm_empresa_id: 'int',
    totalCount:'int',
    id:                    "int?",
    rif:                    'string?',
    business_type:          "int?",
    razon_social:           'string?',
    fecha_registro:         'string?',
    telefono1:              'string?',
    telefono2:              'string?',
    telefono3:              'string?',
    pag_web:                'string?',
    correo_electronico2:    'string?',
    twitter:                'string?',
    facebook:               'string?',
    instagram:              'string?',
    firma_digital:          'string?',
    tipo_imagen:            'string?',
    licencia_licores:       'int?',
    marca_agua:             'string?',
    tipo_calculo:           'int?',
    contribuyente_especial: 'int?',
    nota2:                  'string?',
    color_presupuesto:      'string?',
    img_barcode:            'string?',
    modelo:                 'int?',
    estado_id:              'int?',
    municipio_id:           'int?',
    activo:                'int?',
    tipo_plan_id:          'int?',
  }
}

const Tenant = {
  name:"tenant",
  properties:{
    nombre:"string?",
    correo:"string?",
    id:"int?",
    tenantId:"string?",
  }
}

export default {EmpresaSchema,Tenant};