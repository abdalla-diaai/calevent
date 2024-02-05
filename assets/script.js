 

// queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=uk&apikey=${apiKey}`;

// var keyword = "taylor swift"; // Example keyword
// var city = "London";
// var startEndDateTime = "22/06/2024";

// start date = startDateTime=2024-03-01T10:00:00Z
// country = countryCode=UK
// keyword = keyword=football
// keyword = keyword=football
// keyword = keyword=football

var date;
var city;
var searchTerm;
apiKey = "hA8Tg18Yh6X3uiQW5tD5GjoRkXjrJlsl";

queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=UK&apikey=${apiKey}`;

// to solve CORS issues
const TicketUrl = "https://cors-anywhere-jung-48d4feb9d097.herokuapp.com/" + queryUrl


var searchInput = "";
var resultsTable = 0;

$(".clear").click(function () {
  resultsTable = 0;
  $("#search-input").val("");
  $("#results-table").empty();
})

$("search-input").on("click", function () {
  $("#results-table").empty();
  resultsTable = 0;
  searchInput = $("#search-input").val();
  searchUrl = queryUrl + "q=" + searchInput;

});

var searchUrl = queryUrl + "q=" + searchInput;

function ticketFetch() {
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("query url:", data);
      //   create table element to display search results
      var resultsTable = $("<table/>");
      var headerRow = $("<tr/>");
      headerRow.append($("<th>").text("Event"));
      headerRow.append($("<th>").text("Venue"));
      headerRow.append($("<th>").text("Date"));
      headerRow.append($("<th>").text("Price"));
      headerRow.append($("<th>").text("Save"));

      // create table rows, text value will be changed later to show results data
      for (var i = 0; i < 10; i++) {
        var tableRow = $("<tr/>");
        tableRow.append($("<td>").text(data._embedded.events[i].name));
        tableRow.append($("<td>").text(data._embedded.events[i]._embedded.venues[0].name));
        tableRow.append($("<td>").text(data._embedded.events[i].dates.start.localDate));
        // check if price is available or not available if not
        try {
          tableRow.append($("<td>").text(`$${data._embedded.events[i].priceRanges[0].min}`));
        } catch (err) {
          tableRow.append($("<td>").text('Not Available'))
        }
        resultsTable.append(tableRow);
      }

      resultsTable.prepend(headerRow);
      // append table to main page body
      $("#results-table").append(resultsTable);
    });
}

// call ticketFetch function

ticketFetch();


// jokes fetch

var jokesUrl = 'https://official-joke-api.appspot.com/random_joke'
var jokesUpdatedUrl = "https://cors-anywhere-jung-48d4feb9d097.herokuapp.com/" + jokesUrl
function jokeFetch() {
  fetch(jokesUpdatedUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector('.accordion-button').innerHTML = data.setup;
      document.querySelector('.accordion-body').innerHTML = data.punchline;
    });
}

jokeFetch()


const burgerMenu = document.querySelector(".burger-icon svg");

burgerMenu.addEventListener("click", function () {
  const sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "flex";
});

const crossIcon = document.querySelector(".cross-icon svg");

crossIcon.addEventListener("click", function () {
  const sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "none";
caroselFetch
});

