var thisIp;
function grabIP(){
  $.ajax({
    url: "https://api.ipify.org",
    success: function(result){
    console.log(result);
  },
    error: function(err){
      console.log(err.statusText);
    }
});
}

function grabLocalStorage(){
  console.log(localStorage);
}

grabLocalStorage();

function signIn(email, password){
  firebase.auth().signInWithEmailAndPassword(email, password).
  then(function(response){
    console.log(response);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
    // ...
  });
}

// database.ref.child("users").orderByKey().limitToLast(1);
  // database.ref("/employees").push().set({
  //   name: empName,
  //   role: empRole,
  //   startDate: empStartDate,
  //   monthlyRate: empMonthlyRate
  // });

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
// firebase.auth().signOut();
function showFormData(e){
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();
  // firebase.auth().signInWithEmailAndPassword(email, password).
  // then(function(response){
  //   console.log(response);
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   console.log(error);
  //   // ...
  // });
  signIn(email, password);
}

$("#submit").on("click", showFormData);

  function setCookie(cName, id, value, expiredays) {
    cName += " " + id;
    return localStorage.setItem(cName, value);

  }

  function getCookie(cName) {
    localStorage.getItem(cName);
}

function removeCookie(e){
  localStorage.removeItem(e.data.param);
}

function checkCookies(){
  var localKeys = Object.keys(localStorage);
  for(var i = 0; i < localKeys.length; i++){
    console.log(localKeys[i].includes("pete"));
  }
}

$("#findCookie").on("click", checkCookies);

setCookie("petesCookie", "L-zs45", "yo");

// if (localStorage.getItem("petesCookie") === null){
//   setCookie("petesCookie", "This is my cookie");
// }else{
//   getCookie("petesCookie");
// }

$("#removeCookie").on("click", {param: "petesCookie"}, removeCookie);
