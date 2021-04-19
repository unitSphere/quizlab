
const express = require("express");
const bodyParser = require("body-parser");

const {find_student_by_email, get_students, add_student, get_students_by_ids} = require("../dataAccess/usersData");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//basic QA checkup
router.get("/", async function(req, res) {
    console.log("path /api/student/");

    res.status(200).send("/api/student/ in users controller");
});

router.get(
    "/all", async function (req, res) {
        console.log("path /api/students/all/");
        const result = await get_students();
        res.status(200).json(result);
    }
);

router.post(
    "/multiple", async function (req, res) {
        console.log("path /api/students/multiple/");
        const student_ids = req.body.student_ids;
        console.log(req.body);
        console.log(student_ids)
        const result = await get_students_by_ids(student_ids);
        res.status(200).json(result);
    }
);


//export the router
module.exports = router;
