const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
const collection = "quizzes";
let ObjectId = require('mongodb').ObjectID;

exports.add_quiz = async (quizName, teacherEmail, topic, problem_ids) => {
    return await executeQuery(db, async (db) => await db.collection(collection).insertOne(
        {name: quizName, teacher_email: teacherEmail, topic: topic, problem_ids: problem_ids}));
};

