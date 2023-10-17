// server.js
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://contactdevloperdk347:qn2qn1pvSTfvEfn7@testapi.vees45d.mongodb.net/TestApi?retryWrites=true&w=majority', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true},
  () => {
    console.log('Connected to MongoDB');
  }
);

app.use(bodyParser.json());
app.use(session({
  secret: 'oni016ig3jl7c915nfxx',
  resave: true,
  saveUninitialized: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
