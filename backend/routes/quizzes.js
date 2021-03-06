const express = require("express");
const bodyParser = require("body-parser");
const {get_problems_by_topic} = require("../dataAccess/problemsData");
const {add_quiz} = require("../dataAccess/quizzesData");
const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const isTeacher = function (req, res, next) {
    if (!(req.session.type == "teacher")) return res.status(401).end("access denied");
    next();
};

//basic QA checkup
router.get("/", async function (req, res) {
    console.log("path /api/quiz/");

    res.status(200).send("/api/quiz/ in users controller");
});

// Generate quiz
router.post(
    "/generate", isTeacher, async function (req, res) {

        console.log("path /api/quiz/generate/");
        const numQuestions = parseInt(req.body.numQuestions);
        const problem_ids = await get_problems_by_topic(req.body.topic, numQuestions);
        const random_index = rand(0, problem_ids.length - numQuestions);
        const selected_problems = problem_ids.slice(random_index, random_index + numQuestions);
        let selected_ids = [];
        selected_problems.forEach(item => selected_ids.push(item._id));
        const result = await add_quiz(req.body.quiz_name, req.body.teacher_email, req.body.topic, selected_ids);

        if (result) {
            res.status(200).json({message: "Added quiz", quiz_name: req.body.quiz_name});
        } else {
            res.status(500).json({error: "Internal server error"});
        }
    }
);

// Random number generator. I know this is not the place to write it but spent so long on this project, no more time....
rand = function (min, max) {
    if (min == null && max == null)
        return 0;

    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

//export the router
module.exports = router;
