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

// async passwordChange(req,res){
//       try {
//         const { username, currentPassword, newPassword } = req.body;
    
//         // Check if the username and passwords are provided
//         if (!username || !currentPassword || !newPassword) {
//           return res.status(400).json({ error: 'Missing required fields' });
//         }
    
//         const hashedPassword = '$2b$10$ruFBVNdRJPmebvlq3NlZ8.44L0PDfOY2h/wFdLoVtiBz3imZj5hKu';
    
//         const isPasswordMatch = await bcrypt.compare(currentPassword, hashedPassword);
    
//         if (!isPasswordMatch) {
//           return res.status(401).json({ error: 'Invalid current password' });
//         }
    
//         const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//         return res.json({ message: 'Password changed successfully' });

//         res.send({message:true,data:hashedNewPassword});

//       } catch (error) {

//         console.error('Error:', error);
//         res.status(500).json({ error: 'An internal server error occurred' });
//       }
//     }
  }


class ProfileControllers {
    constructor() {
      this.profile = new ProfileController();
      console.log("api failed");
    }
  }
  
  module.exports = ProfileControllers;
  