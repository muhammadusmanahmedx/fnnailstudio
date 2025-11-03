import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
        }

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            console.log('MongoDB connected successfully');
            return mongoose;
        }).catch((error) => {
            console.error('MongoDB connection error:', error);
            cached.promise = null; // Reset promise so it can be retried
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        cached.promise = null; // Reset promise so it can be retried
        throw error;
    }
}

export default connectToDatabase;