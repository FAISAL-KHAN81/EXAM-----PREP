const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();  

app.use(cors());
app.use(express.json());

const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/examprep';
mongoose.connect(URL)
.then(() => {
  console.log("MongoDB Connected to:", URL);
})
.catch((er) => {
  console.error("MongoDB Connection Error:", er);
});


// api started 

app.use('/api/admin', require('./routes/adminRoute'))
app.use('/api/session', require('./routes/sessionRoute'))
app.use('/api/subject', require('./routes/subjectRoute'))
app.use('/api/exams', require('./routes/examinationRoute'))
app.use('/api/question', require('./routes/questionbankRoute'))
app.use('/api/examinee', require('./routes/examineeRoute'))
app.use('/api/message', require('./routes/messageRoute'))

// api end 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});