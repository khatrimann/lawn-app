
let nodemailer = require('nodemailer');
const config = require('../config');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: config.email,
           pass: config.password
       }
});


module.exports.sendVerificationMail = (user, verficationToken) => {
    let mailOptions = {
        from : 'Lawn Application',
        to: user.email,
        subject: 'Account Verification for '+ user.email + 'on Lawn Application',
        text : 'Please verify your email address',
        html: `<div> Hi ${user.name} , Please <a href="http://localhost:4200/users/verifyUser?token=${user.activationToken}"> click </a> here to verify your account on Job Portal  `
    }

}

module.exports.sendPasswordResetMail = (user, resetToken) =>{

}

function sendmail(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}
