
const express = require("express");
const bodyParser = require("body-parser");

const {add_quiz, find_teacher_by_email, add_teacher, find_teacher_quizzes, find_teacher_classes} = require("../dataAccess/usersData");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//basic QA checkup
router.get("/", async function(req, res) {
    console.log("path /api/teacher/");

    res.status(200).send("/api/teacher/ in users controller");
});

router.get(
    "/quizzes", async function (req, res) {
        console.log("path /api/teacher/quizzes/");
        let teacher_email = req.query.email;
        const result = await find_teacher_quizzes(teacher_email);
        res.status(200).json(result);
    }
);

router.get(
    "/classes", async function (req, res) {
        console.log("path /api/teacher/classes/");
        let teacher_email = req.query.email;
        const result = await find_teacher_classes(teacher_email);
        res.status(200).json(result);
    }
);

router.post(
    "/addquiz", async function (req, res){
        console.log("path /api/teacher/addquiz/");
        let newQuiz = {
            name: req.body.name,
            teacher_email: req.body.teacher_email,
            class_ids: req.body.class_ids,
        };

        const result = await add_quiz(newQuiz);

        console.log(result.ops[0]._id);
        if(result) {
            res.status(200).json({message: "Added quiz"});
        }else {
            res.status(500).json({error: "Internal server error"});
        }

    }
);

//export the router
module.exports = router;
