import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

const sentences = {
  createEmpresa: () =>
    'CREATE TABLE IF NOT EXISTS empresa(adm_empresa_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_comercial VARCHAR(50), totalCount INT(10), direccion VARCHAR(255),imagen VARCHAR(50),nombre VARCHAR(50) , nota VARCHAR(200),correo_electronico VARCHAR(50))',
  createProductos: () =>
    'CREATE TABLE IF NOT EXISTS productos(product_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50),imagen VARCHAR(50),codigo VARCHAR(50) , descripcion VARCHAR(200),precio_dolar VARCHAR(40),referencia INT(10), precio_a INT(10), precio_b INT(10), precio_c INT(10) )',
  init: () =>
    `SELECT * FROM sqlite_master WHERE type='table' AND name='empresa'`,
  select: (model: string) => `SELECT * FROM ${model}`,
};
const useSQL = () => {
  const Init = async () => {
    try {
      let Db = await SQLite.openDatabase({name: 'SalesForce.db'});
      Db.transaction(function (txn) {
        txn.executeSql(sentences.init(), [], function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS empresa', []);
            txn.executeSql('DROP TABLE IF EXISTS productos', []);
            txn.executeSql(sentences.createEmpresa(), []);
            txn.executeSql(sentences.createProductos(), []);
          }
        });
      });
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const Read = async () => {
    try {
      let Db = await SQLite.openDatabase({name: 'SalesForce.db'});
      return await Db.transaction((txn) => {
        let data = {};
        txn.executeSql(sentences.select('empresa'), [], (tx, res) => {
          console.log('item:', res.rows.length);
          data = {...data, empresa: res.rows};
        });
        txn.executeSql(sentences.select('productos'), [], (tx, res) => {
          data = {...data, productos: res.rows};
          console.log('item:', res.rows.length);
        });
        return data;
      });
    } catch (e) {
      console.log(e, 'error');
    }
  };
  const UpdateProductos = async (actuales:Array<Product>,nuevos: Array<Product>) => {
    let Db = await SQLite.openDatabase({name: 'SalesForce.db'});
    Db.transaction((tx) => {
      nuevos.map((element, index) => {
        tx.executeSql(
          'UPDATE producto set nombre=?,imagen=?,descripcion=?,codigo=?,precio_dolar=?,precio_a=?,precio_b=?,precio_c=? WHERE id=?',
          [
            element.nombre,
            element.imagen,
            element.descripcion,
            element.codigo,
            element.precio_dolar,
            element.precio_a,
            element.precio_b,
            element.precio_c,
            element.id,
          ],
          (tx, results) => {
            console.log('Results', results);
          },
        );
      });
    });
  };
  const UpdateEmpresa = async ({
    nombre_comercial,
    nombre,
    imagen,
    nota,
    correo_electronico,
    correo,
    totalCount,
    direccion,
  }: Empresa) => {
    let Db = await SQLite.openDatabase({name: 'SalesForce.db'});
    Db.transaction((tx) => {
      tx.executeSql(
        'UPDATE empresa set nombre_comercial,nombre,imagen,nota,correo_electronico,correo,totalCount,direccion WHERE adm_empresa_id=1',
        [
          nombre_comercial,
          nombre,
          imagen,
          nota,
          correo_electronico,
          correo,
          totalCount,
          direccion,
        ],
        (tx, results) => {
          console.log('Results', results);
        },
      );
    });
  };
  const FillProductos = async (productos: Array<Product>) => {
    let Db = await SQLite.openDatabase({name: 'SalesForce.db'});
    Db.transaction((tx) => {
      productos.map((element, index) => {
        tx.executeSql(
          'INSERT INTO productor (nombre,imagen,descripcion,codigo,precio_dolar,precio_a,precio_b,precio_c,product_id) VALUES (?,?,?,?,?,?,?,?,?)',
          [
            element.nombre,
            element.imagen,
            element.descripcion,
            element.codigo,
            element.precio_dolar,
            element.precio_a,
            element.precio_b,
            element.precio_c,
            element.id,
          ],
          (tx, results) => {
            console.log('Results', results);
          },
        );
      });
    });
  };
  return {UpdateProductos, Read, UpdateEmpresa, FillProductos, Init};
};

export default useSQL;
