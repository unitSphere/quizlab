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
                teacher_email: newClass.teacher_email,
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

export let getQuizzesByTeacherEmail = async (teacher_email) => {
    try {
        const resp = await axios({
            method: 'get',
            url: '/api/teacher/quizzes',
            params: {
                email: teacher_email,
            }
        });
        console.log(resp.data);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
}

export let addQuiz = async (newQuiz) => {
    try {
        const resp = await axios({
            method: 'post',
            url: '/api/teacher/addquiz',
            data: {
                name: newQuiz.name,
                teacher_email: newQuiz.teacher_email,
                class_ids: newQuiz.class_ids
            }
        });
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
};

export let getClassesByTeacherEmail = async (teacher_email) => {
    try {
        const resp = await axios({
            method: 'get',
            url: '/api/teacher/classes',
            params: {
                email: teacher_email,
            }
        });
        console.log(resp.data);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
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
