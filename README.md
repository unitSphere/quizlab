# Quizlab

### Run App (Frontend and Backend Saparately -> Better for development)

0. Install dependencies by `npm install` (Both in /backend and /frontend directories)
1. `node app.js` keep this running (execute in /backend)
2. `cd ./frondend`
3. `npm start` keep this running (execute in ./frontend)
4. Test the app through the port that you will be redirected to by frontend (i.g. localhost:3000)


### Run app (Same port for backend and frontend -> Better for production)

0. Install dependencies by `npm install` (Both in /backend and /frontend directories)
1. In /frontend execute `npm run build`
2. In /backend execute `node app.js`
3.  Test the app through the port that you will be redirected to by backend (i.g. localhost:5000)