const AuthenticateModel = require("../../models/user");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { response } = require("express");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

// Api to save the user data.
class AuthenticationController {
  async authenticationUserData(req, res, next) {
    const { username, email, password, phone } = req.body;
    try {
      const NewUser = new AuthenticateModel({
        username,
        email,
        password,
        phone,
      });

      const saved = await NewUser.save();
      res.send({ success: true, data: saved });
    } catch (error) {
      res.send(error);
    }
  }

  // Api to register/signUp.
  async authenticationSignUp(req, res) {
    const { username, password, email, phone } = req.body;

    try {
      // Check if the username already exists
      const existingUser = await AuthenticateModel.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      } else {
        bcrypt.genSalt(10, function (saltError, salt) {
          if (saltError) {
            return next(saltError);
          } else {
            bcrypt.hash(password, salt, function (hashError, hash) {
              if (hashError) {
                return next(hashError);
              }

              try {
                // user.password = hash
                const NewUser = new AuthenticateModel({
                  username,
                  email,
                  password: hash,
                  phone,
                });

                const newUserSaved = NewUser.save();
                res.send({ success: true, data: newUserSaved });
              } catch (err) {
                console.log(err);
                res.status(500).json({ message: "An error occured" });
              }
            });
          }
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    }
  }
// Api to sihnIn/logIn.
  async authenticationSignIn(req, res) {
    const { email, password } = req.body;

    try {
      // Find the user by username
      const user = await AuthenticateModel.findOne({ email });
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the password
      const passwordMatch = await bcrypt.compareSync(password, user.password);
      console.log(passwordMatch)

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        "Secret-Key",
        { expiresIn: "24h" }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    }
  }

  
}

class AuthenticationControllers {
  constructor() {
    this.authentication = new AuthenticationController();
    console.log("api failed");
  }
}

module.exports = AuthenticationControllers;
