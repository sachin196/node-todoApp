// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var obj =new ObjectID();
// console.log(obj);

// var user ={name: 'sachin', age: 23};
// var {name}=user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
    return   console.log('Unable to connect to mongodb server');
    }
console.log('Connected to Mongodb server');
// db.collection('Todos').insertOne({

// }, (err, result) => {
//     if(err){
//         return console.log('Unable to insert todo')
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2))
// });

// db.close();
// });

db.collection('User').insertOne({
    name:'sachin',
    age: 23 ,
    location: 'panvel'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert todo')
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
    });
    
    db.close();
    });