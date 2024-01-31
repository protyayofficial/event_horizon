import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// We attempt to retrive a mongoose property from global proporty 
let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'eventHorizon',
    bufferCommands: false,
  })

  // In serverless connections or environments, where the code could be executed multiple times, but not in a single continuous server process, we need to manage db connection efficiently because each invocation of a serverless function could result in a new connection to the db and then can exhaust db resources.

  cached.conn = await cached.promise;

  return cached.conn;
}

// We use Server actions and each server action will call
// connectToDatabse() again and again, and if we weren't caching it we would be making new connections to the db again and again but since we are caching it all the subsequent requests to the connection can utilise the previous open connection if it is there else open up a new connection. Its really efficient