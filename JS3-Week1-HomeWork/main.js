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


// Step 2.2 Calculate the average rating of all the movies..
const sum_of_ratings = allMovies.map(movie => movie.rating).reduce((accumulator, rating) => accumulator + rating);
console.log("avegrage rating of all the movies is:", sum_of_ratings / allMovies.length);

// Step 2.3 Count the total number of Good, Average and Bad movies.
const all_good_movies = allMovies.filter(movie => movie.tag === "good");
console.log("Total number of good movies: ", all_good_movies.length);

const all_avg_movies = allMovies.filter(movie => movie.tag === "Average");
console.log("Total number of Average movies: ", all_avg_movies.length);

const all_bad_movies = allMovies.filter(movie => movie.tag === "Bad");
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

// Step 2.5 Count the number of movies made between 1980-1989 (including both the years).
const movies_between_80_89 = allMovies.filter(movie => movie.year >= 1980 && movie.year <= 1989).map(movie => {return {title: movie.title, year: movie.year}});
console.log(movies_between_80_89);
console.log("Total number of Movies made between 1980-1989: ", movies_between_80_89.length)
});

//Step 3 use map, filter and reduce to show the most and the least forked repositories, stargazed repositories.
document.querySelector(".tosubmit").addEventListener('click', searchedRepos);
document.querySelector(".btn_MostForked").addEventListener('click', getMostForked);
document.querySelector(".btn_LeastForked").addEventListener('click', getLeastForked);
document.querySelector(".btn_MostStargazers").addEventListener('click', getMostStargazers);
document.querySelector(".btn_LeastStargazers").addEventListener('click', getLeastStargazers);
document.querySelector(".btn_TotalForks").addEventListener('click', getTotalForks);

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const p = document.querySelector('.message');
const p1 = document.querySelector('.forks_or_stars');
const ul3 = document.querySelector('.name_and_commits');
const ul1 = document.querySelector('.repolinks');
const ul2 = document.querySelector('.commitList');
h2.style.display = 'none';
h3.style.display = 'none';
document.querySelector(".btn_MostCommits").style.display = 'none';


//Most and Least Forked
function getMostForked() {
    getAjaxData("https://api.github.com/orgs/HackYourFuture/repos", allRepos => {
        const sortedRepos = sort_the_Repos(allRepos);
        const mostForkedRepos = sortedRepos.filter(repo => repo.forks_count == sortedRepos[sortedRepos.length-1].forks_count);
        make_dom_list(mostForkedRepos);
        
    }); 
   
}

function getLeastForked() {
    getAjaxData("https://api.github.com/orgs/HackYourFuture/repos", allRepos => {
        const sortedRepos = sort_the_Repos(allRepos);
        const leastForkedRepos = sortedRepos.filter(repo => repo.forks_count == sortedRepos[0].forks_count);
        make_dom_list(leastForkedRepos);        
        
    });
    
}
function sort_the_Repos (allRepos) {
    clearAllTags();
    const sortRepos =  allRepos.sort((a,b) => {
        if (a.forks_count < b.forks_count) {
            return -1;
        } else if (a.forks_count > b.forks_count) {
            return 1;
        } else return 0;
    });
    return sortRepos;
}
function make_dom_list (forkedRepos) {
    p1.innerHTML = "Forks Count is: " + forkedRepos[0].forks_count;
    forkedRepos.map(repo => {
        const li = document.createElement("li");
        li.innerHTML =`<a href = "${repo.html_url}">${repo.name}</a>`;
        ul1.appendChild(li);

    });
    
}
//Most and Least Stargazers
function getMostStargazers() {
    getAjaxData("https://api.github.com/orgs/HackYourFuture/repos", allRepos => {
        clearAllTags();   
        const maxStar = findMaxStar(allRepos); 
        make_dom_list2(allRepos, maxStar);   
     
        
    }); 
   
}
function findMaxStar(allRepos) {
    let maxStar = 0;
    allRepos.map(repo => {
        if(repo.stargazers_count > maxStar) 
        maxStar = repo.stargazers_count;

    });
    return maxStar;
}
function getLeastStargazers() {
    getAjaxData("https://api.github.com/orgs/HackYourFuture/repos", allRepos => {
        clearAllTags();    
        const maxStar = findMaxStar(allRepos); 
        let leastStar = maxStar;
        allRepos.map(repo => {
            if(repo.stargazers_count < leastStar) 
            leastStar = repo.stargazers_count;

        });
        make_dom_list2(allRepos, leastStar);   
             
        
    }); 
   
}
function make_dom_list2(allRepos, star) {
    p1.innerHTML = "Stargazers count is: " + star;
    allRepos.filter(repo => repo.stargazers_count == star).map(repo => {
        const li = document.createElement("li");
        li.innerHTML =`<a href = "${repo.html_url}">${repo.name}</a>`;
        ul1.appendChild(li);
    });

}
function getTotalForks() {
    getAjaxData("https://api.github.com/orgs/HackYourFuture/repos", allRepos => {
        clearAllTags();

        const sum = allRepos.map(repo => repo.forks_count).reduce((accumulator,forkCount) => {
            return accumulator + forkCount;

        }, 0);
        p1.innerHTML = "Total number of forks: " + sum;
    });    
    
}

//Searching repositories by userInput
function searchedRepos() {
    const input = document.querySelector('input');
    const url = "https://api.github.com/search/repositories?q=user:HackYourFuture+" + (input.value);
    
    getAjaxData(url, data => {

        clearAllTags();
        if(data.total_count === 0)
            p.innerHTML = "please enter some valid data";
        else {
            
            for(const obj of data.items) {
                const li = document.createElement('li');
                li.innerHTML = `<a href="#commitDivID">${obj.url}</a>`;
                    
                ul1.appendChild(li); 
                li.addEventListener('click', function (event) {
                    event.preventDefault();
                    commitDetails(obj);
                });   
                   
            }
                
        }
               
        input.value = "" ;     
    });
    

}

function commitDetails(obj) {
    ul3.innerHTML = "";  
    h2.innerHTML = `<a href="${obj.html_url}" target="_blank">${obj.name}</a>`;
    
    h3.innerHTML = "Commits";
    h2.style.display = 'block';
    h3.style.display = 'block';
    document.querySelector(".btn_MostCommits").style.display = 'block';

    const url = obj.url + "/commits";
    ul2.innerHTML = "";
    
    getAjaxData(url, function(data) {
        for(const eachobj of data) {
            const li = document.createElement('li');
            li.innerHTML = `<div class="img-name"><div class="image"><a href="${eachobj.author.html_url}" target="_blank"><img src="${eachobj.author.avatar_url} alt="avatar" width="50" height="50"></a></div><div class="name"><p><a href="${eachobj.author.html_url}" target="_blank">${eachobj.commit.author.name}</a></p></div></div><br><div class="date-commit"><p>${eachobj.commit.author.date}<br>${eachobj.commit.message}</p></div>`
            ul2.appendChild(li); 
        }
        document.querySelector(".btn_MostCommits").addEventListener('click', event => {
            event.preventDefault();
            getMostCommits(data);
        }); 
    });
}
function getMostCommits (data) {
    ul3.innerHTML = "";
    const authorArray = data.map(element => element.author.login).sort();
       
    let name = "";
    let counter = 0;
    let max1 = 0;
      
    const combined =  [];
    authorArray.map(element => {
        if(element !== name) {
            counter = 0;
            combined.push({authorname: element, numberofcommits: ++counter});
          
            
        } else {
            combined.pop();
            combined.push({authorname: element, numberofcommits: ++counter});
        }
        name = element;

    });
        
    combined.map(item => {
        if(item.numberofcommits > max1) 
            max1 = item.numberofcommits;
    
      
    });
    
    combined.filter(item => item.numberofcommits === max1).map(item => {
        const li = document.createElement("li");
        li.innerHTML = item.authorname + ": " + item.numberofcommits;
        ul3.appendChild(li);
        
    });


}



function clearAllTags() {
    p.innerHTML = "";
    p1.innerHTML = "";
    ul3.innerHTML = "";
    ul1.innerHTML = "";
    ul2.innerHTML = "";
    h2.innerHTML = "";
    h3.innerHTML = "";
    document.querySelector(".btn_MostCommits").style.display = "none";
    

}

