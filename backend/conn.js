// Author: Rahul Saliya

const { MongoClient } = require("mongodb");

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

/** Function to get database connection */
async function db() {
    let conn;
    try {
        conn = await client.connect();
    } catch (e) {
        console.error(e);
    }

    let database = conn.db("WebProject");

    return database;
}

/** Function to listen for notifications */
async function listenForNotifications() {
    const database = await db();

    const collection = database.collection("notifications");

    const changeStream = collection.watch();

    changeStream.on("change", next => {
        const userId = next.fullDocument.userId;
        const socket = global.sockets[userId];

        console.log("Notification received:", next.fullDocument);
        if (socket) {
            socket.emit("message", next.fullDocument);
        } else {
            console.log("Socket not found for userId:", userId);
        }
    });

    return changeStream;
}

/** Function to send notification */
async function sendNotification(notification) {
    const { userId, title, description, payload } = notification;

    if (!userId || !title || !description || !payload) {
        new Error("Invalid notification");
        return;
    }

    const database = await db();

    const collection = database.collection("notifications");

    await collection.insertOne(notification);
}

module.exports = {
    db,
    listenForNotifications,
    sendNotification
};