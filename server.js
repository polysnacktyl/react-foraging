require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.static('public'));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth/user'))

app.use(cors({
  origin: ['http://localhost:3000', 
  'https://react-forager.herokuapp.com/'],
  credentials: true,
})
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
});
