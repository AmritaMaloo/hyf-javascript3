//Step 1: Continuing on previous weeks' homework
//Review the movies solution, complete your own implementation, and then add the following features on top:
// 1) Create a way to select movies by decade (hint: you can use something similar to how movies are filtered by the rating tag).
// 2) Similarly, allow the user to sort the movies by: Name, Rating or Year (hint: you can create a new select element as well, listen for user interaction and then apply array.sort() at the end).

// To view the above steps please click https://github.com/AmritaMaloo/hyf-javascript3/tree/master/JS3-Week2-HomeWork
// https://amritamaloo.github.io/hyf-javascript3/JS3-Week2-HomeWork/



//Small exercises on Closure and Promise

//1. Write a function that would allow you to do this:
function createBase(x) {
    return y => {
        return x + y;
    };
};

const addSix = createBase(6);
console.log("pass 10 to addSix ", addSix(10));
console.log("pass 21 to addSix ", addSix(21));

//2. Rewrite the following code (using promise and other control flow tools/features):

function getAjaxData(url) {
    return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('load', function () {
        if (this.status === 200) {
            resolve(JSON.parse(request.responseText));
        } else {
            reject('Something is probably wrong with the url');
           
        }
    });
    request.addEventListener('error', function () {
        reject('server error like timeout');
    });
    request.open("GET", url);
    request.send();
    });
}


const usersURL = "https://jsonplaceholder.typicode.com/users";

getAjaxData(usersURL)
   .then( (data) => {
       let users = data;
        for (let i = 0; i < users.length; i++) {
            // load the todos for this user
            const todosURL = `https://jsonplaceholder.typicode.com/users/${users[i].id}/todos`; 
            // why is this line needed below?
             
            //let index = i; --this line is not required since index = i, hence removed.
            getAjaxData(todosURL)
            .then((data1) => {
                users[i].todos = data1;
                //console.log(index, i);

                // if this is the last user, console.log all data
                if(i == users.length - 1)
                console.log(users);
            })
            .catch((err) => {
                console.log('Error loading todos for user ', i, ' :', err);
            });
        }
    })
    .catch((err) => {
        console.log('Error loading users: ', err);
    });


// 3. A hint - the code is syntactically correct but doesn't do what you would expect. Can you see why and fix it?
// Answer : Did not find out any bug, as it's giving correct output !    
const prizes = ['A Unicorn!', 'A Hug!', 'Fresh Laundry!'];
    for (let btnNum = 0; btnNum < prizes.length; btnNum++) {
        // for each of our buttons, when the user clicks it...
        document.getElementById('btn-' + btnNum).onclick = function() {
            // tell her what she's won!
            alert(prizes[btnNum]);
        };
    }
    
        

            

           
  
