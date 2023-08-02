const express = require('express');
const ProfileModel=require("../../models/user");

class ProfileController{

    async profileUpdate(req, res, next) {
        try {
          const { id, username ,email,phone} = req.body;
          const updated = await ProfileModel.findOneAndUpdate(
            { _id: id },
            { username, email,phone},
          );
          res.send({ success: true, data: updated });
          console.log("ID", updated);

    
        } catch (err) {
          console.log("ERROR", err);
          res.send(err);
        }
      }
  
      // update user password
      async UpdatePassword(req,res){
        try{
          const user_id=req.body;
          const password=req.body;
            
          const data=await ProfileModel.findONe({_id:user_id});

          if(data){
            const newPassword=await securePassword(password);

            const userData=await ProfileModel.findByIdAndUpdate({_id:user_id},{$set:{
              password:newPassword,
            }});

            res.send({success:true,message:"Password successfully updated"});
            res.send({success:true,data:userData});
          console.log("Password successfully updated");

          }
          else{
            res.send({success:false,message:"user id not found"});
          console.log("User id not found");

          }
        } catch(err){
          res.send({success:false,message:"Error h kahin to!!"});
          console.log("ERROR");
        }
      }

// Forgot password
async  (req, res) {
  const { email } = req.body;
  // Here, you can validate the email address or perform other necessary checks

  // Generate a password reset token (you can use a library like `crypto` or `uuid` for this)
  const resetToken = generateResetToken();

  // Save the reset token and its expiration date in your user database or storage

  // Compose the email
  const emailContent = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Password Reset',
    text: `To reset your password, click on the following link: ${process.env.BASE_URL}/reset-password?token=${resetToken}`,
  };

  // Configure the email service provider (e.g., SMTP)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Send the email
  transporter.sendMail(emailContent, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send reset email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Reset email sent successfully' });
    }
  });
}; 

  }


class ProfileControllers {
    constructor() {
      this.profile = new ProfileController();
      console.log("api failed");
    }
  }
  
  module.exports = ProfileControllers;
  