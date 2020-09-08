//fetches API with validated key
const API_KEY = "e618717f";
const url = "http://www.omdbapi.com/?apikey=" + API_KEY + "&";

//variable created to store results
var resultsBox = "";

//constant created to store search term
const searchTerm = document.querySelector('#searchValue');

//constant created to store search button activity
const searchBtn = document.querySelector('#searchMovies');

//constant created to store nominate button activity for each element
const nominateBtn = document.querySelector('#nominateSection');

//counter to count the number of times the loop is run for search results and nominate button
var count = 0;
//variable created to store status of notification banner whether 5 nominations are given
var notify = false;

//function run when user searches for something - fetches from OMDB library of films
searchBtn.onclick = function(clickSearch) {
  
  clickSearch.preventDefault();
  //constant created to store search value locally
  const inputSearch = searchTerm.value;

  //calls API to fetch for film search
  fetch(url + "&s=" + inputSearch)
    .then((fetchResponse) => fetchResponse.json())
    .then((searchResult) => {

      //displays nominations heading in its section
      let nominationsHeading = "<h3>Nominations</h3>"

      //store in this variable
      let fetchResult = '';

      //if searched for nothing, then returns banner message to notify user that nothing ws entered. Else, stores input searched for by user in a variable
      if (inputSearch == "") {
        alert("Nothing was entered. Please try again.");
      } else {
        fetchResult = `<h3>Results for "${inputSearch}"</h3>`;
      }

      //displays Result for "inputted text" as a title for the Results section
      document.getElementById('resultsBox').innerHTML = fetchResult;

      //function to create a list that is displayed underneath the title by running a for each loop
      searchResult.Search.forEach(function (makeFilmList) {

        //list created
        var listElement = document.createElement('li');
        
        //to display title + year format for each element in list
        var listRow = makeFilmList.Title + " " + "(" + makeFilmList.Year + ")" + "\xa0\xa0";
        listElement.innerText = listRow;

        //created button to Nominate film with text as nominate
        var btnNom = document.createElement("button");
        var textNom = document.createTextNode("Nominate");
        btnNom.appendChild(textNom);
        
        //appending results into a list
        fetchResult += document.getElementById('resultsBox').appendChild(listElement).appendChild(btnNom);

        //function for nominating 
        btnNom.addEventListener("click", function () {
          
          count++;
          //calls method to check if nominated 5 nominees
          displayBanner();
          btnNom.disabled = true;

          //creating a nominee list
          var listNom = document.createElement("li");
          var rowNom = listRow;

          listNom.innerText = rowNom;

          //storing the list element and displaying them
          var uLNom = document.getElementById("nominationList");
          uLNom.appendChild(listNom);

          //remove button to remove nominees
          var nomButton = document.createElement("button");
          var removeBtn = document.createTextNode("Remove");
          nomButton.appendChild(removeBtn);

          //displaying remove button with the list of nominees
          document.getElementById('nominateSection').appendChild(listNom).appendChild(nomButton);

          //function to remove nominees from list and keeping count
          nomButton.addEventListener("click", function (removeElementNom) {
            count--;
            removeElementNom.target.parentNode.remove()
            btnNom.disabled = false;
          });
        });
      });

      //function to display the banner notification when 5 nominees have been reached
      function displayBanner() {
        if (count == 5) {
          notify = true;
          alert("5 films have been nominated!");
        }
      }
            
      document.getElementById('nominationsTitle').innerHTML = nominationsHeading;
    })
}
