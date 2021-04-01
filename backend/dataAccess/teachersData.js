const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
const users_collection = "teachers";
let ObjectId = require('mongodb').ObjectID;


exports.add_teacher = async (teacher) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).insertOne(
        {name: teacher.name, surname: teacher.surname, email: teacher.email, password: teacher.password, salt: teacher.salt}));
};

// exports.user_signin = async (username, password) => {
//     return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
//         {username: username, password: password}));
// };

exports.find_teacher_by_id = async (id) => {
    const _id = ObjectId(id);
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {_id: _id}));
};

// exports.find_user_by_username = async (username) => {
//     return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
//         {username: username}));
// };

exports.find_teacher_by_email = async (email) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {email: email}));
};