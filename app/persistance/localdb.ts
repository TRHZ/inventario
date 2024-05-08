import SQLite from 'react-native-sqlite-storage';

export default class localDB {
    static async connect(){
        return SQLite.openDatabase({name: 'inventario'});
    }
    static async init(){
        const db = localDB.connect();
        (await db).transaction(tx =>{
            tx.executeSql(
                //DDL: Data Definition Language
                //DML: Data Manipulation Language
                `CREATE TABLE IF NOT EXISTS productos (
                'id             INTEGER         PRIMARY KEY     AUTOINCREMENT,
                'nombre         VARCHAR(64)     NOT NULL,
                'precio         DECIMAL(10,2)   NOT NULL        DEFAULT "0.0",
                'minStock       INTEGER         NOT NULL        DEFAULT 0,
                'currentStock   INTEGER         NOT NULL        DEFAULT 0,
                'maxStock       INTEGER         NOT NULL        DEFAULT 0
                );`, 
                [],
                () => console.log('CREATED TABLE productos'),
                error => console.error({error}),
            );
        });
    }
}

