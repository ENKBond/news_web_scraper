$(document).on("click", "#scrapeNews", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  window.location.replace("/scrape");
});










// // Grab the articles as a json
// $.getJSON("/scrape", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>");
//   }
// });


// Whenever someone clicks a makeNotes button
$("#makeNotes").on("click", function() {
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  //display the modal

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='note-title'>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='message-text'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#note-title").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#message-text").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#note-title").val(),
      // Value taken from note textarea
      body: $("#message-text").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });

});
