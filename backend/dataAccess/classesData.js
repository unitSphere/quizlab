const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
const collection = "classes";
let ObjectId = require('mongodb').ObjectID;


exports.add_class = async (newClass) => {
    return await executeQuery(db, async (db) => await db.collection(collection).insertOne(
        {name: newClass.name, teacher_id: newClass.teacher_id, student_ids: newClass.student_ids}));
};

// exports.user_signin = async (username, password) => {
//     return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
//         {username: username, password: password}));
// };

exports.find_class_by_id = async (id) => {
    const _id = ObjectId(id);
    return await executeQuery(db, async (db) => await db.collection(collection).findOne(
        {_id: _id}));
};

exports.find_class_by_name = async (name) => {
    return await executeQuery(db, async (db) => await db.collection(collection).findOne(
        {name: name}));
};

exports.get_classes = async () => {
    return await executeQuery(db, async (db) => await db.collection(collection).find(
        {}).toArray());
};
