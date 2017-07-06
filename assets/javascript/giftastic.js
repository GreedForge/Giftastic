var itemsToSearch = ["cat", "dog", "simpsons"];


function renderButtons() {

    
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonView").empty();


    for (var i = 0; i < itemsToSearch.length; i++){

   
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        $(a).addClass("gif");
        $(a).addClass("btn");
        a.css("margin", "2px");


        a.css("background-color", "#4A22A5");
        a.css("color", "#129F74");

   
        a.attr("data-term", itemsToSearch[i]);
  
        a.text(itemsToSearch[i]);
        // Adding the button to the HTML
        $("#buttonView").append(a);
    }
}

$("#addGif").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var gif = $("#gif-input").val().trim();
  
    itemsToSearch.push(gif);

 
    renderButtons();
});

renderButtons();


// Adding click event listen listener to all buttons
$(document).on("click", ".gif", function() {
   
    var searchTerm = $(this).attr("data-term");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
         

           
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var resultDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating).css("color", "#129F74");

                // Creating and storing an image tag
                var resultImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                resultImage.attr("src", results[i].images.fixed_height_still.url);

                resultImage.attr("data-still", results[i].images.fixed_height_still.url);
                resultImage.attr("data-animate", results[i].images.fixed_height.url);
                resultImage.attr("data-state", "still");
                resultImage.addClass("image");
                resultImage.addClass("circle");


            
                resultDiv.append(p);
                resultDiv.append(resultImage);

                resultDiv.css("float", "left");
                resultDiv.css("margin", "10px");
                resultDiv.css("padding", "5px");
                resultDiv.css("border", "2px solid #129F74");
                resultDiv.css("background-color", "#4A22A5");


                
                $("#gifs-appear-here").prepend(resultDiv);
            }
        });
});

$(document).on("click", ".image", function() {


    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});