//Step 1: write a program that doubles the odd numbers in an array and throws away the even number.
const array = [1, 2, 3, 4, 5, 6];
console.log(array.filter(element => {
    return element % 2 !== 0;
    }).map(element => {
        return element * 2;
    }));

const url = "https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json";

function fetchJSONData(url, callbackFn) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {
        console.log("Data loaded.");
        const data = JSON.parse(xhr.responseText);
        callbackFn(data);
    });
    xhr.open('GET', url);
    xhr.send();
}

fetchJSONData(url, data => {
    data.map(element => { let tag = ""; 
        if (element.rating >= 7) 
            tag = "good";
            
        
        if (element.rating >= 4 && element.rating < 7) 
            tag = "Average";

        if (element.rating <= 3)
            tag = "Bad";
            
        console.log(element.title, tag);
    })
}

);
