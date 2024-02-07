const burgerMenu = document.querySelector(".burger-icon svg");
const crossIcon = document.querySelector(".cross-icon svg");
const sideBar = document.querySelector(".sidebar");
const clearBtn = document.querySelector("#clear-button");

var apiKey = "hA8Tg18Yh6X3uiQW5tD5GjoRkXjrJlsl";

$("#search-button").on("click", function (event) {
  event.preventDefault();
  $("#table-body").empty();
  resultsTable = 0;
  var searchGenre = $("#search-keyword").val();
  var searchDate = $("#search-date").val();
  var searchCity = $("#search-city").val();
  console.log(searchGenre);
  if (searchGenre === "") {
    var queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${searchCity}&startDateTime=${searchDate}T10:00:00Z&countryCode=us&apikey=${apiKey}`;
  } else {
    var queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${searchGenre}&city=${searchCity}&startDateTime=${searchDate}T10:00:00Z&countryCode=GB&apikey=${apiKey}`;
  }
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (!data) {
        console.log("word");
      } else {
        for (var i = 0; i < data._embedded.events.length; i++) {
          var tableRow = $("<tr/>");
          tableRow.append($("<td>").text(data._embedded.events[i].name));
          tableRow.append(
            $("<td>").text(data._embedded.events[i].dates.start.localDate)
          );
          tableRow.append(
            $("<td>").text(data._embedded.events[i]._embedded.venues[0].name)
          );

          // check if price is available or not available if not
          try {
            // add format to change form $ to £
            tableRow.append(
              $("<td>").text(`$${data._embedded.events[i].priceRanges[0].min}`)
            );
          } catch (err) {
            tableRow.append($("<td>").text("Not Available"));
          }
          $("#table-body").append(tableRow);
        }
      }
      // create table rows, text value will be changed later to show results data
    });

  // ticketFetch();

  $("#search-city").val("");
  $("#search-date").val("");
  $("#search-keyword").val("");
});

function ticketFetch() {
  var queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchGenre}&city=${searchCity}&startDateTime=${searchDate}&countryCode=GB&apikey=${apiKey}`;
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // create table rows, text value will be changed later to show results data
      for (var i = 0; i < data._embedded.events.length; i++) {
        var tableRow = $("<tr/>");
        tableRow.append($("<td>").text(data._embedded.events[i].name));
        tableRow.append(
          $("<td>").text(data._embedded.events[i].dates.start.localDate)
        );
        tableRow.append(
          $("<td>").text(data._embedded.events[i]._embedded.venues[0].name)
        );

        // check if price is available or not available if not
        try {
          tableRow.append(
            $("<td>").text(`$${data._embedded.events[i].priceRanges[0].min}`)
          );
        } catch (err) {
          tableRow.append($("<td>").text("Not Available"));
        }
        $("#table-body").append(tableRow);
      }
    });
}

// jokes fetch

// var jokesUrl = 'https://official-joke-api.appspot.com/random_joke'
// var jokesUpdatedUrl = "https://cors-anywhere-jung-48d4feb9d097.herokuapp.com/" + jokesUrl
// function jokeFetch() {
//   fetch(jokesUpdatedUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       document.querySelector(".accordion-button").innerHTML = data.setup;
//       document.querySelector(".accordion-body").innerHTML = data.punchline;
//     });
// }

// jokeFetch();

burgerMenu.addEventListener("click", function () {
  sideBar.style.display = "flex";
});

crossIcon.addEventListener("click", function () {
  sideBar.style.display = "none";

  caroselFetch;
});

clearBtn.addEventListener("click", function () {
  const form = document.querySelector("#search-form");

  form.reset();
});

//javascript code for carousel buttons

const carouselRightButton = document.querySelector(".carousel-right-button");
const carouselLeftButton = document.querySelector(".carousel-left-button");
const carouselImages = document.querySelectorAll(".carousel-card");
const slider = document.querySelector(".slider");
const carouselActiveDot = document.querySelectorAll(".carousel-dot");

let carouselCurrentIndex = 0;

function carouselImageChange() {
  carouselImages.forEach(function (currentValue, index) {
    if (index === carouselCurrentIndex) {
      currentValue.classList.remove("hide");
    } else {
      currentValue.classList.add("hide");
    }
  });
}

function handleCarouselDot() {
  carouselActiveDot.forEach(function (currentValue, index) {
    if (index === carouselCurrentIndex) {
      currentValue.classList.add("carousel-active-dot");
    } else {
      currentValue.classList.remove("carousel-active-dot");
    }
  });
}

carouselRightButton.addEventListener("click", function () {
  if (carouselCurrentIndex === carouselImages.length - 1) {
    carouselCurrentIndex = 0;
  } else {
    carouselCurrentIndex = carouselCurrentIndex + 1;
  }
  carouselImageChange();
  handleCarouselDot();
});

carouselLeftButton.addEventListener("click", function () {
  if (carouselCurrentIndex === 0) {
    carouselCurrentIndex = 3;
  } else {
    carouselCurrentIndex = carouselCurrentIndex - 1;
  }
  carouselImageChange();
  handleCarouselDot();
});
