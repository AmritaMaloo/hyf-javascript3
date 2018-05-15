//Step 1: write a program that doubles the odd numbers in an array and throws away the even number.

const array = [1, 2, 3, 4, 5, 6];
console.log((array.filter(element => element % 2 !== 0)).map(element => element * 2));

//Step 2.1 Give each movie a tag: Good (>=7), Average (4-6), Bad (0-3) based on the ratings.

function getAjaxData(url, callback) {
    // Create new ajax call with the js function called XMLHttpRequest
    const request = new XMLHttpRequest();
    request.addEventListener('load', function () {
        // This in here is our callback function
        // Check our server responsecode, 200 means ok, success: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes 
        if (this.status === 200) {
            callback(JSON.parse(request.responseText));
        } else {
            console.log('Something is probably wrong with the url');
        }
    });

    request.addEventListener('error', function () {
        console.log('Server error like timeout');
    });

    // initializes a request with an http method
    request.open("GET", url);
    // Sends the request 
    request.send();
}

getAjaxData("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json", allMovies => {
 
    allMovies.map(movie => {  
        if (movie.rating >= 7) 
            movie.tag = "good";
            
        
        if (movie.rating >= 4 && movie.rating < 7) 
            movie.tag = "Average";

        if (movie.rating < 4)
            movie.tag = "Bad";
            
        
        
    });
    console.log(allMovies);


// Step 2.2 Calculate the average rating of all the movies.
const sum_of_ratings = allMovies.map(movie => movie.rating).reduce((accumulator, rating) => accumulator + rating);
console.log("avegrage rating of all the movies is:", sum_of_ratings / allMovies.length);

// Step 2.3 Count the total number of Good, Average and Bad movies.
const all_good_movies = allMovies.filter(movie => {if (movie.tag === "good") return movie;});
console.log("Total number of good movies: ", all_good_movies.length);

const all_avg_movies = allMovies.filter(movie => {if (movie.tag === "Average") return movie;});
console.log("Total number of Average movies: ", all_avg_movies.length);

const all_bad_movies = allMovies.filter(movie => {if (movie.tag === "Bad") return movie;});
console.log("Total number of bad movies: ", all_bad_movies.length);


// Step 2.4 Count the number of movies containing the following keywords: ["The", "dog", "who", "is", "not", "a", "man"].

let arrayOfKeywords = ["The", "dog", "who", "is", "not", "a", "man"];
arrayOfKeywords = arrayOfKeywords.map(element => element.toLowerCase());

const movies_with_keywords = allMovies.filter(movie => {
    const split_title_into_array = movie.title.toLowerCase().split(/[ ,]+/);
    for(let item of split_title_into_array) {
        if (arrayOfKeywords.includes(item) === true)
        return movie.title;

    }
    
}).map(movie => movie.title);
console.log(movies_with_keywords);
console.log("total number of movies that contain the keywords:", movies_with_keywords.length);
});