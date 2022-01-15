//API con la que vamos a trabajar https://jsonplaceholder.typicode.com/
//JSONPlaceholder - Free Fake REST API (typicode.com)

//primero, seleccionamos los elementos que queremos manipular
// se puede hacer con querySelector o con get ElementById: const cards = document.querySelector('#user-list');
// const cards = document.getElementsByClassName('user-list');


const cards = document.querySelector('.user-list');

//hacemos una peticion a la API que devuelve un array de objetos. Las APIs son procesos asincronos que devuelven siempre una promesa
const fetchUser = () =>{
    //definimos un array que contendra los objetos de la promesa
    const promises = [];

    //hacemos la llamada a la API que devuelve una promesa
    // await fetch ('https://jsonplaceholder.typicode.com/users')
    // .then(res => res.json())
    // .then(res => console.log(res));

    //Hacemos llamadas a la API para obtener cada usuario y vamos añadiendo los objetos al array, en formato json
    for (let i =1; i <= 10; i++){
        const url= `https://jsonplaceholder.typicode.com/users/${i}`
        promises.push(fetch(url)
        .then(res => res.json())
        
        );
    }

    //Resolvemos todas las promesas devueltas en la llamada a la API
    Promise.all(promises).then(results =>{
        //Creamos un nuevo array de objetos obteniendo los valores que queremos de los objetos que, en este caso, es name, username y email
        const user = results.map((result)=>({
            name:result.name,
            userName:result.username,
            email: result.email,
        }));
        //llamamos a la funcion para mostrar todos los usuario obtenidos
        displayUser(user);
    });
}

const displayUser = (user) =>{
    console.log(user);

    //en vez de usar appendChild, createElement, etc. podemos hacerlo directamente
    const myUser = user.map((newUser) => `
    <li><h2>${newUser.name}</h2>
    <p>${newUser.userName}</p>
    <p>${newUser.email}</p>
    </li>`
    ).join('');
    cards.innerHTML = myUser;
};


 window.addEventListener('load', fetchUser);