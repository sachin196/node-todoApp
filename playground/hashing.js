const {SHA256}=require('crypto-js');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs');
var password = '123abcd';

bcrypt.genSalt(10, (err,  salt) => {
bcrypt.hash(password, salt, (err, hash) => {
console.log(hash);
});
});





// var data ={
//     id:10
// };

// var token = jwt.sign(data,'123abc');
// console.log(token);

// var decoded =jwt.verify(token, '123abc');
// console.log('decoded ',decoded);

// var message = 'i am user number 3';
// var hash =SHA256(message).toString();

// console.log(('Message'), message);
// console.log(('Hash'), hash);
