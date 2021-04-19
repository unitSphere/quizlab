const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
const collection = "submissions";
let ObjectId = require('mongodb').ObjectID;

exports.add_submission = async (submission) => {
    return await executeQuery(db, async (db) => await db.collection(collection).insertOne(
        {student_id: submission.student_id, assignment_id: submission.assignment_id, score: -1, answers: [], submitted: false, created_at: new Date()}));
};

exports.update_submission = async (submission_id, fields) => {
    const _id = ObjectId(submission_id);
    console.log(fields);
    return await executeQuery(db, async (db) => await db.collection(collection).updateOne(
        {_id: _id}, {$set: fields}));
};

exports.get_submissions_by_student_id = async (student_id) => {
    return await executeQuery(db, async (db) => await db.collection(collection).find(
        {student_id: student_id}).toArray());
};
