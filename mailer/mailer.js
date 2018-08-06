const nodemailer = require('nodemailer');

//we're receiving an array from the database
var testarray = [{name: "somethin",email:"romeofolie1@gmail.com"},{name:"something else",email:"ethelfolie@gmail.com"},{name:"kwasi", email:"romeofolie@yahoo.com"}]
var mailList = testarray.map(x => x.email)


const mailer = (recepientList) => {
  var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
          user: 'gnpcscholarshipapp@gmail.com',
          pass: 'scholarshipapppass'
      }
  });


  const mailOptions = {
    from: 'Scholarship App',
    to: recepientList,
    subject: 'Scholarships Are Out',
    html: 'GNPC has released scholarships for all students'
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });

}

mailer(mailList)
