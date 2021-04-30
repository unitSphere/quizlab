import axios from "axios";

let host = "http://localhost:5000/api";

/* All helper functions for querying the database */

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

export let getClassById = async (class_id) => {
    try {
        const resp = await axios.get("/api/class/id?id=" + class_id);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
}

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

export let teacherMainQuery = async (teacher_email) => {
    try {
        const resp = await axios.get("/api/assignment/teacher?email=" + teacher_email);
        resp.forEach()
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
}

export let getAssignmentsByTeacherEmail = async (teacher_email) => {
    try {
        const resp = await axios.get("/api/assignment/teacher?email=" + teacher_email);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
}

export let getSubmissionByAssignmentId = async (assignment_id) => {
    try {
        const resp = await axios.get("/api/submission/assignment?id=" + assignment_id);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
}

export let getSubmissionById = async (submission_id) => {
    try {
        const resp = await axios.get("/api/submission/byid?id=" + submission_id);
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
        if (resp.data._id) {
            return resp.data._id;
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
}

export let getProblemsByAssignmentId = async (assignment_id) => {
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

export let genQuiz = async (newQuiz) => {
    try {
        const resp = await axios({
            method: 'post',
            url: '/api/quiz/generate',
            data: {
                topic: newQuiz.topic,
                numQuestions: newQuiz.num_questions,
                teacher_email: newQuiz.teacher_email,
                quiz_name: newQuiz.quiz_name
            }
        });
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
};

export let genAssignment = async (newAssignment) => {
    try {
        const resp = await axios({
            method: 'post',
            url: '/api/assignment/add',
            data: {
                teacher_email: newAssignment.teacher_email,
                quiz_name: newAssignment.quiz_name,
                class_id: newAssignment.class_id
            }
        });
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
    }
};

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
