/**
 * Created by Nathaniel on 10/29/2016.
 */
var crypto = require('crypto');
var Location = function(){
    this.new = function(db, label, name, reference, lat, lng, type, roomName, func){
        var col = db.collection("locations");
        var d = new Date();
        col.insertOne({label:label, name:name, reference:reference, roomName:roomName, lat:lat, lng: lng, type:type});
        new Location().getByName(db, name, func);
    };
    this.getByReference = function(db, referenceString, func){
        var col = db.collection("locations");
        col.findOne({reference:referenceString}, function(err, data){
            func(data);
        });
    };
    this.saveByName = function(db, name, data, func){
        var col = db.collection("locations");
        col.update({name:name},data, function(){
            func();
        });
    };
    this.getByType = function(db, type, func){
        var col = db.collection("locations");
        col.findOne({type:type}, function(err, data){
            func(data);
        });
    };
    this.getAll = function(db, func){
        var col = db.collection("locations");
        col.find().toArray(function(err, data){
            func(data);
        });
    };
    this.getById = function(db, id, func){
        var col = db.collection("locations");
        col.findOne({_id:id}, function(err, data){
            func(data);
        });
    };
    this.getByName = function(db, name, func){
        var col = db.collection("locations");
        col.findOne({name:name}, function(err, data){
            func(data);
        });
    };
    this.delete = function(db, name, func){
        var col = db.collection("locations");
        col.deleteOne({name:name},{},function(errr, r){
            func(r);
        });
    };
    this.wipe = function(db){
        var col = db.collection("locations");
        col.drop();
    };
}
module.exports=Location;