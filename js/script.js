let button = document.getElementById('button');
let request = document.getElementById('request');
let urlWindows = window.location.search;

function clickButton (){
  github(request)
}

function github(request) {
  let user = document.getElementById('user');
  let url = document.getElementById('url');
  let imageAvatar = document.getElementById('imageAvatar');
  let description = document.getElementById('description');
  let img = document.getElementById('img');
  fetch(`https://api.github.com/users/${request.value}`)
    .then(res => res.json())
    .then(json => {
      if (json.login != null) {
        user.value = json.name;
        user.classList.remove('hidden')

        description.value = json.bio;
        description.classList.remove('hidden')

        img.src = json.avatar_url;
        imageAvatar.classList.remove('hidden')

        url.href = json.html_url;
        url.classList.remove('hidden')

      } else {
        user.value = 'Информация о пользователе не доступна'
        user.classList.remove('hidden')
        user.classList.add('red')
        imageAvatar.classList.add('hidden')
        description.classList.add('hidden')
        url.classList.add('hidden')

        setTimeout(function() {
          document.location.reload();   
        }, 2000);
      }
    })
    .catch(err => console.log(err +' '+ 'Информация о пользователе не доступна'));
}

if (urlWindows !=""){
  request.value = urlWindows.slice(10);
  clickButton();
}

button.addEventListener('click',clickButton);

