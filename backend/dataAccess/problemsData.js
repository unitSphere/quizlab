const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
const collection = "problems";
let ObjectId = require('mongodb').ObjectID;


exports.add_problem = async (problem) => {
    return await executeQuery(db, async (db) => await db.collection(collection).insertOne(
        {topic: problem.topic, description: problem.description, choices: problem.choices, correct_choice: problem.correct_choice}));
};

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


exports.get_problems_by_ids = async (problem_ids) => {
    problem_ids.forEach((id, index, problem_ids) => problem_ids[index] = ObjectId(id));
    console.log(problem_ids);
    return await executeQuery(db, async (db) => await db.collection(collection).find({"_id" : {"$in" : problem_ids}}).toArray())
};



exports.get_answers_by_problem_ids = async (problem_ids) => {
    problem_ids.forEach((id, index, problem_ids) => problem_ids[index] = ObjectId(id));
    console.log(problem_ids);
    return await executeQuery(db, async (db) => await db.collection(collection).find({"_id" : {"$in" : problem_ids}}, {correct_choice: 1}).toArray())
};