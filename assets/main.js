

const instance = axios.create({
  headers: {
    get: {
      "X-RapidAPI-Key": ""
    }
  }
});

instance.get("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem")
  .then(function (result) {
    console.log(result.data);
  });

  //GEThttps://api.vimeo.com/videos
