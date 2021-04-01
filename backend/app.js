let express = require('express');
let app = express();
let users = require('./routes/users.js');
let students = require('./routes/students.js');
let teachers = require('./routes/teachers.js');
let classes = require('./routes/classes.js');
let quizzes = require('./routes/quizzes.js');
let problems = require('./routes/problems.js');
let submissions = require('./routes/submissions.js');


const PORT = process.env.PORT || 5000;
const session = require('express-session');


app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static('../frontend/build'));

app.use('/api/user', users);
app.use('/api/student', students);
app.use('/api/teacher', teachers);
app.use('/api/class', classes);
// app.use('/api/quiz', quizzes);
app.use('/api/problem', problems);
app.use('/api/submission', submissions);



// //To catch the invalid paths that need redirection
// app.use('/signup', (req, res) => {
//     res.redirect('/');
// });
// app.use('/login', (req, res) => {
//     res.redirect('/');
// });
// app.use('/dashboard', (req, res) => {
//     res.redirect('/');
// });
// app.use('/profile', (req, res) => {
//     res.redirect('/');
// });
// app.use('/expenses', (req, res) => {
//     res.redirect('/');
// });
// app.use('/investments', (req, res) => {
//     res.redirect('/');
// });
// app.use('/about', (req, res) => {
//     res.redirect('/');
// });

// to catch any other path and return 404
app.use(function (req, res) {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(404).send("Sorry can't find that in Quizlab api! The URL is: " + fullUrl);
});


app.listen(PORT, () => console.log('Start listening on port: ' + PORT));
