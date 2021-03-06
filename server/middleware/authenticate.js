var {User} =require('./../models/user');

var authenticate=(req, res, next) => {
    var token = req.header('x-auth');
    
      User.findByToken(token).then((user) => {
       if(!user) {
           console.log('token not found');
        return Promise.reject();
       }
    //    console.log('i m here');
       req.user =user;
       req.token = token;
       next();
      }).catch((e) => {
          res.status(401).send();
      });
};

module.exports ={authenticate};