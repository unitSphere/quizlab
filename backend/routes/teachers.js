
const express = require("express");
const bodyParser = require("body-parser");

const {find_teacher_by_email, add_teacher} = require("../dataAccess/teachersData");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//basic QA checkup
router.get("/", async function(req, res) {
    console.log("path /api/teacher/");

    res.status(200).send("/api/teacher/ in users controller");
});


router.post(
    "/add", async function (req, res){

        console.log("path /api/teacher/add/");
        let teacher = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: "random",
            salt: "salt"
        };
        const exists_in_student_db = await find_teacher_by_email(teacher.email);

        if (exists_in_student_db) {
            return res
                .status(409)
                .json({ error: "Teacher with this email already exists" });
        }

        const result = await add_teacher(teacher);
        console.log(result.ops[0]._id);
        if(result) {
            res.status(200).json({message: "Added teacher"});
        }else {
            res.status(500).json({error: "Internal server error"});
        }

    }
);

router.get(
    "/all", async function (req, res) {
        console.log("path /api/teachers/all/");
        const result = await get_students();
        res.status(200).json(result);
    }
);

//export the router
module.exports = router;
