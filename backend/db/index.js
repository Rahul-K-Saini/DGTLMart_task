import { MongoClient } from "mongodb";

const url = 'mongodb+srv://rahul:Oo53608A9G4k9kw4@cluster0.jvci0gs.mongodb.net/';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let dbConnection;

export async function connectToDatabase() {
  if (dbConnection) return dbConnection;

  try {
    await client.connect();
    console.log('Connected successfully to server');
    dbConnection = client.db('moviesdb');
    return dbConnection;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

export async function main() {
  const db = await connectToDatabase();
  const collection = db.collection('movies');
  const res = await collection.find({}).toArray();
  return res;
}

export async function findUserByUsername(searchTerm) {
    const db = await connectToDatabase();
    const collection = db.collection('movies');
    const regex = new RegExp(searchTerm, 'i'); 
    const res = await collection.find({ username: { $regex: regex } }).toArray();
    return res;
  }