/* eslint-disable */
import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
    constructor() {
        MongoClient.connect(url, async (error, client) => {
            if (error) {
                console.log(error.message);
                this.db = false;
                return;
            }
            this.db = client.db(DB_DATABASE);
            this.users = this.db.collection('users');
            this.files = this.db.collection('files');

            const usersCount = await this.users.countDocuments();
            if (usersCount === 0) {
                const users = [
                    { name: 'John' },
                    { name: 'Jane' },
                    { name: 'Alice' },
                    { name: 'Bob' }
                ];
                await this.users.insertMany(users);
            }

            const filesCount = await this.files.countDocuments();
            if (filesCount === 0) {
                const files = Array.from({ length: 30 }, (_, i) => ({ name: `file${i + 1}` }));
                await this.files.insertMany(files);
            }
        });
    }

    isAlive() {
        return !!this.db;
    }

    async nbUsers() {
        return this.users.countDocuments();
    }

    async nbFiles() {
        return this.files.countDocuments();
    }
}
const dbClient = new DBClient();
export default dbClient;