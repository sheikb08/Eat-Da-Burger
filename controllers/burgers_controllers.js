// Create the router for the app, and export the router at the end of your file.

const express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger");

// function to convert boolean value to string representation
// to store value as a boolean in db, because database parses string representation of boolean to 0 or 1 to store in db. 
const convertToString = str => str == "true";

// all routes 

// GET Request
router.get("/", function(req, res){

    burger.selectAll(function(dbData){

        // Create handlebars object by providing db data
        let handlbarsObject = {
            burgers : dbData
        };

        // console.log("Handlebars Object : "+JSON.stringify(handlbarsObject));

        // render 'index' page by providing handlebars object as data from db
        res.render("index", handlbarsObject);

    });
});

// POST Request
router.post("/api/burgers", function(req,res){

    // console.log("name : "+req.body.name+" Devoured : "+req.body.devoured);

    // Convert boolean to string 
    let devoured = convertToString(req.body.devoured);
    
    // Insert burger into db
    burger.add(
        ["burger_name","devoured"],
        [req.body.name, devoured],
        function(result){
            res.json({ id : result.id });
        });
});

// PUT Request
router.put("/api/burgers/:id", function(req, res){

    let condition = `id = ${req.params.id}`;

    // Convert boolean to string
    let devoured = convertToString(req.body.devoured);

    // Update burger as devoured in db
    burger.update({ devoured } ,condition, function(result){
        
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    });

});

// Export routes for server.js to use.
module.exports = router;
