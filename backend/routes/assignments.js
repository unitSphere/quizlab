
const express = require("express");
const bodyParser = require("body-parser");

const {get_problems_by_topic} = require("../dataAccess/problemsData");
const {add_assignment,get_problems_by_assignment_id} = require("../dataAccess/assignmentsData");
const {find_class_by_id} = require("../dataAccess/classesData");
const {add_submission} = require("../dataAccess/submissionsData");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


const isTeacher = function(req, res, next) {
    if (!(req.session.type == "teacher")) return res.status(401).end("access denied");
    next();
};

//basic QA checkup
router.get("/", async function(req, res) {
    console.log("path /api/assignment/");

    res.status(200).send("/api/assignment/ in users controller");
});

router.get("/problems", async function(req, res) {
    console.log("path /api/assignment/problems");
    let assignment_id = req.query.assignment_id;
    const problems = await get_problems_by_assignment_id(assignment_id);
    return res.status(200).json(problems);
});


router.post(
    "/add", isTeacher, async function (req, res){
        console.log("path /api/assignment/add/");
        const quiz_name = req.query.quiz_name;
        const teacher_email = req.query.teacher_email;
        const class_id = req.query.class_id;
        const result = await add_assignment(quiz_name, teacher_email, class_id);
        console.log(result.ops[0]._id);
        if(result) {
            const assigned_class = await find_class_by_id(class_id);
            console.log(assigned_class);
            const student_ids = assigned_class.student_ids;
            await student_ids.forEach(async id => {
                const submission = {student_id: id, assignment_id: result.ops[0]._id, quiz_name: quiz_name};
                await add_submission(submission);
            });
            res.status(200).json({message: "Added assignment"});
        }else {
            res.status(500).json({error: "Internal server error"});
        }
    }
);

//export the router
module.exports = router;
