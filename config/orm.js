var connection = require("../config/connection");

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. 
// These are the methods you will need to use in order to retrieve and store data in your database.

// selectAll(), insertOne() ,updateOne()
// Export the ORM object in module.exports.


// Helper function for SQL syntax.
// If we want to pass 3 values into the mySQL query. In order to write the query, we need 3 question marks.
// This helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}


// Object for all SQL statement functions.
var orm = {

    // Function to execute 'SELECT' query
    selectAll : function(tableName, cb){
        
        let queryString = `SELECT * FROM ${tableName};`;
        
        connection.query(queryString, function(err,result){
            if(err) throw err;
            cb(result);
        });
    },

    // Function to execute 'Insert' Query : cols and vals are array
    insertOne : function(table, cols, vals, cb){

        let queryString = `INSERT INTO ${table} 
        (${cols.toString()})
        VALUES (${printQuestionMarks(vals.length)});   
        `;

        // console.log(`insertOne Query : ${queryString}`);

        connection.query(queryString, vals, function(err, result){

            if(err) throw err;

            cb(result);
        });

    },

    // Function to execute 'update' query
    updateOne : function(table, vals, condition, cb){

        let queryString = `
        UPDATE ${table}
        SET ?
        WHERE
        ${condition};
        `;

        // console.log("value : "+JSON.stringify(vals));
        // console.log(`UpdateOne Query : ${queryString}`);

        connection.query(queryString, [vals], function(err, result){

            if(err) throw err;

            cb(result);
        });
    }

};

// Export the orm object for the model (burger.js).
module.exports = orm;
