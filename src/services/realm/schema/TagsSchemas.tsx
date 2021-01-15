
const Marcas = {
  name: 'marcas',
  properties: {
    id: 'int?',
    nombre: 'string?',
    descuento: 'int?'
  },
};




const SubGrupo = {
  name: 'subgrupo',
  properties: {
    id: 'int?',
    adm_grupos_id: 'int?',
    nombre: 'string?',
    visualizar: 'int?',
    posicion: 'int?',
    imagen: 'string?',
  },
};


const Grupo = {
  name: 'grupo',
  properties: {
    id: 'int?',
    nombre: 'string?',
    imagen: 'string?',
    visualizar: 'int?',
    posicion: 'int?',
    estado:'int?',
    subgrupos: 'subgrupo[]',
  },
};
export default {SubGrupo,Marcas,Grupo};