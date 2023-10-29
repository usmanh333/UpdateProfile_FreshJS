import {MONGODB_URI} from '../utils/envConfig.ts'
import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.32.0/mod.ts'

let db :Database;
async function createMongoDbConnection() {
    try {
        const client = new MongoClient();
        await client.connect(MONGODB_URI);
        console.log("MongoDB connection established...")
        db = client.database("fresh-test");
    } catch (error) {
        console.error(error);
    }
}

export { db, createMongoDbConnection};