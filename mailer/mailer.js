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
    subject: 'Scholarships Are Out',
    html: 'GNPC has released scholarships for all students'
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
      console.log(err)
  });
}


module.exports = {
  sendMail
}