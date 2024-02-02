apiKey = "hA8Tg18Yh6X3uiQW5tD5GjoRkXjrJlsl";

queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

adeleUrl = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=US&apikey=${apiKey}`;

function ticketFetch() {
    fetch(adeleUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            var eventName = data._embedded.events[0].name;
            console.log(eventName)

            var eventVenue = data._embedded.events[0]._embedded.venues[0].name;
            console.log(eventVenue);

            var eventDate = data._embedded.events[0].dates.start.localDate;
            console.log(eventDate);

            var eventPrice = data._embedded.events[0].priceRanges[0].min;
            console.log(eventPrice)


            for (var i = 0; i < 10; i++) {
                console.log(data)
            }
        
            console.log(data)

            // create table element to display search results
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
                tableRow.append($("<td>").text(eventName));
                tableRow.append($("<td>").text(eventVenue));
                tableRow.append($("<td>").text(eventDate));
                // format price to US dollars
                var formattedPrice = "$" + eventPrice.toFixed(2);
                tableRow.append($("<td>").text(formattedPrice));
                resultsTable.append(tableRow);
            }

            resultsTable.prepend(headerRow);
            // append table to main page body
            $("#results-table").append(resultsTable);
        })
}

// call ticketFetch function
ticketFetch()

  fetch(adeleUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // for (var i = 0; i < 10; i++){
      //     console.log(data)
      // }
      console.log(data);
    });
}

ticketFetch();

const burgerMenu = document.querySelector(".burger-icon svg");

burgerMenu.addEventListener("click", function () {
  const sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "flex";
});

const crossIcon = document.querySelector(".cross-icon svg");

crossIcon.addEventListener("click", function () {
  const sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "none";
});
