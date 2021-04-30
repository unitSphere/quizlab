
const express = require("express");
const bodyParser = require("body-parser");
const {find_class_by_name, add_class, get_classes, find_class_by_id} = require("../dataAccess/classesData");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const isTeacher = function(req, res, next) {
    if (!(req.session.type == "teacher")) return res.status(401).end("access denied");
    next();
};

//basic QA checkup
router.get("/", async function(req, res) {
    console.log("path /api/class/");

    res.status(200).send("/api/class/ in users controller");
});

// Get class by id
router.get("/id", async function(req, res) {
    console.log("path /api/class/id");
    let class_id = req.query.id;
    const className = await find_class_by_id(class_id);
    return res.status(200).json(className);
});

// Add class
router.post(
    "/add", isTeacher, async function (req, res){

        console.log("path /api/class/add/");
        let newClass = {
            name: req.body.name,
            teacher_email: req.body.teacher_email,
            student_ids: req.body.student_ids,
        };

        const exists_in_classes_db = await find_class_by_name(newClass.name);

        if (exists_in_classes_db) {
            return res
                .status(409)
                .json({ error: "Teacher with this email already exists" });
        }

        const result = await add_class(newClass);
        console.log(result.ops[0]._id);
        if(result) {
            res.status(200).json({message: "Added class"});
        }else {
            res.status(500).json({error: "Internal server error"});
        }

    }
);

// Get all classes
router.get(
    "/all", isTeacher, async function (req, res) {
        console.log("path /api/classes/all/");
        const result = await get_classes();
        res.status(200).json(result);
    }
);

//export the router
module.exports = router;
