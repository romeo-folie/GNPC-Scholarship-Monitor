const request = require('request-promise')
const cheerio = require('cheerio')
const _ = require('lodash');

var gnpcNews = "http://gnpcghana.com/news.html"

//Put the request process in it's own function. Then call setInterval on it everytime we need it.

const options = {
  uri: gnpcNews,
  transform: function(body) {
    return cheerio.load(body)
  }
}

request(options)
  .then(($) => {
    const headlines = $('tbody tr td').children().find('a.bodytext5b').toArray().map(function(x) {
      return $(x).text().trim()
    })

    //so basically, what we are going to do is to check if the last headline on the list is
    //what we have here. If it is, we'll move on and check again after like an hour
    if (headlines[0] === "21.07.18 - CALL FOR (LOCAL) POST GRADUATE SCHOLARSHIP APPLICATIONS : GNPC FOUNDATION") {
      //we'll just chill, smoke some weed and check again in like a day
      console.log("Well it's the same old news. Pay your own fees motherfucker")
    }
    //The real magic happens when the headline isn't what we have in our list
    //we first check if the date side contains 18
    else {
      //There's a new headline. Now let's check if it contains our keywords
      if (_.includes(headlines[0], "UNDERGRADUATE") && _.includes(headlines[0], "SCHOLARSHIP")) {
        //call function that sends mail to all users in the database
        console.log("Congratulations motherfucker")
      }
      //If it doesn't contain any of our keywords
      //well we'll smoke some more weed and try again later
      else {
        console.log("Nigga, pay your own damn fees!")
      }
    }
  }).catch(e => console.log(e))
