function fetchJSONData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            const jsonData = JSON.parse(xhr.responseText);
            resolve(jsonData);
        })

        xhr.open('GET', url);
        xhr.send();
    });
}

let filteredMovies = {};




const url = 'https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json';

fetchJSONData(url).then(allMovies => {

    const taggedMovies = tagMovies(allMovies);

    console.log(taggedMovies);


    let obj = taggedMovies.map(x => x.year);

    let arr = Object.values(obj);
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    console.log(`Min value: ${min}, max value: ${max}`);



    const form = document.querySelector('#searchForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form)
        const searchText = formData.get('searchText').toLocaleLowerCase();
        const selectedTag = formData.get('selectedTag');
        const selectedDecades = formData.get('selectedDecades');
        const sortedFactor = formData.get('sortedFactor');

        // const searchText = searchInput.value;


        filteredMovies = taggedMovies.filter(x => x.title.toLocaleLowerCase().includes(searchText));



        if (selectedDecades !== "null") {

            filteredMovies = filteredMovies.filter(x => x.year >= Number(selectedDecades) && x.year < (Number(selectedDecades) + 10));
            console.log(filteredMovies);
        };

        if (selectedTag !== 'All') {
            filteredMovies = filteredMovies.filter(x => x.tag === selectedTag);
        };

        console.log("You're searching for : ", searchText, selectedTag, selectedDecades);

        renderMovies(filteredMovies);
    });

            sortPar.addEventListener("change", (event) => {
            event.preventDefault();
            tbodyElement.innerHTML = '';
            let optionValue = sortPar.options[sortPar.selectedIndex].value;
            console.log(optionValue);

            let byFactor = filteredMovies;

            if (optionValue == 'title') {
                byFactor.sort(function(a, b) {
                    let x = a[optionValue].toLowerCase();
                    let y = b[optionValue].toLowerCase();
                    return x.localeCompare(y);
                });

            } else if (optionValue != 'null') {
                byFactor.sort(function(a, b) {
                    return a[optionValue]- b[optionValue];
                });
            }
            renderMovies(byFactor);


        });
}).catch(error => console.log('Error', error));




const sortPar = document.getElementById("sortedFactor");
 const tbodyElement = document.querySelector('#moviesList > tbody'); //to find the tbody element in movielist








function tagMovies(movies) {
    // Give each movie a tag: Excellent (>=8.5), Very Good (>=8), Good (<8) based on the ratings.
    const taggedMovies = movies.map(movie => {
        // const movie = Object.assign({}, oldMovie);

        if (movie.rating >= 8.5) {
            movie.tag = 'Excellent';
        } else if (movie.rating >= 8) {
            movie.tag = 'Very Good';
        } else {
            movie.tag = 'Good';
        }

        return movie;
    });

    return taggedMovies;

}


function renderMovies(movies) {
    const p = document.querySelector('#searchCount');
    p.style.display = 'block';

    p.innerHTML = movies.length === 0 ? "No movies found" : `${movies.length} movies found`;

    const table = document.querySelector('#moviesList');
    table.style.display = movies.length > 0 ? 'block' : 'none';

    // Render all the movies as a list (similar to how you were presenting Github repositories in the homework before).
    //to find the tbody element in movielist
    tbodyElement.innerHTML = '';

    for (const movie of movies) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td>${movie.title}</td>
                <td>${movie.year}</td>
                <td>${movie.rating}</td>
                <td>${movie.votes}</td>
                <td>${movie.tag}</td>
            `;
        tbodyElement.appendChild(tr);
    }
}



//Small exercise_exercise1;
let addSix = createBase(6);

function createBase(z){
    const addSix = x => x + z;
    return addSix;
}

addSix(10); // returns 16
addSix(21); // returns 27

console.log(addSix(10));
console.log(addSix(21));

//Small exercise_exercise2;


function fetchJsonData(url2) {
    
    const promise1 = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
         request.addEventListener('load', () => {
        const jsonData = JSON.parse(request.responseText) ;
        resolve(jsonData);
    });
         request.addEventListener('error', () => {
         reject(request.responseText);
         console.log('Error loading users: ', err);
    });
   

    request.open('get', url2);
    request.send();
})
    return promise1;

}

const usersURL = "https://jsonplaceholder.typicode.com/users";

fetchJsonData(usersURL)
    .then(data => {

        let users = data;
        for (var i = 0; i < users.length; i++) {
        const todosURL = `https://jsonplaceholder.typicode.com/users/${users[i].id}/todos`;
        let index = i;
        fetchJsonData(todosURL).then(list =>{
            users[index].todos = list;
            if(index == users.length - 1)
                    console.log(users);
        })


    };
    

    }).catch(error => console.log('Something is probably wrong with the url'));
