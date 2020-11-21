var orm = require("../config/orm");
// const connection = require("../config/connection");

var burger = {

    selectAll : function(cb){

        // Calls ORM function 'selectAll'
        orm.selectAll("burgers", function(result){
            cb(result);
        });
    },

    add : function(cols, vals, cb){

        // Calls ORm function 'insertOne'
        orm.insertOne("burgers",cols, vals, cb, function(result){
            cb(result);
        });

    },

    update : function(vals, condition, cb){

        // Calls ORm function 'updateOne'
        orm.updateOne("burgers", vals, condition, cb, function(result){
            cb(result);
        });
    }

};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;