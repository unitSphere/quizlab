
const express = require("express");
const bodyParser = require("body-parser");

const {find_teacher_by_email, add_teacher} = require("../dataAccess/usersData");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//basic QA checkup
router.get("/", async function(req, res) {
    console.log("path /api/teacher/");

    res.status(200).send("/api/teacher/ in users controller");
});

//export the router
module.exports = router;
