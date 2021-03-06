var uuid = require('uuid');
var session = {
    id:[],
    account:[]
};
var settings = {

};
var handlers =[
    "index",
    "wipe",
    "info/status",
    "info/status_page",
    "app_interface/new_person",
    "app_interface/room_list",
    "app_interface/latest_location",
    "tagGenerator/index",
    "user_management/login_exec",
    "user_management/login_box",
    "user_management/logout_exec",
    "user_management/register_box",
    "user_management/register_exec",
    "new_iot_pages/new_beacon_page",
    "new_iot_pages/new_rfid_page",
    "new_iot_pages/new_location",
    "location/edit_location",
    "location/save_location",
    "location/delete_location",
    "location/save_location_coords"
];
var listeners=[];
var init = function(){
    for(var x=0;x<handlers.length;x++) {
        var reg = require("../lib/modules/" + handlers[x] + ".js");
        var obj = new reg(session, settings);
        if(obj.events){
            for (var i = 0; i < obj.events.length; i++) {
                listeners.push({event: obj.events[i], class: obj.classes[i]});
            }
        }else{
            listeners.push(obj);
        }
    }
    this.exec = function (socket, mongodb){
        for(var i=0;i<listeners.length;i++) {
            socket.on(listeners[i].event, (new listeners[i].class(socket, mongodb)).handle);
        }
    }
    this.generateSession = function (socket){
        var sockID = uuid.v4();
        session.id[socket.id] = sockID;
        socket.emit('session_id', {uuid: session.id[socket.id]});
    }
    this.addSetting = function(key, value){
        settings[key]=value;
    }
    this.deleteSession = function (socket){
        delete session.id[socket.id];
        delete session.account[socket.id];
    }
}
module.exports=init;