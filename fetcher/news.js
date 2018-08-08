const request = require('request-promise')
const cheerio = require('cheerio')
const _ = require('lodash')
const {
  sendMail
} = require('./../mailer/mailer')


var gnpcNews = "http://gnpcghana.com/news.html"

var recheck = setInterval(checkHeadlines, 5000)

function checkHeadlines() {
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

      if (headlines[0] !== "21.07.18 - CALL FOR (LOCAL) POST GRADUATE SCHOLARSHIP APPLICATIONS : GNPC FOUNDATION" && (_.includes(headlines[0], "UNDER GRADUATE") && _.includes(headlines[0], "SCHOLARSHIP"))) {
        sendMail()
        clearInterval(recheck)
      }
    }).catch(e => console.log(e))
}

module.exports = {
  checkHeadlines
}
