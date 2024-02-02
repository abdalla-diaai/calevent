apiKey = "hA8Tg18Yh6X3uiQW5tD5GjoRkXjrJlsl";

queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

adeleUrl = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=US&apikey=${apiKey}`;

function ticketFetch() {
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
