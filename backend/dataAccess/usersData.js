const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
let ObjectId = require('mongodb').ObjectID;
const students_collection = "students";
const teachers_collection = "teachers";
const quizzes_collection = "quizzes";
const classes_collection = "classes";

exports.add_student = async (name, email, password) => {
    return await executeQuery(db, async (db) => await db.collection(students_collection).insertOne(
        {fullName: name, email: email, password: password}));
};

exports.get_students = async () => {
    return await executeQuery(db, async (db) => await db.collection(students_collection).find({}).toArray());
};

exports.get_student_id_by_email = async (student_email) => {
    return await executeQuery(db, async (db) => await db.collection(students_collection).aggregate([{$match: {email: student_email}}, {$project: {_id: 1}}]).toArray());
};

exports.find_student_by_email = async (email) => {
    return await executeQuery(db, async (db) => await db.collection(students_collection).findOne(
        {email: email}));
};

exports.get_students_by_ids = async (student_ids) => {
    student_ids.forEach((id, index, student_ids) => student_ids[index] = ObjectId(id));
    console.log(student_ids);
    return await executeQuery(db, async (db) => await db.collection(students_collection).find({"_id": {"$in": student_ids}}).toArray())
}

exports.add_teacher = async (name, email, password) => {
    return await executeQuery(db, async (db) => await db.collection(teachers_collection).insertOne(
        {fullName: name, email: email, password: password}));
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

exports.find_teacher_quizzes = async (email) => {
    return await executeQuery(db, async (db) => await db.collection(quizzes_collection).find({teacher_email: email}).toArray());
}

exports.find_teacher_classes = async (email) => {
    return await executeQuery(db, async (db) => await db.collection(classes_collection).find({teacher_email: email}).toArray());
}

exports.add_quiz = async (newQuiz) => {
    return await executeQuery(db, async (db) => await db.collection(quizzes_collection).insertOne(
        {teacher_email: newQuiz.teacher_email, name: newQuiz.name, class_ids: newQuiz.class_ids}));
}