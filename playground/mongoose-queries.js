const {ObjectID} =require('mongodb');
const {mongoose} =require('./../server/db/mongoose');
const {Todo} =require('./../server/models/todo');
const {User} =require('./../server/models/user')
//var id = '5a30adec2038832d74cb979';


// if(!ObjectID.isValid(id)){
//     console.log('ID is not valid');
// }


// Todo.find({
//  _id: id
// }).then((todos) => {
//   console.log(('Todo'), todos);
// });

// Todo.findOne({
//     _id: id
//    }).then((todo) => {
//      console.log(('Todo'), todo);
//    });

//    Todo.findById(id).then((todo) => {
//        if(!todo) {
//            return console.log('Id not found')
//        }
//     console.log('Todo bi Id', todo);
//   }).catch((e) => {
//       console.log(e)
//   });

User.findById('5a2f7ef8e0bb50299c8b8c32').then((user) =>{
    if(!user){
return console.log('user id not found')
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e)=>{
    console.log(e)
});