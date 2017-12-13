const {ObjectID} =require('mongodb');
const {mongoose} =require('./../server/db/mongoose');
const {Todo} =require('./../server/models/todo');
const {User} =require('./../server/models/user')

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove('5a311764e3a2751491f4d979').then((todo) => {
//     console.log(todo);
//  });

Todo.findByIdAndRemove('5a311764e3a2751491f4d979').then((todo) => {
   console.log(todo);
});