const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "Quizlab";
const collection = "problems";
let ObjectId = require('mongodb').ObjectID;

exports.add_problem = async (problem) => {
    return await executeQuery(db, async (db) => await db.collection(collection).insertOne(
        {topic: problem.topic, description: problem.description, choices: problem.choices, correct_choice: problem.correct_choice}));
};

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