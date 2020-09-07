//fetches API with validated key
const API_KEY = "e618717f";
const url = "http://www.omdbapi.com/?apikey=" + API_KEY + "&";
var resultsBox = "";

const searchTerm = document.querySelector('#searchValue');

const searchBtn = document.querySelector('#searchMovies');

const nominateBtn = document.querySelector('#nominateSection');
var count = 0;
var notify = false;

searchBtn.onclick = function (event) {

  event.preventDefault();
  const inputSearch = searchTerm.value;

  fetch(url + "&s=" + inputSearch)
    .then((fetchResponse) => fetchResponse.json())
    .then((searchResult) => {

      let fetchResult = '';

      if (inputSearch == "") {
        alert("Cannot search for nothing");
      } else {
        fetchResult = `<h3>Results for "${inputSearch}"</h3>`;
      }

      document.getElementById('resultsBox').innerHTML = fetchResult;

      searchResult.Search.forEach(function (makeFilmList) {

        var listElement = document.createElement('li');
        var listRow = makeFilmList.Title + " " + "(" + makeFilmList.Year + ")" + "\xa0\xa0";
        listElement.innerText = listRow;

        var btnNom = document.createElement("button");
        var textNom = document.createTextNode("Nominate");
        btnNom.appendChild(textNom);

        fetchResult += document.getElementById('resultsBox').appendChild(listElement).appendChild(btnNom);

        btnNom.addEventListener("click", function () {
          
          count++;
          displayBanner();
          btnNom.disabled = true;

          var listNom = document.createElement("li");
          var rowNom = listRow;

          listNom.innerText = rowNom;

          var uLNom = document.getElementById("nominationList");
          uLNom.appendChild(listNom);

          var nomButton = document.createElement("button");
          var removeBtn = document.createTextNode("Remove");
          nomButton.appendChild(removeBtn);

          document.getElementById('nominateSection').appendChild(listNom).appendChild(nomButton);

          nomButton.addEventListener("click", function (removeElementNom) {
            count--;
            removeElementNom.target.parentNode.remove()
            btnNom.disabled = false;
          });
        });
      });

      function displayBanner() {
        if (count == 5) {
          notify = true;
          alert("5 films have been nominated!");
        }
      }
      let nominationsHeading = "<h3>Nominations</h3>"
      document.getElementById('nominationsTitle').innerHTML = nominationsHeading;
    })
}
