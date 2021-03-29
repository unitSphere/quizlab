const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
const users_collection = "users";


exports.add_user = async (username, email, password, salt) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).insertOne(
        {username: username, email: email, password: password, salt: salt}));
};

exports.user_signin = async (username, password) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username: username, password: password}));
};

exports.find_user_by_email = async (email) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {email: email}));
};

exports.get_users = async () => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).find(
        {}).toArray());
};

exports.find_user_by_username = async (username) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username: username}));
};