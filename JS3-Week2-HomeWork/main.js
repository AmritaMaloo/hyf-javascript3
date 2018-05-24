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

const List_of_movies = document.querySelector(".all_movies_list");
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
    return allMovies;
}
// 2.6 Display the average rating of the movies being filtered and displayed.
function displaySum_Avg (titleRatingArray) {
  
    let avg_of_ratings = 0;
    let sum_of_ratings = 0;
    const movie_count = titleRatingArray.length;
    sum_of_ratings =  titleRatingArray.reduce((accumulator, element) => {
        return accumulator + element.rating;
    },0);
    avg_of_ratings = sum_of_ratings / movie_count;
    show_total_avg.innerHTML = "Total movies: " + movie_count + " and " + "Average rating: " + avg_of_ratings;
}
// 2.5 Display only the movies in the list which match the two filter criterion above.
// 2.2 Render all the movies as a list
function makeListOfMovies (movie) {
    const li_item = document.createElement('li');
    li_item.innerHTML = movie.title;
    List_of_movies.appendChild(li_item);
}
//Clear all the lists and messages
function clearTags () {
    List_of_movies.innerHTML = "";
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
function check_which_radiobutton(all_movie_withtags) {     
    let title_rating_array = [];
    
    if(document.querySelector(".all-movies").checked) {
        title_rating_array = all_movie_withtags.map(movie => { return {"title": movie.title, "rating": movie.rating} });
        
    } else if(document.querySelector(".good-movies").checked) {
        title_rating_array = all_movie_withtags.filter(movie => movie.tag === "good").map(movie => { return {"title": movie.title, "rating": movie.rating} });
        
    } else if(document.querySelector(".bad-movies").checked) {
        title_rating_array = all_movie_withtags.filter(movie => movie.tag === "Bad").map(movie => { return {"title": movie.title, "rating": movie.rating} });
    
    } else if(document.querySelector(".avg-movies").checked) {
        title_rating_array = all_movie_withtags.filter(movie => movie.tag === "Average").map(movie => { return {"title": movie.title, "rating": movie.rating} });
    
    } else  { 
        message.innerHTML = "Please select atleast one option";
        return ;
       
    }
    return title_rating_array;
}
//perform search
function searchForUserInput (selectedTagMovies) {
    
    
    const split_searchitem_intoarray = (search_item.value).toLowerCase().split(/[^a-zA-Z0-9]/).filter(s => s.length > 0);
    
    const filteredMovies = [];
    selectedTagMovies.filter(element => { 
        const split_title = (element.title).toLowerCase().split(/[^a-zA-Z0-9]/).filter(s => s.length > 0);
        let tempArray = []; //to remove duplicate occurences eg. (3 times for the movie "11-11-11")
        for(const item of split_title) {
        
            if(split_searchitem_intoarray.includes(item) && tempArray.includes(item) === false) {
                
                filteredMovies.push(element);
                tempArray.push(item);
                

            }
            
        }
        
    }); 
    return filteredMovies;
}
//Add a input field, and a button to perform search. Use .filter method on arrays to filter on the titles.
function renderSearchedMovies() {
    getAjaxData("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json")
        .then(allMovies => {
            clearTags();
            const all_movie_withtags =  setTag(allMovies);
            const selectedTagMovies = check_which_radiobutton (all_movie_withtags);
            
            
            if(search_item.value === "") {
                selectedTagMovies.forEach(makeListOfMovies);
                displaySum_Avg(selectedTagMovies);
            } else {
                const moviesSearchedByUser = searchForUserInput(selectedTagMovies);
                             
                if(moviesSearchedByUser.length == 0) {
                    message.innerHTML = "No movies found";
                } else {
                    moviesSearchedByUser.forEach(makeListOfMovies);
                    displaySum_Avg(moviesSearchedByUser);
                }
            } 
            
        })
        .catch((error) => {
            console.log(error);
        });
}
