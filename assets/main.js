


var thisIp;
var thisUser;
function grabIP(){
  $.ajax({
    url: "https://api.ipify.org",
    success: function(result){
    thisIp = result;
  },
    error: function(err){
      console.log(err.statusText);
    }
}).done(function(){
  checkCookies();
});
}

var todayDate;
function getTime(){
  todayDate = new Date();
  var thisHour = todayDate.getHours();
  var thisMinutes = todayDate.getMinutes();
  var thisSeconds = todayDate.getSeconds();
}

grabIP();
getTime();
var userCookie;
function setTimeOnCookie(){
  userCookie = localStorage.getItem(`${thisUser}`);
  userCookie = JSON.parse(userCookie);
  userCookie.today = todayDate;
  currentUser.update(userCookie);
  localStorage.setItem(thisUser, JSON.stringify(userCookie));
}

function grabTimeOnClose(){
  userCookie.exit = new Date();
  localStorage.setItem(thisUser, JSON.stringify(userCookie));
}





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


//
// console.log('retrievedObject: ', JSON.parse(retrievedObject));
function setCookie(cName, id, value, expiredays) {
    cName += id;
    var cookieHash = {"ip": `${value}`};
    return localStorage.setItem(cName, JSON.stringify(cookieHash));
  }

function getCookie(cName) {
    localStorage.getItem(cName);
}

function removeCookie(e){
  var localKeys = Object.keys(localStorage);
  for(var i = 0; i < localKeys.length; i++){
    if(localKeys[i].includes(e.data.param)){
      localStorage.removeItem(localKeys[i]);
      break;
    }
  }
}

var userExists = false;
function checkCookies(){
  var localKeys = Object.keys(localStorage);
  console.log(localKeys);
  for(var i = 0; i < localKeys.length; i++){
    if(localKeys[i].includes("pete")){
      userExists = true;
      thisUser = localKeys[i];
      break;
    }
  }
  if (!userExists){
      setUser();
  }else{
    retrieveUser();
  }
}

function setUser(){
  var newUserEntry = firebase.database().ref("/users").push();
  var newKey = newUserEntry.key;
  var newData = {
    id: newKey,
    ip: thisIp
  };
  newUserEntry.set(newData);
  setCookie("petesCookie", newKey, thisIp);
}
var thisUserId;
var currentUser;
function retrieveUser(){
  thisUserId = thisUser.split("petesCookie");
  thisUserId = thisUserId[1];
  currentUser = firebase.database().ref("/users").child(thisUserId);
  console.log(currentUser);
  currentUser.on('value', function (snapshot){
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot);
    });
  });
  setTimeOnCookie();
}
$("#findCookie").on("click", checkCookies);

$("#removeCookie").on("click", {param: "petesCookie"}, removeCookie);

window.addEventListener('unload', grabTimeOnClose);
