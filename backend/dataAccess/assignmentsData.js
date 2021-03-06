const {get_answers_by_problem_ids, get_problems_by_ids} = require("./problemsData");

const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
const collection = "assignments";
let ObjectId = require('mongodb').ObjectID;

exports.get_answers_by_assignment_id = async (assignment_id) => {
    assignment_id = ObjectId(assignment_id);
    let assignment = await executeQuery(db, async (db) => await db.collection(collection).findOne({_id: assignment_id}));
    const quiz_name = assignment.quiz_name;
    let quiz = await executeQuery(db, async (db) => await db.collection("quizzes").findOne({name: quiz_name}));
    let correct_answers = await get_answers_by_problem_ids(quiz.problem_ids);
    return correct_answers;
};

exports.get_assignment_by_id = async (assignment_id) => {
    const _id = ObjectId(assignment_id);

    let assignment = await executeQuery(db, async (db) => await db.collection(collection).findOne({_id: _id}));
    return assignment
};

exports.get_assignments_by_teacher_email = async (teacher_email) => {
    let assignments = await executeQuery(db, async (db) => await db.collection(collection).find({teacher_email: teacher_email}).toArray());
    return assignments
};

exports.get_problems_by_assignment_id = async (assignment_id) => {
    const _id = ObjectId(assignment_id);
    let assignment = await executeQuery(db, async (db) => await db.collection(collection).findOne({_id: _id}));
    const quiz_name = assignment.quiz_name;
    let quiz = await executeQuery(db, async (db) => await db.collection("quizzes").findOne({name: quiz_name}));

    let problems = await get_problems_by_ids(quiz.problem_ids);
    return problems;
};

exports.add_assignment = async (quiz_name, teacher_email, class_id) => {
    return await executeQuery(db, async (db) => await db.collection(collection).insertOne(
        {quiz_name: quiz_name, teacher_email: teacher_email, class_id: class_id, created_at: new Date()}));
};
