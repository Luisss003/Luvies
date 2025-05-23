//Specifies API endpoint
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=X';


const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

//The query to the API
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=X&query=";

//Get handle to main section, form, and search input
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

if(window.location.pathname.endsWith("index.html")) {
  returnMovies(APILINK);
}


//query the API endpoint, and console log the results
function returnMovies(url){
  fetch(url).then(res => res.json())
  .then(function(data){
    console.log(data.results);
    data.results.forEach(element =>{
      //create new div element in HTML
      const divCard = document.createElement('div');
      divCard.setAttribute('class', 'card');
      
      const divRow = document.createElement('div');
      divRow.setAttribute('class', 'row');
      
      const divColumn = document.createElement('div');
      divColumn.setAttribute('class', 'column');
      
      const image = document.createElement('img');
      image.setAttribute('class', 'poster');
      image.setAttribute('id', 'image');
      
      const title = document.createElement('a');
      title.setAttribute('id', 'title');
      title.setAttribute('href', `file:///X/movie_details.html?id=${element.id}`);

      const center = document.createElement('center');

      title.innerHTML = `${element.title}`;
      image.src = IMG_PATH + element.poster_path;
      
      //Put child elements into parent elements
      center.appendChild(image);
      divCard.appendChild(center);
      divCard.appendChild(title);
      divColumn.appendChild(divCard);
      divRow.appendChild(divColumn);
      main.appendChild(divRow);
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //Clear movies that were there on previous searches
  main.innerHTML = '';

  //Get search input value
  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    //Clear search input after search
    search.value = '';
  }
  else{
    //Display default movies if search input is empty
    returnMovies(APILINK);
  }
});
