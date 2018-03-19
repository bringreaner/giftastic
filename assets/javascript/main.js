//create an array of strings related to video games
//save in a variable called topics
var videoGames = [  //this will be where I store the video games and 
    "Fallout", "Final Fantasy", "Assassin's Creed", "Zelda", "Prince of Persia"
];

//create a variable with the url
$("document").ready(function () {
//onclick, page graps 10 static, non-animated gifs from giphy api
//then places them on the page

function displayGameInfo() {
    var newGame = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGame + "&api_key=Huz4Eq0V8xqUNIoVaGZNu116fmH2w5hF&limit=10"; //creates an updateable variable that stores url of whatever game is chosen
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gameDiv = $("<div class='game'>");
                var rating = results[i].rating;
                var pOne = $("<p>").text("Rating: " + rating);
                gameDiv.append(pOne);
                
                
                var gifURL = results[i].images.fixed_height_still.url; //not sure about this either***
                var gameGif = $("<img>")
                gameGif.attr("src", gifURL);
                gameGif.attr("data-state", "still");
                gameGif.attr("data-animate", results[i].images.fixed_height.url);
                gameGif.attr("data-still", results[i].images.fixed_height_still.url);

                gameDiv.append(gameGif);
                $("#videoGameView").prepend(gameDiv);
                console.log(rating);
                console.log(response);
            }
        });

}

function renderButtons() {
    $("#buttons").empty(); //empties the buttons upon load otherwise they'd repeat
    //take the topics in this array
    //use them to create buttons in HTML
    //try using a loop that appends a button for each string in the array
    for (var i = 0; i < videoGames.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("gameButton");
        newButton.attr("data-name", videoGames[i]);
        newButton.text(videoGames[i]);
        $("#buttons").append(newButton);
    }
}

$("#addGame").on("click", function (event) {
    event.preventDefault();
    var newGame = $("#videoGameInput").val().trim(); //this takes info from the #videoGameInput textbox in html
    videoGames.push(newGame);
    renderButtons();
});

$(document).on("click", ".gameButton", displayGameInfo);

renderButtons();

})

//if clicked, gif is animated
//if clicked again, back to still
    //under each gif display its rating
    //this data provided by GIPHY API

//** only once images are displaying should you move on

$("#videoGameView").on("click", "img", function() {
    var state = $(this).attr("data-state");
    if (state == "still") {
        var dataAnimate = $(this).attr("data-animate")
        $(this).attr("src", dataAnimate);
        $(this).attr("data-state", "animate");
    }

    else if (state == "animate") {
        var dataStill = $(this).attr("data-still")
        $(this).attr("src", dataStill);
        $(this).attr("data-state", "still");
    }
})