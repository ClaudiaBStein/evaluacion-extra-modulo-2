'use strict';

//EJERCICIO FUTURO: Guardar datos de la API en el localStorage y que se guarden los amigos al recargar.

const arrayContainer = document.querySelector('.js-section');
const containerStyle = document.querySelector('.js-container');
//// VARIABLES PARA LA FUNCIÓN PAINTUSERS
let allUsers = [];

//
////FUNCIÓN QUE PINTA LOS DATOS EN LA SECTION
function paintUsers() {
  let html = '';
  let friendedClass = '';
  for (const info of allUsers) {
    if (info.isFriend === true) {
      friendedClass = 'friended';
    } else {
      friendedClass = '';
    }
    html += ` <li class="js-container   main__section--container ${friendedClass}" id="${info.login.uuid}">`;
    html += `<img
           class="js-image main__section--container--img"
           id=""
           src="${info.picture.medium}"
           alt=""
         />`;
    html += ` <h3 class="js-user main__section--container--text--user">@${info.login.username}</h3>`;
    html += `<h1 class="js-name main__section--container--text--name">${info.name.first}</h1>`;
    html += `<h3 class="js-city main__section--container--text--city">${info.location.city}</h3>`;
  }
  arrayContainer.innerHTML = html;
  listenFriends();
}
//--FUNCIÓN DEL THEN QUE BUSCA LOS DATOS DE LA API Y LOS DEVUELVE--
const convertToJS = (response) => {
  return response.json();
};

//
// isFriend: false

fetch('https://randomuser.me/api/?results=10')
  .then(
    (response) =>
      //SI LA FUNCIÓN SOLO TIENE UN PARÁMETRO SE LE PUEDE QUITAR LOS PARÉNTESIS
      response.json() //SI EL RETURN SOLO TIENE UNA LÍNEA, SE PUEDEN QUITAR LLAVES Y EL RETURN
  )

  .then((data) => {
    allUsers = data.results;
    for (const friend of allUsers) {
      friend.isFriend = false;
    }

    paintUsers();
  });

function listenFriends(ev) {
  let userContainer = document.querySelectorAll('.js-container');
  for (const user of userContainer) {
    user.addEventListener('click', handleFriend);
  }
}

function handleFriend(event) {
  const selectedFriendId = event.currentTarget.id;
  const clickedFriend = allUsers.find((user) => {
    return user.login.uuid === selectedFriendId;
  });

  clickedFriend.isFriend = !clickedFriend.isFriend;

  console.log(allUsers);
  paintUsers();
  listenFriends();
}
