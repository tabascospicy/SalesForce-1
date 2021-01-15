import Realm from 'realm';
import moment from 'moment';
import realm from "./schema";
import reactotron from 'reactotron-react-native';
const DataBase = () => {
  const read = async (name: string) => {
    try {
      var result;
      realm.write(() => {
        const em = realm.objects(name);
        result = [...em];
        // realm.close();
      });
      return {...result[0], productos: []};
    } catch (e) {
      console.log(e, 'Error');
      return 'error';
    }
  };
  const SaveElements = async (elements: any, name:DB.DBmodels) => {
    try {
      var result = true;
      realm.write(() => {
        const checkExistence = realm.objects(name);
        if (checkExistence.length === 0) {
          const creados = elements.map((el: any, index: number) => {
            realm.create(name, el);
          });
          reactotron.log(creados);
          console.log("Creado",creados,name);
          result = true
        } else {
            result = true
          realm.delete(checkExistence);
          const creados = elements.map((el: any, index: number) => {
            realm.create(name, el);
          });
          console.log("Creados",name,creados)
        }
      }
      )
      return result
      ;
    } catch (e) {
      
      console.log(e, 'Error');
      return false;
    }
  };
  const Write = async (newData: Array<Product>, empresa: Empresa) => {
    try {
      let current: Empresa;
      realm.write(() => {
        current = realm.objects('empresa');
        if (!current.length) {
          
          realm.create('empresa', {
            adm_empresa_id: 2,
            nombre_comercial: empresa.nombre_comercial,
            nota: empresa.nota,
            direccion: empresa.direccion,
            productos: newData,
            nombre: empresa.nombre_comercial,
            correo: empresa.correo_electronico,
            correo_electronico: empresa.correo_electronico,
            imagen: empresa.imagen,
            totalCount: 0,
          });
        } else {
          
          current[0].adm_empresa_id = empresa.adm_empresa_id || 1;
          current[0].nombre_comercial = empresa.nombre_comercial;
          current[0].nota = empresa.nota;
          current[0].direccion = empresa.direccion;
          current[0].correo_electronico = empresa.correo_electronico;
          current[0].imagen = empresa.imagen;
          current[0].productos = newData;
          current[0].nombre = empresa.nombre_comercial;
          current[0].totalCount = 0;
        }

        // realm.close();
        return current;
      });
    } catch (e) {
      console.log(e,"empresa");
    }
  };
  const writeFecha = async () => {
    try {
      realm.write(() => {
        let fechas = realm.objects('date');
        
        if (fechas.length) {
          
          fechas[0].Filled_at = moment(new Date()).format('dddd, MMMM Do, h:mm:ss a');
        } else {
          realm.create('date', {
            Filled_at: moment(new Date()).locale("es").format('dddd, MMMM Do, h:mm:ss a'),
          });
        }
        return 'saved';
      });
    } catch (e) {
      console.log(e,"fecha");
    }
  };
  const WriteCliente = async (newData: Array<Cliente>) => {
    try {
      realm.write(() => {
        let allClients = realm.objects('clientList');
        const data = []
        if (allClients.length) {
          allClients[0].clients = newData;
          
        } else {
          const clientes = realm.create('clientList', {clients: newData});
        }

        return 'saved';
      });
    } catch (e) {
      console.log(e,"clientes");
    }
  };
  const WriteUsuarios = async (newData: Array<User>) => {
    try {
      realm.write(() => {
        let allUsers = realm.objects('usuario');
        if (allUsers.length) {
          realm.delete(allUsers);
        }
        newData.map((current) => {
          realm.create('usuario', current);
        });
        return 'saved';
      });
    } catch (e) {
      console.log(e,"usuarios");
    }
  };
  const customRequest = (callback: (realm: Realm) => void) => {
    try {
      realm.write(() => {
        callback(realm);
        
      });
    } catch (e) {}
  };
  const WriteEmpresa = async (empresa: Empresa) => {
    try {
      let current: Empresa;
      realm.write(() => {
        current = realm.objects('empresa')[0] as Empresa;
        current.adm_empresa_id = empresa.adm_empresa_id;
        current.nombre_comercial = empresa.nombre_comercial;
        current.nota = empresa.nota;
        current.direccion = empresa.direccion;
        current.correo_electronico = empresa.correo_electronico;
        current.imagen = empresa.imagen;
        return current;
      });
    } catch (e) {
      console.log(e);
    }
  };
  const readAll = async (model:DB.DBmodels,query:string="") =>{
    try {
      var data:any = [];
      realm.write(()=>{
        let dbData = realm.objects(model);
        if(query){
          data = dbData.filtered(query)
        }else{
          data = dbData
        }

      })
      return data
    } catch (error) {
        console.log(error);
        reactotron.log(error)
    }
  }
  const addNombresToDetalles = async (
    detalles: DetallesToServer[],
    callback: (x: DetalleConNombre[]) => void,
  ) => {
    try {
      realm.write(() => {
        const productos = realm.objects('producto');

        const detallesConNombre: DetalleConNombre[] = detalles.map(
          (element: DetallesToServer, key) => {
            const p = productos.filtered(`id = ${element.adm_conceptos_id}`) as Product;

            const resultado: DetalleConNombre = {
              ...element,
              nombre: p?.nombre,
              descripcion: p?.descripcion,
            };
            return resultado;
          },

        );
        callback(detallesConNombre);
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  return {
    read,
    Write,
    WriteCliente,
    WriteUsuarios,
    customRequest,
    WriteEmpresa,
    readAll,
    realm,
    SaveElements,
    writeFecha,
    addNombresToDetalles,
  };
};
export default DataBase;
