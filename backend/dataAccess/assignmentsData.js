const {get_answers_by_problem_ids} =  require("./problemsData");

const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
const collection = "assignments";
let ObjectId = require('mongodb').ObjectID;



exports.get_answers_by_assignment_id = async (assignment_id) => {
    let assignment = await executeQuery(db, async (db) => await db.collection(collection).findOne({assignment_id: assignment_id}));
    const quiz_id = ObjectId(assignment.quiz_id);
    let quiz = await executeQuery(db, async (db) => await db.collection("quizzes").findOne({_id: quiz_id}));
    let correct_answers = await get_answers_by_problem_ids(quiz.problem_ids);
    return correct_answers;
};


// exports.add_submission = async (submission) => {
//     return await executeQuery(db, async (db) => await db.collection(collection).insertOne(
//         {student_id: submission.student_id, assignment_id: submission.assignment_id, score: -1, answers: [], submitted: false, created_at: new Date()}));
// };
//
// exports.update_submission = async (submission_id, fields) => {
//     const _id = ObjectId(submission_id);
//     console.log(fields);
//     return await executeQuery(db, async (db) => await db.collection(collection).updateOne(
//         {_id: _id}, {$set: fields}));
// };
//
// exports.get_submissions_by_student_id = async (student_id) => {
//     return await executeQuery(db, async (db) => await db.collection(collection).find(
//         {student_id: student_id}).toArray());
// };

// exports.user_signin = async (username, password) => {
//     return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
//         {username: username, password: password}));
// };
//
// exports.find_class_by_id = async (id) => {
//     const _id = ObjectId(id);
//     return await executeQuery(db, async (db) => await db.collection(collection).findOne(
//         {_id: _id}));
// };
//
// exports.find_class_by_name = async (name) => {
//     return await executeQuery(db, async (db) => await db.collection(collection).findOne(
//         {name: name}));
// };
//
// exports.get_classes = async () => {
//     return await executeQuery(db, async (db) => await db.collection(collection).find(
//         {}).toArray());
// };