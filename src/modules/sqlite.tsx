import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

class SQLiteService {
    db: SQLite.SQLiteDatabase | null = null;

    dbConfig = {
        name: 'tswiper_base.db',
        table: {
            name: 'amounts',
            columns: {id: 'id', value: 'amount', state: 'state'},
            alias: {sumOf: 'sumOf'},
        },
        states: {UNSET: 'UNSET', GROUP: 'GROUP', PRIVATE: 'PRIVATE'},
    };
    sqlQueries = {
        dropTable: `
            drop table if exists ${this.dbConfig.table.name}`,
        createTable: `
            create table ${this.dbConfig.table.name} (
                id integer primary key autoincrement,
                ${this.dbConfig.table.columns.value} integer not null,
                ${this.dbConfig.table.columns.state} text not null
            ) strict`,
        insertItem: `insert into ${this.dbConfig.table.name} (${this.dbConfig.table.columns.value}, ${this.dbConfig.table.columns.state}) values (?, ?)`,
        getItem: `select ${this.dbConfig.table.columns.id}, ${this.dbConfig.table.columns.value} from ${this.dbConfig.table.name} where ${this.dbConfig.table.columns.state} == ? order by id asc`,
        getSumOfItem: `select sum(${this.dbConfig.table.columns.value}) as ${this.dbConfig.table.alias.sumOf} from ${this.dbConfig.table.name} where ${this.dbConfig.table.columns.state} == ? order by id asc`,
        updateItem: `update ${this.dbConfig.table.name} set ${this.dbConfig.table.columns.state} = ? where ${this.dbConfig.table.columns.id} == ?`,
        deleteItem: `delete from ${this.dbConfig.table.name} where ${this.dbConfig.table.columns.value} == ?`,
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
            this.addItems(10, this.dbConfig.states.UNSET);
            this.addItems(20, this.dbConfig.states.UNSET);
            this.addItems(100, this.dbConfig.states.PRIVATE);
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

    addItems(item: number, state: string) {
        if (!this.db) {
            console.error('Database not initialized');
            return;
        }
        try {
            this.db.executeSql(this.sqlQueries.insertItem, [item, state]);
            console.log('Item added successfully:', item);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }

    async getAllItems(): Promise<Array<{id: number; amount: number}>> {
        if (!this.db) {
            console.error('getItems: Database not initialized');
            return [];
        }
        try {
            const results = await this.db.executeSql(this.sqlQueries.getItem, [
                this.dbConfig.states.UNSET,
            ]);
            const rows = results[0].rows.raw();

            console.log('Rows fetched:', rows);
            return rows;
        } catch (error) {
            console.error('Error fetching items:', error);
            return [];
        }
    }

    async getPrivateItems(): Promise<Array<{id: number; amount: number}>> {
        if (!this.db) {
            console.error('getItems: Database not initialized');
            return [];
        }
        try {
            const results = await this.db.executeSql(this.sqlQueries.getItem, [
                this.dbConfig.states.PRIVATE,
            ]);
            const rows = results[0].rows.raw();

            console.log('Rows fetched:', rows);
            return rows;
        } catch (error) {
            console.error('Error fetching items:', error);
            return [];
        }
    }

    async getPrivateSumOfItems(): Promise<number> {
        if (!this.db) {
            console.error('getItems: Database not initialized');
            return 0;
        }
        try {
            const results = await this.db.executeSql(
                this.sqlQueries.getSumOfItem,
                [this.dbConfig.states.PRIVATE],
            );
            const rows = results[0].rows.raw();

            const value = rows[0].sumOf;
            console.log('Rows fetched:', value);
            return value;
        } catch (error) {
            console.error('Error fetching items:', error);
            return 0;
        }
    }

    async getGroupItems(): Promise<Array<{id: number; amount: number}>> {
        if (!this.db) {
            console.error('getItems: Database not initialized');
            return [];
        }
        try {
            const results = await this.db.executeSql(this.sqlQueries.getItem, [
                this.dbConfig.states.GROUP,
            ]);
            const rows = results[0].rows.raw();

            console.log('Rows fetched:', rows);
            return rows;
        } catch (error) {
            console.error('Error fetching items:', error);
            return [];
        }
    }

    async getGroupSumOfItems(): Promise<number> {
        if (!this.db) {
            console.error('getItems: Database not initialized');
            return 0;
        }
        try {
            const results = await this.db.executeSql(
                this.sqlQueries.getSumOfItem,
                [this.dbConfig.states.GROUP],
            );
            const rows = results[0].rows.raw();

            const value = rows[0].sumOf;
            console.log('Rows fetched:', value);
            return value;
        } catch (error) {
            console.error('Error fetching items:', error);
            return 0;
        }
    }

    async updateItems(itemID: number, state: string) {
        if (!this.db) {
            console.error('updateItems: Database not initialized');
            return;
        }
        try {
            this.db.executeSql(this.sqlQueries.updateItem, [state, itemID]);
            console.log(
                'Item updated successfully, ID:',
                itemID,
                ' With state:',
                state,
            );
        } catch (error) {
            console.error('Error updating item:', error);
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
