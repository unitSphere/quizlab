const {get_answers_by_assignment_id} =  require("../dataAccess/assignmentsData");
const {update_submission} = require("../dataAccess/submissionsData");

const express = require("express");
const bodyParser = require("body-parser");

const {find_class_by_name, add_problem, get_classes} = require("../dataAccess/problemsData");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//basic QA checkup
router.get("/", async function(req, res) {
    console.log("path /api/problem/");

    res.status(200).send("/api/problem/ in problem controller");
});


router.post(
    "/submit", async function (req, res){

        console.log("path /api/submission/submit/");
        let submission_id = req.body.submission_id,
            assignment_id = req.body.assignment_id,
            answers = req.body.answers;

        const correct_answers = await get_answers_by_assignment_id(assignment_id);
        let num_of_correct_answers = 0;
        let num_of_questions = Object.keys(correct_answers);
        for(const problem in correct_answers){
            if(correct_answers[problem] === answers[problem]){
                num_of_correct_answers = num_of_correct_answers + 1;
            }
        }
        let score = num_of_correct_answers*100/num_of_questions;
        let result = update_submission(submission_id, {score: score, answers: answers});
        if(result && result.modifiedCount) {
            return res.status(200).json({"message": "An object got updated"});
        }else if(result){
            return res.status(200).json({"message": "Nothing to update"});
        }
    }
);

// router.get(
//     "/all", async function (req, res) {
//         console.log("path /api/classes/all/");
//         const result = await get_classes();
//         res.status(200).json(result);
//     }
// );

//export the router
module.exports = router;
