// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
    return   console.log('Unable to connect to mongodb server');
    }
console.log('Connected to Mongodb server');

// db.collection('Todos').find({
//     _id : new ObjectID('5a2e67c2aa9467f32ba80b73')
// }).count().then((count) =>{
//     console.log(`Todos count ${count}`);
//   //  console.log(JSON.stringify(docs, undefined, 2))
// } ,(err) => {
//     console.log('Unable to fetch todos', err);
// });
db.collection('User').find({name:'sachin'}).toArray().then((docs) =>{
    console.log('User');
   console.log(JSON.stringify(docs, undefined, 2))
} ,(err) => {
    console.log('Unable to fetch todos', err);
});
});

