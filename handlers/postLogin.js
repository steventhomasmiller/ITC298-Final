//Got some help from Christine on this page

var crypto = require("crypto");
var db = require("../db");
 
module.exports = function (req, reply) {
    var name = req.payload.username;
    var md5 = crypto.createHash('md5');
    db.connection.get('SELECT * FROM users WHERE username = $username', {
        $username: name
    }, function(err, expected) {
        console.log('error, ', err);
        if(expected && req.payload.password === expected.password) {
            var id = req.payload.username + Date.now();
            md5.update(id);
            id = md5.digest('hex');
            reply.state('user', name); //setting cookies
            reply.state('session', id);
            db.connection.run("UPDATE users SET session = $session WHERE username = $user", {
                $user: name,
                $session: id
            });
            reply.redirect('/');
            // reply.redirect('/blogpost/edit');
        } else {
            reply.redirect('login');
        }
    });
};