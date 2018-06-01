//Step 1: Closure: We have an array with the numbers from 1 to 1000. Now we are interested in all numbers in that array which are divisible by 3. And then divisible by 10. And then by 21. We have implemented that using for loops:

const arr1_to_1000 = [];
for(i = 1; i <= 1000; i++) {
    arr1_to_1000.push(i);
}
console.log(arr1_to_1000);

function makeDivisibleFactory(x) {
    return arr1_to_1000 => {
        return arr1_to_1000.filter(num => num % x == 0);
    };
};

const divisibleBy_3 = makeDivisibleFactory(3);
const divisibleBy_10 = makeDivisibleFactory(10);
const divisibleBy_21 = makeDivisibleFactory(21);

console.log("Numbers divisible by 3", divisibleBy_3(arr1_to_1000));  
console.log("Numbers divisible by 10", divisibleBy_10(arr1_to_1000)); 
console.log("Numbers divisible by 21", divisibleBy_21(arr1_to_1000));

//create an array which uses this factory above to calculate the number of item in arr above which are divisible by numbers between 1-30 i.e. your array will contain 30 items and looks something like this:
//1000, 500, 333, 250, 200, 166, 142, 125, 111, 100, 90, 83, 76, 71, 66, 62, 58, 55, 52, 50, 47, 45, 43, 41, 40, 38, 37, 35, 34, 33]
const arrayOf30nums = [];
for(j = 1; j <=30; j++) {
    let divisibleBy_j = makeDivisibleFactory(j);
    arrayOf30nums.push(divisibleBy_j(arr1_to_1000).length);
}
console.log(arrayOf30nums);

//Step 2: Using this json file as the source, build a function which does the following:
document.querySelector(".btn-AllMovies").addEventListener('click', renderAllMovies);
document.querySelector(".tosubmit").addEventListener('click', renderSearchedMovies);

const select_decade = document.querySelector(".decade");
const list_titles = document.querySelector(".movie-titles");
const list_ratings = document.querySelector(".movie-ratings");
const list_years = document.querySelector(".movie-years");
const select_sort = document.querySelector(".sort");
select_sort.addEventListener('click', sortMovies);

const search_item = document.querySelector('input');
const message = document.querySelector('.message');
const show_total_avg = document.querySelector('.total-movies');

function getAjaxData(url) {
    return new Promise((resolve, reject) => {
        // Create new ajax call with the js function called XMLHttpRequest
        const request = new XMLHttpRequest();
        request.addEventListener('load', function () {
            // This in here is our callback function
            // Check our server responsecode, 200 means ok, success: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes 
            if (this.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject('Something is probably wrong with the url');
            }
        });

        request.addEventListener('error', function (error) {
            reject('Server error like timeout');
        });

        // initializes a request with an http method
        request.open("GET", url);
        // Sends the request 
        request.send();
    });
}
// 2.1 Give each movie a tag: Good (>=7), Average (4-6), Bad (0-3) based on the ratings.
function setTag (allMovies) {
    allMovies.forEach(movie => {  
        if (movie.rating >= 7) {
            movie.tag = "good";
        } else if (movie.rating < 4) {
            movie.tag = "Bad"; 
        } else { movie.tag = "Average"; }
    });
    
}
// 2.2 Render all the movies as a list
function makeListOfMovies (movie) {
    const li_title = document.createElement('li');
    const li_rating = document.createElement('li');
    const li_year = document.createElement('li');
    li_title.innerHTML = movie.title; 
    li_rating.innerHTML = movie.rating;
    li_year.innerHTML = movie.year;
    list_titles.appendChild(li_title);
    list_ratings.appendChild(li_rating);
    list_years.appendChild(li_year);
    
}
//Clear all the lists and messages
function clearTags () {
    list_titles.innerHTML = "";
    list_ratings.innerHTML = "";
    list_years.innerHTML = "";
    message.innerHTML = " ";
    show_total_avg.innerHTML = " " ;
}
//Render all the movies as a list (similar to how you were presenting Github repositories in the homework before).
function renderAllMovies () {
    clearTags();
    getAjaxData("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json")
        
        .then(allMovies => {
            
            allMovies.forEach(makeListOfMovies) ;       
        })
        .catch((error) => {
            console.log(error);
        });
}
//Add 4 radio buttons for each tag + All tag (All, Excellent, Very Good, Good) and filter the movies based on the tag selected.
function check_which_radiobutton(movie) {     
     
    if(document.querySelector(".all-movies").checked) {
        return true;
        
    } else if(document.querySelector(".good-movies").checked) {
        return movie.tag === "good";
        
        
    } else if(document.querySelector(".bad-movies").checked) {
        return movie.tag === "Bad";
        
    
    } else if(document.querySelector(".avg-movies").checked) {
        return movie.tag === "Average";
        
    
    } else  { 
        return false;
       
    }
    
}
//Select menu -- search by Decade 
function check_which_option_selected (movie) {
    switch(select_decade.value) {
        case "1":
            return movie.year >= 1950 && movie.year <= 1960;
        case "2": 
            return movie.year > 1960 && movie.year <= 1970;
        case "3":
            return movie.year > 1970 && movie.year <= 1980;
        case "4":
            return movie.year > 1980 && movie.year <= 1990;
        case "5":
            return movie.year > 1990 && movie.year <= 2000;
        case "6":
            return movie.year > 2000 && movie.year <= 2010;
        case "7":
            return movie.year > 2010 && movie.year <= 2020;
        case "8": 
            return true;
       
    }
    
}
//perform search
function searchForUserInput (movie) {
    if(movie.title.toLowerCase().includes(search_item.value.toLowerCase())) 
        return true;
    }   
    
//Add a input field, and a button to perform search. Use .filter method on arrays to filter on the titles.
function renderSearchedMovies() {
    getAjaxData("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json")
        .then(allMovies => {
            clearTags();
            setTag(allMovies);
            let selectedMovies = [];
                       
            if(search_item.value === "") 
                selectedMovies = allMovies.filter(check_which_radiobutton).filter(check_which_option_selected);
                           
             else 
                selectedMovies = allMovies.filter(check_which_radiobutton).filter(searchForUserInput).filter(check_which_option_selected);
                
            if(selectedMovies.length == 0) {
                message.innerHTML = "No movies found Or choose atleast one Radio option or select atleast 1 option from the select menu";
            } else {
                selectedMovies.forEach(makeListOfMovies);
                const avg_of_ratings = selectedMovies.reduce((accumulator, movie) => {
                    return accumulator + movie.rating;
                },0) / selectedMovies.length;
                
                show_total_avg.innerHTML = "Total movies: " + selectedMovies.length + " and " + "Average rating: " + avg_of_ratings;
            }
        })
              
        .catch((error) => {
            console.log(error);
        });
}
// sort movie by name / rating / year
function sortMovies() {
    const array =  [];
    const titleList = list_titles.childNodes;
    const ratingList = list_ratings.childNodes;
    const yearList = list_years.childNodes;
    for(i = 0; i < titleList.length; i++) {
        let obj = {"title": titleList[i].innerHTML,
                    "rating": ratingList[i].innerHTML,
                    "year": yearList[i].innerHTML
                };
        array.push(obj);

    }
    selectSort(array);
    
}
function selectSort(array) {
    switch(select_sort.value) {
        case "1":
                       
            array.sort(function(a, b) {
            let nameA = a.title.toUpperCase(); // ignore upper and lowercase
            let nameB = b.title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            
            // names must be equal
            return 0;
            });
            
            break;
        case "2": 
            array.sort(function (a, b){
                return (a.rating * 10 - b.rating * 10) / 10;
            });
            
            break;
        case "3":
            array.sort(function (a, b){
                return a.year - b.year;
            });
            break;
    }
    list_titles.innerHTML = "";
    list_ratings.innerHTML = "";
    list_years.innerHTML = "";
    array.map(makeListOfMovies);
    
}

