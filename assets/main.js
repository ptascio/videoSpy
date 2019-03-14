

var ips = [];
var thisSession = [];
var timeOfBrowserOpen;
var thisIp;
var thisUser;
function grabIP(){
  $.ajax({
    url: "https://api.ipify.org",
    success: function(result){
    thisIp = result;
    ips.push(thisIp);
  },
    error: function(err){
      console.log(err.statusText);
    }
}).then(function(){
  timeOfBrowserOpen = new Date();

  thisSession.push(timeOfBrowserOpen);
}).done(function(){
  checkCookies();
});
}

var todayDate = {};

var thisHour;
var thisMinutes;
var thisSeconds;
function getTime(){
  timeOfBrowserOpen = new Date();
  thisSession.push(timeOfBrowserOpen);
  todayDate.openedBrowser = timeOfBrowserOpen;
  thisHour = timeOfBrowserOpen.getHours();
  thisMinutes = timeOfBrowserOpen.getMinutes();
  thisSeconds = timeOfBrowserOpen.getSeconds();

}

// function watchForTimeChanges(){
//   var timeChange = setInterval(
//     parseSeconds, 1000
//   );
// }

var laterTime;
var laterHours;
var laterMinutes;
var laterSeconds;
function logTimePassed(){
  laterTime = new Date();
  laterHours = laterTime.getHours();
  laterMinutes = laterTime.getMinutes();
  laterSeconds = laterTime.getSeconds();
  if (laterMinutes === thisMinutes+1){
    console.log("a minute has passed");
  }
}

var countSeconds = 0;
var countMinutes = 0;
var timeLog = {};
function parseSeconds(){
  if(countSeconds < 9){
    countSeconds+=1;
  }else{
    countMinutes+=1;
    countSeconds = 0;
  }
  timeLog.seconds = countSeconds;
  timeLog.minutes = countMinutes;
  if(thisSession[1]){
    thisSession[1] = timeLog;
  }else{
    thisSession.push(timeLog);
  }

  console.log(thisSession);
}

grabIP();

var userCookie;
function setTimeOnBrowserOpen(){
  userCookie = localStorage.getItem(`${thisUser}`);
  userCookie = JSON.parse(userCookie);
  // userCookie.today = todayDate;
  currentUser.update(userCookie);
  localStorage.setItem(thisUser, JSON.stringify(userCookie));
}

// function grabTimeOnClose(){
//   userCookie.exit = new Date();
//   localStorage.setItem(thisUser, JSON.stringify(userCookie));
// }





// function getArtistName(){
//   console.log($("#artistName").val());
// }
//

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
$("#removeCookie").on("click", {param: "petesCookie"}, removeCookie);

var userExists = false;
function checkCookies(){
  var localKeys = Object.keys(localStorage);
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
    sessions: thisSession,
    ipAddresses: ips,
  };
  newUserEntry.set(newData, function(error){
    if (error){
      console.log(error);
    }
  });
  setCookie("petesCookie", newKey, thisIp);
}
var thisUserId;
var currentUser;
var dataSession;
//maybe better to do something like:
//.ref("/users").child(thisUserId).child("ipAddresses").push()
function retrieveUser(){
  console.log("retrieving");
  thisUserId = thisUser.split("petesCookie");
  thisUserId = thisUserId[1];
  currentUser = firebase.database().ref("/users").child(thisUserId);
  currentUser.on('value', function (snapshot){
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.key === "ipAddresses"){
          ips = childSnapshot.val();
          if(!ips.includes(thisIp)){
            ips.push(thisIp);
          }
      }else if (childSnapshot.key === "sessions"){
        dataSession = childSnapshot.val();
        thisSession = thisSession.concat(dataSession);
      }
    });
  });
  // setTimeOnBrowserOpen();
}

//how to parse dates:
//new Date(JSON.parse(JSON.stringify(date)));
//https://stackoverflow.com/questions/11491938/issues-with-date-when-using-json-stringify-and-json-parse
function updateCurrentUser(){
  console.log("update");
  firebase.database().ref("/users").child(thisUserId).update({
    sessions: thisSession,
    ipAddresses: ips
  });
}

function resetIp(){
  ips = [];
}
$("#button").on("click", resetIp);
$("#upDateUser").on("click", updateCurrentUser);
$("#findCookie").on("click", checkCookies);



window.addEventListener('unload', updateCurrentUser);
