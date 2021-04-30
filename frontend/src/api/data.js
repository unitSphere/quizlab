import axios from "axios";
let host = "http://localhost:5000/api";

export let getClasses = async () => {
    try {
        const resp = await axios.get("/api/class/all");
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
    try {
        const resp = await axios.get("/api/submission?student_id=" + student_id);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
}

export let getStudentIdByEmail = async (student_email) => {
    try {
        const resp = await axios.get("/api/student/id?student_email=" + student_email);
        if(resp.data._id){
            return resp.data._id;
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
}

export let getProblemsByAssignmentId = async (assignment_id) => {
//     let createProblemData = (problem_id, description, choices) => {
// //         return {problem_id, description, choices}
// //     };
// //     let result = [
// //         createProblemData(1, "1. A researcher is curious about the IQ of students at the Utrecht University. The entire group\n" +
// //             "students is an example of a:", {"A":"Parameter",  "B":"Statistic", "C": "Population", "D": "Sample" }),
// //         createProblemData(2, "Five-point Likert scales (strongly disagree, disagree, neutral, agree, strongly agree) are\n" +
// //             "frequently used to measure motivations and attitudes. A Likert scale is a: ", {"A":"Discrete Variable",  "B":"Ordinal Variable", "C": "Categorical Variable", "D": "All of the above options (A, B and C) " }),
// //         createProblemData(3, "Which of the following sets of scores has the greatest variability (range)?", {"A":"2, 5, 8, 11",  "B":"13, 13, 13, 13", "C": "20, 25, 26 ,27", "D": "42, 43, 44, 45" })
// // ];
    try {
        const resp = await axios.get("/api/assignment/problems?assignment_id=" + assignment_id);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
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
