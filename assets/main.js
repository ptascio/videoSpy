// function getArtistName(){
//   console.log($("#artistName").val());
// }
//
// $("#button").on("click", getArtistName);
//
// const instance = axios.create({
//   headers: {
//     get: {
//       "X-RapidAPI-Key": ""
//     }
//   }
// });
//
// instance.get("https://deezerdevs-deezer.p.rapidapi.com/search?q=thebeatles")
//   .then(function (result) {
//     console.log(result.data);
//   });

  function setCookie(cName, value, expiredays) {
      return localStorage.setItem(cName, value);
  }

  function getCookie(cName) {
    console.log(localStorage.getItem(cName));
}

function removeCookie(e){
  console.log(e.data.param);
  localStorage.removeItem(e.data.param);
}

if (localStorage.getItem("Pete's cookie") === null){
  setCookie("Pete's cookie", "This is my cookie");
}else{
  getCookie("Pete's cookie");
}

$("#removeCookie").on("click", {param: "Pete's cookie"}, removeCookie);
