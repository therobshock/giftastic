var topics = ["black hole", "supernova", "galaxy", "comet", "moon",  
    "saturn", "nebula", "constellations", "sun"];

    $("#add-button").on("click", function(event) {
        event.preventDefault();
        var inputTopic = $("#new-button-input").val().trim();
        if (inputTopic === "") {
            alert("You added nothing");
        } else {
            topics.push(inputTopic);
            addButtons();
        }
        $("#new-button-input").val("");
    })
    
addButtons();

function addButtons () {
    var buttons = $("#buttons");
    buttons.empty();

    for (var i = 0; i < topics.length; i++) {
        var searchButton = $("<button>");
        searchButton.addClass("search-button");
        searchButton.attr("data-search", topics[i]);
        searchButton.text(topics[i]);

        buttons.prepend(searchButton);
    }
    $(".search-button").on("click", gifSearch);
}

function gifResult (results) {
    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").html("Rating: " + rating + "<br>click image to play");
        var gifImage = $("<img>");

        gifDiv.addClass("mr-3 mt-2");

        gifImage.attr("src", results[i].images.fixed_width_still.url);
        gifImage.attr("data-still", results[i].images.fixed_width_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_width.url);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gif");
        
        $("#display").prepend(gifDiv);
        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        gifImage.on("click", gifPlay);
  }

}

function gifSearch () {
    var searchTerm = $(this).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=YBrFweGHN3gNtDSqmT7Jmwm7YQa6OxUS&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        gifResult(response.data);
   });
}

function gifPlay () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
             }
}
