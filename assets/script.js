const burgerMenu = document.querySelector(".burger-icon svg");
const crossIcon = document.querySelector(".cross-icon svg");
const sideBar = document.querySelector(".sidebar");

apiKey = "hA8Tg18Yh6X3uiQW5tD5GjoRkXjrJlsl";



// to solve CORS issues
// const TicketUrl = "https://cors-anywhere-jung-48d4feb9d097.herokuapp.com/" + queryUrl;
// queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=uk&apikey=${apiKey}`;

// var keyword = "taylor swift"; // Example keyword
// var city = "London";
// var startEndDateTime = "22/06/2024";

// start date = startDateTime=2024-03-01T10:00:00Z
// country = countryCode=UK
// keyword = keyword=football
// keyword = keyword=football
// keyword = keyword=football

var date; //startDateTime
var city; //city
var searchTerm; //keyword
var apiKey = "hA8Tg18Yh6X3uiQW5tD5GjoRkXjrJlsl";



var searchInput = "";
var resultsTable = 0;

$(".clear").click(function () {
  resultsTable = 0;
  $("#search-input").val("");
  $("#results-table").empty();
})

$("#search-form").on("submit", function (event) {
  event.preventDefault();
  $("#results-table").empty();
  resultsTable = 0;
  searchInput = $("#search-input").val();
  ticketFetch(searchInput);

});



function ticketFetch(keyword, city,) {
  var queryParams = {
    apikey: apiKey,
    countryCode: "UK"
  }
  if (keyword) {
    queryParams.keyword = keyword
  }
  console.log(queryParams)
  var queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?${new URLSearchParams(queryParams)}` //keyword=${keyword}&city=&startDateTime=&countryCode=UK&apikey=${apiKey}`;
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   create table element to display search results

      var resultsTable = $("<table/>");
      var headerRow = $("<tr/>");
      headerRow.append($("<th>").text("Event"));
      headerRow.append($("<th>").text("Venue"));
      headerRow.append($("<th>").text("Date"));
      headerRow.append($("<th>").text("Price"));
      headerRow.append($("<th>").text("Save"));

      // create table rows, text value will be changed later to show results data
      for (var i = 0; i < data._embedded.events.length; i++) {
        var tableRow = $("<tr/>");
        tableRow.append($("<td>").text(eventName));
        tableRow.append($("<td>").text(eventVenue));
        tableRow.append($("<td>").text(eventDate));
        // format price to US dollars
        var formattedPrice = "$" + eventPrice.toFixed(2);
        tableRow.append($("<td>").text(formattedPrice));
        tableRow.append($("<td>").text(data._embedded.events[i].name));
        tableRow.append(
          $("<td>").text(data._embedded.events[i]._embedded.venues[0].name)
        );
        tableRow.append(
          $("<td>").text(data._embedded.events[i].dates.start.localDate)
        );
        // check if price is available or not available if not
        try {
          tableRow.append(
            $("<td>").text(`$${data._embedded.events[i].priceRanges[0].min}`)
          );
        } catch (err) {
          tableRow.append($("<td>").text("Not Available"));
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
      document.querySelector(".accordion-button").innerHTML = data.setup;
      document.querySelector(".accordion-body").innerHTML = data.punchline;
    });
}
      
jokeFetch();

burgerMenu.addEventListener("click", function () {
  sideBar.style.display = "flex";
});

crossIcon.addEventListener("click", function () {
  sideBar.style.display = "none";

  caroselFetch
});

//javascript code for carousel buttons

const carouselRightButton = document.querySelector(".carousel-right-button")
const carouselLeftButton = document.querySelector(".carousel-left-button")
const carouselImages = document.querySelectorAll(".carousel-card")
const slider = document.querySelector(".slider")
const carouselActiveDot = document.querySelectorAll(".carousel-dot")


let carouselCurrentIndex = 0

function carouselImageChange(){
  carouselImages.forEach(function(currentValue, index) {
    if( index === carouselCurrentIndex){
      currentValue.classList.remove("hide")
    } else {
      currentValue.classList.add("hide")
    }
  });
}

function handleCarouselDot(){
  carouselActiveDot.forEach(function(currentValue, index){
    if (index === carouselCurrentIndex){
      currentValue.classList.add("carousel-active-dot")
    } else{
      currentValue.classList.remove("carousel-active-dot")
    }
  })
}



carouselRightButton.addEventListener("click", function () {
  if(carouselCurrentIndex === carouselImages.length -1 ){
    carouselCurrentIndex = 0
  } else {
    carouselCurrentIndex = (carouselCurrentIndex + 1);
  }
  carouselImageChange();
  handleCarouselDot()
});

carouselLeftButton.addEventListener("click", function () {
  if(carouselCurrentIndex === 0){
    carouselCurrentIndex = 4
  } else {
    carouselCurrentIndex = (carouselCurrentIndex - 1);
  }
  carouselImageChange();
  handleCarouselDot()
});

