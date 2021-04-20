const express = require("express");
const bodyParser = require("body-parser");
const cookie = require("cookie");
const {applyValidationRules, validate} = require("../utilities/inputValidator");
const {
    add_student,
    add_teacher,
    find_student_by_email,
    find_teacher_by_email
} = require("../dataAccess/usersData");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// QA Logging
router.get("/", async function (req, res) {
    console.log("path /api/user/");

    res.status(200).send("/api/user/ in users controller");
});


// Signup Route (for both student and teacher accounts)
router.post(
    "/signup",
    applyValidationRules("/signup"),
    validate,
    async function (req, res) {
        console.log("path /api/user/signup/");
        let username = req.body.name;
        let password = req.body.password;
        let email = req.body.email;
        let userType = req.body.userType;
        let result;

        if (userType === "student") {
            let already_exists = await find_student_by_email(email);
            if (already_exists) return res.status(409).json({error: "Student with this email already exists"});

            result = await add_student(username, email, password);

        } else if (userType === "teacher") {
            let already_exists = await find_teacher_by_email(email);
            if (already_exists) return res.status(409).json({error: "Teacher with this email already exists"});

            result = await add_teacher(username, email, password);
        }

        if (result) {
            userType === "student" ? req.session.type = "student" : req.session.type = "teacher";
            req.session.username = email;
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("username", email, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7
                })
            );
            return res.status(200).json({success: "user with email: " + email + " signed up"});
        }

        return res.status(500).json({error: "Internal server error"});
    }
);

// Login Route (for both student and teacher accounts)
router.post(
    "/login",
    applyValidationRules("/login"),
    validate,
    async function (req, res) {
        console.log("path /api/user/login/");
        let username = req.body.username;
        let password = req.body.password;

        // Retrieve from database
        let student = await find_student_by_email(username);
        let teacher = await find_teacher_by_email(username);

        // console.log(student, teacher);

        if (!student && !teacher) {
            return res.status(409).json({error: "User with this username does not exist"});
        }

        if (student) {
            if (student.password !== password)
                return res.status(401).json({error: "access denied"});

            // initialize cookie
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("username", username, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7
                })
            );
            req.session.type = "student";
        }
        else if (teacher) {
            if (teacher.password !== password)
                return res.status(401).json({error: "access denied"});


            // initialize cookie
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("username", username, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7
                })
            );
            req.session.type = "teacher";

        }

        //session
        req.session.username = username;
        return res.json({success: "user " + username + " signed in"});
    }
);

// Logout Route
router.post("/logout", function (req, res) {
    console.log("path /api/user/logout/");
    req.session.destroy();
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("username", "", {
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
        })
    );
    res.status(200).json({success: "Logged out"});
});

// Check if user is authenticated
router.get("/isauthenticated", function (req, res) {
    if (req.session.username)
        return res.json({isauth: true, username: req.session.username, type: req.session.type});
    return res.json({isauth: false, username: null});
});


// //Update email of a user
// router.patch(
//     "/profile/email", isAuthenticated,
//     applyValidationRules("/profile/email"),
//     validate,
//     async function (req, res) {
//         console.log("path /api/user/profile/email");
//         const result = await update_email(req.body.username, req.body.email);
//         if (result && result.modifiedCount) {
//             return res
//                 .status(200)
//                 .json({
//                     message: `Updated the email of the user ${req.body.username}`
//                 });
//         }
//         return res.status(404).json({
//             error: "User with the given username not found or the email is the same"
//         });
//     }
// );
//
// //Update password of a user
// router.patch("/profile/password",
//     isAuthenticated,
//     applyValidationRules("/profile/password"),
//     validate,
//     async function (req, res) {
//         console.log("path /api/user/profile/password");
//         //check old password
//         const username = req.body.username;
//         let old_password = req.body.old_password;
//         const user = await find_user_by_username(username);
//         if (!user) {
//             return res
//                 .status(409)
//                 .json({error: "User with this username does not exist"});
//         }
//         let salt = user.salt;
//         let old_hash = crypto.createHmac("sha512", salt);
//         old_hash.update(old_password);
//         let saltedHash = old_hash.digest("base64");
//         old_password = saltedHash;
//         if (user.password !== old_password)
//             return res.status(401).json({error: " old passwords don't patch"});
//         let new_password = req.body.new_password;
//         let new_salt = crypto.randomBytes(16).toString("base64");
//         let new_hash = crypto.createHmac("sha512", new_salt);
//         new_hash.update(new_password);
//         let new_saltedHash = new_hash.digest("base64");
//         new_password = new_saltedHash;
//         const result = await update_password(req.body.username, new_password, new_salt);
//         if (result && result.modifiedCount) {
//             return res
//                 .status(200)
//                 .json({message: `Updated the password of the user ${req.body.username}`});
//         }
//         return res.status(404).json({
//             error: "User with the given username not found or the new password is the same as the old one."
//         });
//     });

module.exports = router;
