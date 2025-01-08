import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

class SQLiteService {
    db: SQLite.SQLiteDatabase | null = null;

    dbConfig = {
        name: 'tswiper_base.db',
        table: {name: 'ammounts', column: 'ammount'},
    };
    sqlQueries = {
        dropTable: `
            drop table if exists ${this.dbConfig.table.name}`,
        createTable: `
            create table ${this.dbConfig.table.name} (
                id integer primary key autoincrement,
                ${this.dbConfig.table.column} integer not null
            ) strict`,
        insertItem: `insert into ${this.dbConfig.table.name} (${this.dbConfig.table.column}) values (?)`,
        getItem: `select ${this.dbConfig.table.column} from ${this.dbConfig.table.name} order by id desc`,
        deleteItem: `delete from ${this.dbConfig.table.name} where ${this.dbConfig.table.column} == ?`,
    };

    constructor() {
        this.initializeDatabase();
    }

    async initializeDatabase() {
        try {
            this.db = await SQLite.openDatabase({
                name: this.dbConfig.name,
                location: 'default',
            });
            console.log('Database opened successfully:', this.dbConfig.name);
            await dbService.initializeTable();
            this.addItems(10);
            this.addItems(20);
        } catch (error) {
            console.error('Error opening database:', error);
        }
    }

    // Queries
    async initializeTable() {
        if (!this.db) {
            console.error('initializeTable: Database not initialized');
            return;
        }
        try {
            await this.db.executeSql(this.sqlQueries.dropTable);
            await this.db.executeSql(this.sqlQueries.createTable);
            console.log(
                'Table created successfully:',
                this.dbConfig.table.name,
            );
        } catch (error) {
            console.error('Error creating table:', error);
        }
    }

    addItems(item: number) {
        if (!this.db) {
            console.error('Database not initialized');
            return;
        }
        try {
            this.db.executeSql(this.sqlQueries.insertItem, [item]);
            console.log('Item added successfully:', item);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }

    async getItems(): Promise<Array<{ammount: number}>> {
        if (!this.db) {
            console.error('getItems: Database not initialized');
            return [];
        }
        try {
            const results = await this.db.executeSql(
                this.sqlQueries.getItem,
                [],
            );
            const rows = results[0].rows.raw();

            console.log('Rows fetched:', rows);
            return rows;
        } catch (error) {
            console.error('Error fetching items:', error);
            return [];
        }
    }

    async deleteItems(item: string) {
        if (!this.db) {
            console.error('deleteItems: Database not initialized');
            return;
        }
        try {
            this.db.executeSql(this.sqlQueries.deleteItem, [item]);
            console.log('Item deleted successfully:', item);
        } catch (error) {
            console.error('Error deleted item:', error);
        }
    }
}

// Exppose it as a singleton
const dbService = new SQLiteService();
export default dbService;
