
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
    "/add", async function (req, res){

        console.log("path /api/problem/add/");
        let problem = {
            topic: req.body.topic,
            description: req.body.description,
            choices: req.body.choices,
            correct_choice: req.body.correct_choice
        };

        const result = await add_problem(problem);
        console.log(result.ops[0]._id);
        if(result) {
            res.status(200).json({message: "Added problem"});
        }else {
            res.status(500).json({error: "Internal server error"});
        }
    }
);

router.get(
    "/all", async function (req, res) {
        console.log("path /api/classes/all/");
        const result = await get_classes();
        res.status(200).json(result);
    }
);

//export the router
module.exports = router;
