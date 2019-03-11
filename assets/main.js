


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

var rightNow;
function getTime(){
  rightNow = new Date();
  var thisHour = rightNow.getHours();
  var thisMinutes = rightNow.getMinutes();
  var thisSeconds = rightNow.getSeconds();
  console.log(rightNow);
  console.log(thisHour + " " + thisMinutes + " " + thisSeconds);
}

grabIP();
getTime();

function setTimeOnCookie(){
  [`${thisUser}`].startTime = rightNow;
  console.log(thisUser);

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


function setCookie(cName, id, value, expiredays) {
    cName += " " + id;
    var cookieHash = {"ip": value};
    return localStorage.setItem(cName, cookieHash);
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
  for(var i = 0; i < localKeys.length; i++){
    if(localKeys[i].includes("pete")){
      userExists = true;
      thisUser = localKeys[i];
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

function retrieveUser(){
  var thisUserId = thisUser.split(" ");
  thisUserId = thisUserId[1];
  var user = firebase.database().ref("/users").child(thisUserId);
  thisUser = user;
  user.on('value', function (snapshot){
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot.val());
    });
  });
  setTimeOnCookie();
}
$("#findCookie").on("click", checkCookies);

$("#removeCookie").on("click", {param: "petesCookie"}, removeCookie);
