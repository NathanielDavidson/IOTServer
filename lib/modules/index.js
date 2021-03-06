/**
 * Created by Nathaniel on 10/29/2016.
 */
var ejs = require('ejs');
var fs = require('fs');
var Location = require('../models/Location.js');
var loc = new Location();
var init = function(session, settings){
    this.events = [
        "index"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                if(session.account[socket.id]) {
                    loc.getAll(db, function(results){
                        socket.emit('page_load', {
                            wrapper: ".content",
                            cover: "html",
                            html: ejs.render(fs.readFileSync('views/main.ejs', 'utf8'), {settings: settings, locations: results })
                        });
                    });
                }else{
                    socket.emit('redirect',{to: 'status_page'});
                }
            }
        }
    ];
}
module.exports=init;