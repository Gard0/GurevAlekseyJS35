let button = document.getElementById('button');
let request = document.getElementById('request');
let data = document.getElementById('data');
let urlWindows = window.location.search;
let loader = document.getElementById("loader");
let user = document.getElementById('user');
let url = document.getElementById('url');
let imageAvatar = document.getElementById('imageAvatar');
let description = document.getElementById('description');
let img = document.getElementById('img');
let labelData = document.getElementById('labelData')
let labelDescription = document.getElementById('labelDescription')
let labelUser = document.getElementById('labelUser')
let searchContainer = document.getElementById('searchContainer')

function clickButton (){
  hidden ();
  preloader();
  let dataCurrent = new Date().toLocaleDateString();
  let getData = new Promise ((resolve, reject) => {
    setTimeout(() => dataCurrent ? resolve(dataCurrent) : reject ('дата не определена'), 3000 )
  }); 
  
  let getName = new Promise ((resolve, reject) => {
    setTimeout(() => request ? resolve(request) : reject ('имя не найдено'), 2000)
  });
  
  Promise.all ([getName,getData])
    .then (([request,dataCurrent]) => github(request,dataCurrent))
    .catch(err => log(err)); 
}

function preloader () {
  searchContainer.classList.add('search-container');
  loader.classList.remove('hidden');
  setTimeout(function() {
    loader.classList.add('hidden');
    searchContainer.classList.remove('search-container');
  }, 3000);
}

function hidden () {
  user.classList.add('hidden')
  labelUser.classList.add('hidden')
  imageAvatar.classList.add('hidden')
  description.classList.add('hidden')
  labelDescription.classList.add('hidden')
  url.classList.add('hidden')
  data.classList.add('hidden')
  labelData.classList.add('hidden')
}


function github(request,dataCurrent) {
  fetch(`https://api.github.com/users/${request.value}`)
    .then(res => res.json())
    .then(json => {
      if (json.login != null) {
        user.value = json.name;
        user.classList.remove('hidden')
        labelUser.classList.remove('hidden')

        description.value = json.bio;
        description.classList.remove('hidden')
        labelDescription.classList.remove('hidden')

        img.src = json.avatar_url;
        imageAvatar.classList.remove('hidden')

        url.href = json.html_url;
        url.classList.remove('hidden')

        data.value = dataCurrent;
        data.classList.remove('hidden')
        labelData.classList.remove('hidden')

      } else {
        user.value = 'Информация о пользователе не доступна'
        user.classList.remove('hidden')
        labelUser.classList.add('hidden')
        user.classList.add('red')
        imageAvatar.classList.add('hidden')
        description.classList.add('hidden')
        labelDescription.classList.add('hidden')
        url.classList.add('hidden')
        data.classList.add('hidden')
        labelData.classList.add('hidden')

        setTimeout(function() {
          document.location.reload();   
        }, 4000);
      }
    })
    .catch(err => console.log(err +' '+ 'Информация о пользователе не доступна'));
}

if (urlWindows !=""){
  request.value = urlWindows.split("=")[1];
  clickButton();
}

button.addEventListener('click',clickButton);

