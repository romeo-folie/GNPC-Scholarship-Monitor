require('./../config/config')
const nodemailer = require('nodemailer');
const {
  mongoose
} = require('./../db/mongoose')
const {
  User
} = require('./../model/user')


//Fetch the emails from the database and add them all to the mail list.
const sendMail = async() => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gnpcscholarshipapp@gmail.com',
      pass: 'scholarshipapppass'
    }
  });

  const user = await User.find({})
  let recepientList = user.map(x => x.email)

  const mailOptions = {
    from: 'Scholarship App',
    to: recepientList,
    subject: 'GNPC Scholarships',
    html: 'GNPC has announced the call for Under Graduate Scholarship applications. Follow the link below for more information \nhttp://gnpcghana.com/news.html'
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
      console.log(err)
    else
      console.log(info)
  });
}


module.exports = {
  sendMail
}
