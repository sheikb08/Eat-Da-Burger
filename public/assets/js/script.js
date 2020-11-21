$(function(){
    
    // On clicking 'submit' button
    $(".add-burger").on("submit", function(event){

        event.preventDefault();

        let burgerName = $("#burgerName").val().trim();
        if (burgerName === "") {
            return;
        }
        // Create object of burger values from user
        let newBurger = {
            name : burgerName,
            devoured : false
        };

         // Send the POST request to server.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
        function() {
            console.log("Added new burger!");
           
            // Reload the page to get the updated list
            location.reload();
        });

    });

    // On clicking 'Devour' button of burger to be eaten
    $(".devour").on("click",function(event){

        // Take the data attribute 'id' which to be devoured
        let id = $(this).data("id");

        // Create object to update devoured value to true in db
        let devouredBurger = {
            devoured : true
        };

        // Send the PUT request to server.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredBurger
        }).then(
            function() {
            console.log("Burger Devoured : "+id);
            
            // Reload the page to get the updated list
            location.reload();
        });
    });
});