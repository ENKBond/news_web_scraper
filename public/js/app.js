//go to scrape
$(document).on("click", "#scrapeNews", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  window.location.replace("/scrape");
});

//choose article, go to notes page
$(document).on("click", "#makeNotes", function () {
  var thisID = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisID
  })
  window.location.replace("/articles/" + thisID);
});


// save new note
$(document).on("click", "#saveNote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#noteTitle").val(),
      // Value taken from note textarea
      body: $("#noteBody").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      window.location.replace("/articles/" + data._id);
    });
    $("#noteTitle").val("");
    $("#noteBody").val("");
});

//delete a note
$(document).on("click", "#deleteNote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId
  })
  .then(function(data) {
    // Log the response
    console.log(data);
    location.reload();
  }); 
});

//cancel note, do not save
$(document).on("click", "#cancelNote", function() {
  $("#noteTitle").val("");
  $("#noteBody").val("");
});