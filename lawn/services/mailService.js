let nodemailer = require('nodemailer');
const config = require('../config');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: config.email,
           pass: config.password
       }
});


module.exports.sendVerificationMail = (res, email, user, verficationToken) => {
    let mailOptions = {
        from : 'Lawn Application',
        to: email,
        subject: 'Account Verification for '+ user.email + 'on Lawn Application',
        text : 'Please verify your email address',
        html: `<div> Hi ${user.name} , Please <a href="http://localhost:4200/verifyUser?token=${verficationToken}"> click </a> here to verify your account on Job Portal  `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.json({success: true, status: 'Registration Successful!',isVerified: false});
        console.log('Message sent: ' + info.response);
    });
};

module.exports.sendPasswordResetMail = (user) =>{
    let mailOptions = {
        from : 'Lawn Application',
        to: user.email,
        subject: 'Account Verification for '+ user.email + 'on Lawn Application',
        text : 'Please verify your email address',
        html: `<div> Hi ${user.name} , Please <a href="http://localhost:4200/resetPassword/verifyUser?token=${user.resetToken}&email=${user.email}"> click </a> here to verify your account on Job Portal  `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!',isVerified: false});
        console.log('Message sent: ' + info.response);
    }); 
};

function sendmail(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
    });
}
