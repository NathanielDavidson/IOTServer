/**
 * Created by Nathaniel on 10/23/2016.
 */
var crypto = require('crypto');
var User = function(){
    this.new = function(db, username, password, func){
        var col = db.collection("user_accounts");
        var d = new Date();
        var pass = crypto.createHash('sha256').update(password).digest('base64')
        col.insertOne({user:username, pass:pass, created: d});
        func({user:username, pass:pass, created: d});
    }
    this.getByUser = function(db, username, func){
        var col = db.collection("user_accounts");
        col.findOne({user:username}, function(err, data){
            func(data);
        });
    }
    this.delete = function(db, username, func){
        var col = db.collection("user_accounts");
        col.deleteOne({user:username},{},function(errr, r){
            func(r);
        });
    }
}
module.exports=User;