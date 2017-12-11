// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
    return   console.log('Unable to connect to mongodb server');
    }
console.log('Connected to Mongodb server');

// db.collection('Todos').deleteMany({text:"going to home"}).then((docs) =>{
//     console.log(docs);
// } ,(err) => {
//     console.log('Unable to fetch todos', err);
// });

// db.collection('Todos').deleteOne({text:"going to home"}).then((docs) =>{
//     console.log(docs);
// });

// db.collection('Todos').findOneAndDelete({text:"eat lunch"}).then((docs) =>{
//     console.log(docs);
// });

// db.collection('User').findOneAndDelete({name:'sachin'}).then((docs) =>{
//     console.log(docs);
// });

// db.collection('User').deleteMany({name:'sachin'}).then((docs) =>{
//     console.log(docs);
// });
db.collection('User').findOneAndDelete({
    _id: new ObjectID("5a2e5fe7157f31176088aa69")
}).then((docs) =>{
         console.log(docs);
     });


db.close();
});

