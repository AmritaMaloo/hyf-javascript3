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
/*function setTag (allMovies) {
    allMovies.forEach(movie => {  
        if (movie.rating >= 7) {
            movie.tag = "good";
        } else if (movie.rating < 4) {
            movie.tag = "Bad"; 
        } else { movie.tag = "Average"; }
    });
}*/
function makeListOfMovies (movies) {
    movies.forEach(movie => {
        const li_item = document.createElement('li');
        li_item.innerHTML = movie.title;
        List_of_movies.appendChild(li_item);
    });
}
//Render all the movies as a list (similar to how you were presenting Github repositories in the homework before).
function renderAllMovies () {
    List_of_movies.innerHTML = "";
    getAjaxData("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json")
        
        .then(allMovies => {
            
            makeListOfMovies(allMovies);       
        })
        .catch((error) => {
            console.log(error);
        });
}
//Add a input field, and a button to perform search. Use .filter method on arrays to filter on the titles.
function renderSearchedMovies() {
    getAjaxData("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json")
        .then(allMovies => {
            List_of_movies.innerHTML = "";
            message.innerHTML = "";
            const array_of_titles = allMovies.map(movie => movie.title);
                       
            const split_searchitem_intoarray = (search_item.value).toLowerCase().split(/[ ,]+/);
            array_of_titles.filter(title => { 
                const split_title = title.toLowerCase().split(/[ ,]+/)
            
                for(let item of split_title) {
                
                    if(split_searchitem_intoarray.includes(item)) {
                        const li_item = document.createElement('li');
                        
                        li_item.innerHTML = title;
                       
                        List_of_movies.appendChild(li_item);

                    }
                    
                }
                if(typeof(li_item) === "undefined"){
                    message.innerHTML = "No movies found";
                }
            }); 
        })
        .catch((error) => {
            console.log(error);
        });
}