 
// 2. when a button is clicked it will call giphy api and populate respective gifs using a dynamicly created table.
// 3. when a gif is pressed it will play until it is pressed again. 
// 4. there will be an input box function that can add buttons to the array. 

var jsonCall;

var giphyArray = ["birds", "snails", "monkeys", "rabbits", "whales"];

var imageArray = [];


$(document).ready(function(){


// creates the buttons dude
function makeButtons(){

        $("#buttonAnchor").empty();

    for(var i = 0; i < giphyArray.length; i++){
        
        var a = $("<button>");
            a.attr("data-name", giphyArray[i]);
            a.text(giphyArray[i]);
            a.addClass("animal");

        $("#buttonAnchor").append(a);
     
    console.log(giphyArray[i]);

    }
}
     
makeButtons();

// takes data from the input form and adds it to the array
$('#addGiphy').on('click', function(){
    
    var giphy = $('#giphy-input').val().trim();
        giphyArray.push(giphy);
        makeButtons();
       console.log("made a button");
       console.log(giphyArray);

    return false;
    
    })

// makes the api call to the giphy api and loads the gifs needs to be document.body bc the buttons are dynamically loaded
 // $('.animal').on('click', function()

 $(document.body).on('click', '.animal', function() {

        var p = $(this).attr('data-name');
        console.log(this);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var results = response.data;

                console.log(response);

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $('<div class="item">')

                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + rating);

                    var giphyImage = $('<img>');
                     
                      giphyImage.attr('src', results[i].images.fixed_height_still.url);
                     
                      giphyImage.addClass("image");
                    // adds images to array 
                      imageArray.push(giphyImage);
       
                 // appends to table 

             var firstRowTds = $('table').children().eq(0).children('tr').eq(0).children('td');

                 firstRowTds.eq(0).append(imageArray);

                 console.log(results);
                
                 }

               // isolates and defines variables based on matching src url data
               $('.image').on('click', function(){


                for (var i = 0; i < results.length; i++) {
                      
                      if(this.src == results[i].images.fixed_height_still.url || this.src == results[i].images.fixed_height.url) { 

                        console.log('working');
                        var temp =  results[i];
                        

                            var active = results[i].images.fixed_height.url;
                            var inactive = results[i].images.fixed_height_still.url; 

                            console.log(active);
                            console.log(inactive);
                                    
                }
             }
             // compares the current state of the gif and switches the state between active and inactive
                     if (this.src == inactive){
                        this.src = active;
                        console.log(this);
                        
                     } else if (this.src == active){

                        this.src = inactive;
                        console.log(this);
                    }
      

                            console.log(active);
                            console.log(inactive);                   

                });

            });

        });
   });
