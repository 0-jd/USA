import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://hecker:${process.env.DBpassword}@tele-bot.lougkon.mongodb.net/?retryWrites=true&w=majority&appName=tele-bot`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function StartDB() {
  try {

    await client.connect();
    const db = client.db(process.env.Mode)
    console.log("Database is now connected.");
    return db;
    
  } catch (err) {
    console.log("\n\nEncountered an Error: \n", err)
  }
}

