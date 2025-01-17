/* eslint-disable */
import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
    constructor() {
        this.db = null;
        this.users = null;
        this.files = null;
        this.init();
    }

    async init() {
        try {
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            this.db = client.db(DB_DATABASE);
            this.users = this.db.collection('users');
            this.files = this.db.collection('files');
        } catch (err) {
            console.error('Erreur lors de la connexion à MongoDB :', err.message);
        }
    }

    isAlive() {
        return !!this.db;
    }

    async nbUsers() {
        if (!this.users) {
            throw new Error('La collection users n\'est pas encore initialisée.');
        }
        return this.users.countDocuments();
    }

    async nbFiles() {
        if (!this.files) {
            throw new Error('La collection files n\'est pas encore initialisée.');
        }
        return this.files.countDocuments();
    }
}

const dbClient = new DBClient();
export default dbClient;
