const burgerMenu = document.querySelector(".burger-icon svg");
const crossIcon = document.querySelector(".cross-icon svg");
const sideBar = document.querySelector(".sidebar");
const clearBtn = document.querySelector("#clear-button");

var apiKey = "hA8Tg18Yh6X3uiQW5tD5GjoRkXjrJlsl";
var suggestUrl = `https://app.ticketmaster.com/discovery/v2/suggest.json?apikey=${apiKey}&countryCode=GB`;
$("#search-button").on("click", function (event) {
  event.preventDefault();
  $("#table-body").empty();
  var searchGenre = $("#search-keyword").val();
  var searchDate = $("#search-date").val();
  var searchCity = $("#search-city").val();
  var queryUrl;
//   to make keyword search optional
  if (searchGenre === " ") {
    queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${searchCity}&startDateTime=${searchDate}T10:00:00Z&countryCode=us&apikey=${apiKey}`;
  } else {
    queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${searchGenre}&city=${searchCity}&startDateTime=${searchDate}T10:00:00Z&countryCode=GB&apikey=${apiKey}`;
  }
  ticketFetch(queryUrl);
  $("#search-city").val("");
  $("#search-date").val("");
  $("#search-keyword").val("");
});

function ticketFetch(fetchUrl) {
    fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    // try block for no results
      try {
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
            if (parseInt(data._embedded.events[i].priceRanges[0].min) > 0) {
                tableRow.append(
                    $("<td>").text(`£${parseInt(data._embedded.events[i].priceRanges[0].min)/0.8}`))
            } else {
                tableRow.append($("<td>").text("Not Available"));
            }
         }
         catch (err) {
          tableRow.append($("<td>").text("Not Available"));
        }
        $("#table-body").append(tableRow);
      
    }
      }
    //   show modal when no results are available
      catch(err){
        var modalPopup = new bootstrap.Modal($('.modal'), {});
        modalPopup.show();
      }
    });
}

$('#clear-button').on('click', function(){
    $("#table-body").empty();

})
// jokes fetch
var backupJokes = [{'Why did the ghost go to rehab?': 'He was addicted to boos.'}, {'Why did the car get a flat tire?': 'Because there was a fork in the road!'}, {'How did the hipster burn his mouth?': 'He ate his pizza before it was cool.'}, {'What did the janitor say when he jumped out of the closet?': ' SUPPLIES!!!!'}, {'Have you heard about the band 1023MB?': 'It is probably because they have not got a gig yet…'}
]

var jokesUrl = 'https://official-joke-api.appspot.com/random_joke'

function jokeFetch(apiUrl) {
    fetch(apiUrl)
      .then(function (response) {
  
          return response.json();
      })
      .then(function (data) {
        document.querySelector(".accordion-button").innerHTML = data.setup;
        document.querySelector(".accordion-body").innerHTML = data.punchline;
      })
      .catch(function (error) {
        var randomJoke = backupJokes[Math.floor(Math.random() * backupJokes.length)];
        document.querySelector(".accordion-button").innerHTML = Object.keys(randomJoke);
        document.querySelector(".accordion-body").innerHTML = Object.values(randomJoke);
      });
  }
  


jokeFetch(jokesUrl);

function suggestFetch(){
fetch(suggestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
   for(var i=0;i<data._embedded.events.length;i++){
    $(`#event-${i}-image`).attr('src',data._embedded.events[i].images[0].url) 
    $(`#event-${i}-title`).text(data._embedded.events[i].name)
    $(`#event-${i}-date`).text(data._embedded.events[i].dates.start.localDate)
    $(`#event-${i}-url`).attr('href',data._embedded.events[i].url)
   }
    }) 
  }
 suggestFetch();

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

