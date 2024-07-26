const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json()); // Note the invocation with parentheses

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err)); // Better to send status 500 for errors
});

app.put('/update/:id',(req, res) => {
  const {id} = req.params;
  TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err)); 
})
app.delete('/delete/:id',(req, res) => {
  const {id} = req.params;
  TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err)); 
})



app.post('/add', (req, res) => {
  const task = req.body;
  TodoModel.create(task)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});
app.post('/add', (req, res) => {
  const task = req.body.task;


  TodoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});
app.get('/delete', async (req, res)  => {
 
   await TodoModel.deleteMany({});

       console.log("dellll")
res.send("done");


});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


