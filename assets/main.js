

var ips = [];
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
}).done(function(){
  checkCookies();
});
}
var thisSession = [];
var todayDate = {};
var timeOfBrowserOpen;
var thisHour;
var thisMinutes;
var thisSeconds;
function getTime(){
  timeOfBrowserOpen = new Date();
  todayDate.openedBrowser = timeOfBrowserOpen;
  thisHour = timeOfBrowserOpen.getHours();
  thisMinutes = timeOfBrowserOpen.getMinutes();
  thisSeconds = timeOfBrowserOpen.getSeconds();
  thisSession.push(todayDate);
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
getTime();
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
    ipAddresses: ips,
    sessions: thisSession
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
  currentUser.on('value', function (snapshot){
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.key === "ipAddresses"){
          ips.concat(childSnapshot.val());
          console.log("ips "+ips);
      }else if (childSnapshot.key === "sessions"){
        thisSession.concat(childSnapshot.val());
        console.log("thisSession "+thisSession);
      }
    });
  });
  // setTimeOnBrowserOpen();
}
$("#findCookie").on("click", checkCookies);



// window.addEventListener('unload', grabTimeOnClose);
