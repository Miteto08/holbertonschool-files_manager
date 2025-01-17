/* eslint-disable */
import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
    constructor() {
        // Initialisation des propriétés
        this.db = null;
        this.users = null;
        this.files = null;
        this.init(); // Lancement de la connexion
    }

    // Méthode d'initialisation asynchrone
    async init() {
        try {
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            this.db = client.db(DB_DATABASE); // Connexion à la base de données
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
        return this.users.countDocuments();
    }

    async nbFiles() {
        return this.files.countDocuments();
    }
}
const dbClient = new DBClient();
export default dbClient;
