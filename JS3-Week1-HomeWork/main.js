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

        if (movie.rating <= 3)
            movie.tag = "Bad";
            
        
        
    });
    console.log(allMovies);


// Step 2.2 Calculate the average rating of all the movies.
const sum_of_ratings = allMovies.map(movie => movie.rating).reduce((accumulator, rating) => accumulator + rating);
console.log("avegrage rating of all the movies is:", sum_of_ratings / allMovies.length);
});
    

