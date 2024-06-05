import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null};
// init cached variable; attempt to retrieve mongoose property from global object provides space to store variables

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;
    // check if cached is already connected; connection runs for the first time

    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    // connect to already existing cached connection or create new connection
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'evently',
        bufferCommands: false,
    })

    cached.conn = await cached.promise;

    return cached.conn;
}

// serverless functions for environments where code can be executed multiple times, but not in single continuous server process; need to manage database connections efficiently
// each invocation of serverless function can result in new connection to database
// can exhaust database resources
// server actions have to connect to database each time