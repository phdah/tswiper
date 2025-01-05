import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

class SQLiteService {
    db: SQLite.SQLiteDatabase | null = null;

    sqlQueries = {
        createTable: `create table if not exists items (
                        id integer primary key autoincrement,
                        name text)`,
        insertItem: `insert into items (name) values (?)`,
        getItem: `select name from items order by id desc`,
        deleteItem: `delete from items where name == ?`,
    };

    constructor() {
        this.initializeDatabase();
    }

    async initializeDatabase() {
        try {
            this.db = await SQLite.openDatabase({
                name: 'app_database.db',
                location: 'default',
            });
            console.log('Database opened successfully');
            dbService.initializeTable();
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
            await this.db.executeSql(this.sqlQueries.createTable);
            console.log('Table created successfully');
        } catch (error) {
            console.error('Error creating table:', error);
        }
    }

    addItems(item: string) {
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

    async getItems(): Promise<Array<{name: string}>> {
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
