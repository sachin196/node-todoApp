require('./config/config');

const _ =require('lodash');
const express = require('express');
const bodyParser =require('body-parser');

const {ObjectID} =require('mongodb');
var {mongoose} =require('./db/mongoose');
var {Todo} =require('./models/todo');
var {User} =require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;
//  mongoose.set('debug', true)
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  //  console.log(req.body);
  
  var todo = new Todo({
  text: req.body.text,
  _creator:req.user._id
  });

  todo.save().then((doc) =>{
   res.send(doc);
  }, (e)=>{
   res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator:req.user._id
    }).then((todos) =>{
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
        });
});

app.get('/todos/:id', authenticate, (req,res) => {
  // res.send(req.params);
  var id = req.params.id
  if(!ObjectID.isValid(id)){
  return  res.status(404).send();
}
Todo.findOne({
_id: id,
_creator:req.user.id
}).then((todo) => {
           if(!todo) {
            return  res.status(404).send();
           }
        res.send({todo});
      }).catch((e) => {
          return  res.status(404).send();
      });
    });

    app.delete('/todos/:id', authenticate,(req, res) => {
        var id = req.params.id

        if(!ObjectID.isValid(id)){
        return  res.status(404).send();
      }
      Todo.findOneAndRemove({
        _id: id,
        _creator:req.user._id
      }).then((todo) => {
        if(!todo) {
            return  res.status(404).send();
           }
        res.status(200).send({todo});
      }).catch((e) => {
          return  res.status(404).send();
     });
    });

app.patch('/todos/:id', authenticate, (req, res) =>{
   var id= req.params.id
   var body =_.pick(req.body, ['text', 'completed']);

   if(!ObjectID.isValid(id)){
    return  res.status(404).send();
   }

   if(_.isBoolean(body.completed) && body.completed) {
       body.completedAt = new Date().getTime();
   } else {
       body.completed = false,
       body.completedAt = null;
   }

   Todo.findOneAndUpdate({
    _id: id,
    _creator:req.user._id
   }, {$set: body}, {new: true}).then((todo) => {
       if(!todo){
           return res.status(404).send();
       }
       res.send({todo});
   }).catch((e) =>{
       res.status(400).send();
   })

});

app.post('/users', (req, res) => {
    var body =_.pick(req.body, ['email', 'password']);
    //  console.log(body);
    var user = new User(body);
    user.save().then(() =>{
       return user.generateAuthToken();
        // console.log("i ");
        // res.send(user);
    }).then((token) =>{
    //  console.log("i reachrd");
        res.header('x-auth', token).send(user);
    }).catch((e)=>{
        //  console.log("error");
        //  console.log(e);
     res.status(400).send(e);
    })
  });

//   var authenticate=(req, res, next) => {
//     var token = req.header('x-auth');
    
//       User.findByToken(token).then((user) => {
//        if(!user) {
//         return Promise.reject();
//        }
//        res.user =user;
//        req.token = token;
//        next();
//       }).catch((e) => {
//           res.status(401).send();
//       });
// };authenticate

app.get('/users/me',authenticate,(req, res) => {
    res.send(req.user);
//   var token = req.header('x-auth');

//   User.findByToken(token).then((user) => {
//    if(!user) {
//     return Promise.reject();
//    }
//    res.send(user);
//   }).catch((e) => {
//       res.status(401).send();
//   });
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
//    console.log('i reached here');
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
         res.header('x-auth', token).send(user);
        });
    //  res.send(user);
    }).catch((e) => {
        // console.log('bad request');
     res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(()=>{
     res.status(200).send();
    },() => {
        res.status(400).send();
    });
});

  

app.listen(port,() => {
    console.log(`started on port ${port}`)
});

module.exports = {app};
