import axios from "axios";
let host = "http://localhost:5000/api";
export let getClasses = async () => {
    try {
        const resp = await axios.get("/api/class/all");
        console.log(resp.data);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
};

export let getStudentsByIds = async (student_ids) => {
    try {

        const resp = await axios({
            method: 'post',
            url: '/api/student/multiple',
            data: {
                student_ids: student_ids
            }
        });
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
};

export let getAllStudents = async () => {
    try {
        const resp = await axios.get("/api/student/all");
        console.log(resp.data);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
};



export let addClass = async (newClass) => {
    try {
        const resp = await axios({
            method: 'post',
            url: '/api/class/add',
            data: {
                name: newClass.name,
                teacher_id: newClass.teacher_id,
                student_ids: newClass.student_ids
            }
        });
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
};

export let getSubmissionsByStudentId = async (student_id) => {
    let createSubmissionData = (submission_id, student_id, assignment_id, answers, submitted, quiz_name, score) => {
        return {submission_id, student_id, assignment_id, answers, submitted, quiz_name, score}
    };
    let result = [
        createSubmissionData(43, 1, 332, [], false, "Quiz 1", -1),
        createSubmissionData(23,1, 432, [], false, "Quiz 2", -1),
        createSubmissionData(54, 1, 213, [], false, "Quiz 3", -1)
    ];
    return result;
}


export let getProblemsByAssignmentId = async (assignment_id) => {
    let createProblemData = (problem_id, description, choices) => {
        return {problem_id, description, choices}
    };
    let result = [
        createProblemData(1, "Lorem ipsum 12j jsdh jhf sj asdlf aksjh ff", {"A":"SDF DFS SA D ASDF",  "B":"SDF R K WEK JWE", "C": "I RSIUBD SJD AUHD SKDFJ", "D": "I IU  OS H U DAS" }),
        createProblemData(2, "KDSs  ksnd fkdfs ipsum 12j jsdh jhf sj asdlf aksjh ff", {"A":"L;LPE  OFJSID ID",  "B":"URIUT IUW IUE", "C": "POPODPOFS S D", "D": "OWIEPI WPI PWIE" }),
        createProblemData(3, "Kdk Jh n DF kk fs jhf sj asdlf aksjh ff", {"A":"OIOW EOR",  "B":"NKWNJK HS DH", "C": "WN NJSHD F", "D": "VCBJWG IWDF" })
];
    return result;
}


export let submitResponse = async (submission_id, assignment_id, answers) => {
    // TODO: update submission with assignment_id
    try {
        const resp = await axios({
            method: 'post',
            url: '/api/submission/submit',
            data: {
                submission_id: submission_id,
                assignment_id: assignment_id,
                answers: answers
            }
        });
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }

};

// exports.user_signin = async (username, password) => {
//     return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
//         {username: username, password: password}));
// };

// exports.find_teacher_by_id = async (id) => {
//     const _id = ObjectId(id);
//     return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
//         {_id: _id}));
// };
//
// // exports.find_user_by_username = async (username) => {
// //     return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
// //         {username: username}));
// // };
//
// exports.find_teacher_by_email = async (email) => {
//     return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
//         {email: email}));
// };