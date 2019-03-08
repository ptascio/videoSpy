function getArtistName(){
  console.log($("#artistName").val());
}

$("#button").on("click", getArtistName);

const instance = axios.create({
  headers: {
    get: {
      "X-RapidAPI-Key": ""
    }
  }
});

instance.get("https://deezerdevs-deezer.p.rapidapi.com/search?q=thebeatles")
  .then(function (result) {
    console.log(result.data);
  });

  // function getCookie(c_name) {
  //     return localStorage.getItem(c_name);
  //

  function setCookie(cName, value, expiredays) {
      return localStorage.setItem(cName, value);
  }

  function getCookie(cName) {
    console.log(localStorage.getItem(cName));
}

function removeCookie(cName){
  localStorage.removeItem(cName);
  getCookie(cName);
}

  removeCookie("Pete's cookie");

  //GEThttps://api.vimeo.com/videos
