const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
let ObjectId = require('mongodb').ObjectID;
const students_collection = "students";
const teachers_collection = "teachers";

exports.add_student = async (name, email, password) => {
    return await executeQuery(db, async (db) => await db.collection(students_collection).insertOne(
        {fullName: name, email: email, password: password}));
};

exports.get_students = async () => {
    return await executeQuery(db, async (db) => await db.collection(students_collection).find({}).toArray());
};

exports.find_student_by_email = async (email) => {
    return await executeQuery(db, async (db) => await db.collection(students_collection).findOne(
        {email: email}));
};

exports.get_students_by_ids = async (student_ids) => {
    student_ids.forEach((id, index, student_ids) => student_ids[index] = ObjectId(id));
    console.log(student_ids);
    return await executeQuery(db, async (db) => await db.collection(collection).find({"_id" : {"$in" : student_ids}}).toArray())
}

exports.add_teacher = async (username, email, password) => {
    return await executeQuery(db, async (db) => await db.collection(teachers_collection).insertOne(
        {username: username, email: email, password: password}));
};

exports.find_teacher_by_email = async (email) => {
    return await executeQuery(db, async (db) => await db.collection(teachers_collection).findOne(
        {email: email}));
};

exports.find_teacher_by_id = async (id) => {
    const _id = ObjectId(id);
    return await executeQuery(db, async (db) => await db.collection(teachers_collection).findOne(
        {_id: _id}));
};

