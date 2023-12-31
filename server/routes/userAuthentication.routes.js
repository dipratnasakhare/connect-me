const express = require("express");
const UserAuthRoutes = express.Router();

// Model import for adding user
const { ModelUserAuth } = require("../models/userAuthentication.model");

const bcrypt = require("bcrypt"); // Bcript import for password protect
const jwt = require("jsonwebtoken"); // jwt import for geting unic token

UserAuthRoutes.get("/", async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  try {
    let length = await ModelUserAuth.find({ userType: "Client" });

    let allUser = await ModelUserAuth.find({ userType: "Client" })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.send({ allUser, totalPages: Math.ceil(length.length / limit) });
  } catch (err) {
    console.log(err, "err line 20");
    res
      .status(200)
      .send({ msg: "Something went wrong please try again", status: "error" });
  }
});

UserAuthRoutes.post("/google", async (req, res) => {
  const email = req.body.email;

  console.log(req.body, "req .......... .. .. .");

  // try {
  //   const arr = await ModelUserAuth.find({email});

  //   const obj = {
  //     userId:arr[0].userId,
  //     user:true
  //   }

  //   if(arr.length >= 1){
  //     res.send(obj)
  //   }else{
  //     obj.user = false
  //     res.send(obj)
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
});

UserAuthRoutes.get("/:id", async (req, res) => {
  try {
    const user = await ModelUserAuth.find({ userId: req.params.id });
    res.status(200).json(user[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

UserAuthRoutes.post("/delete", async (req, res) => {
  const { UserId } = req.body;
  try {
    let All_User = await ModelUserAuth.findOneAndRemove({ UserId });
    res.status(200).send({ msg: "User has been deleted", status: "success" });
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .send({ msg: "Something went wrong please try again", status: "error" });
  }
});

UserAuthRoutes.post("/register", async (req, res) => {
  req.body.userType = "Client";
  req.body.userId = "";
  req.body.profilePicture = "";
  req.body.coverPicture = "";
  req.body.followers = [];
  req.body.followings = [];

  const UserDetails = req.body;
  const { email, password } = UserDetails;
  const unic = process.env.REGISTER_UNIC_KEY;

  try {
    let Single_User = await ModelUserAuth.find({ email });

    if (Single_User.length !== 0) {
      return res
        .status(200)
        .send({ msg: "User already exists", status: "error" });
    } else {
      bcrypt.hash(password, 8, async (err, protected_password) => {
        if (!err) {
          UserDetails.password = protected_password;
          const UserId = jwt.sign({ email, id: password }, unic);
          UserDetails.userId = UserId;
          let NewUser = new ModelUserAuth(UserDetails);
          NewUser.save();

          console.log(NewUser, "pppppppp");

          res
            .status(200)
            .send({ msg: "User has been created", status: "success" });
        } else {
          console.log(err);
          res.status(200).send({
            msg: "Something went wrong please try again",
            status: "error",
          });
        }
      });
    }
  } catch (err) {
    console.log(err, "err line 50");
    res
      .status(200)
      .send({ msg: "Something went wrong please try again", status: "error" });
  }
});

UserAuthRoutes.post("/login", async (req, res) => {
  const UserDetails = req.body;

  console.log("login");

  const { email, password } = UserDetails;
  const Key = process.env.LOGIN_UNIC_KEY;
  try {
    let User_Details = await ModelUserAuth.find({ email });
    if (User_Details.length > 0) {
      if (User_Details[0].userType == "Client") {
        bcrypt.compare(
          password,
          User_Details[0].password,
          async (err, result) => {
            if (result) {
              const token = jwt.sign({ email, id: password }, Key);
              res.status(200).send({
                msg: "User login successfully",
                userId: User_Details[0].userId,
                userName: User_Details[0].userName,
                token,
                status: "success",
              });
            } else {
              res.status(200).send({ msg: "Wrong password", status: "error" });
            }
            if (err) {
              res.status(200).send({
                msg: "Something went wrong please try again",
                status: "error",
              });
            }
          }
        );
      } else {
        bcrypt.compare(
          password,
          User_Details[0].password,
          async (err, result) => {
            if (result) {
              const token = jwt.sign({ email, id: password }, Key);
              res.status(200).send({
                msg: "Admin login successfully",
                // userId: User_Details[0].userId,
                // name: User_Details[0].first_name,
                // last: User_Details[0].last_name,
                // mobile: User_Details[0].mobile_no,
                token,
                status: "success",
              });
            } else {
              res.status(200).send({ msg: "Wrong password", status: "error" });
            }
            if (err) {
              res.status(200).send({
                msg: "Something went wrong please try again",
                err,
                status: "error",
              });
            }
          }
        );
      }
    } else {
      res.status(200).send({ msg: "User not found", status: "error" });
    }
  } catch (err) {
    console.log(err, "err line 98");
    res.status(200).send({
      msg: "Something went wrong please try again",
      err,
      status: "error",
    });
  }
});

UserAuthRoutes.post("/changepass", async (req, res) => {
  const email = req.body.email;
  try {
    let User_Details = await ModelUserAuth.find({ email });

    console.log(User_Details, email);
    if (User_Details.length > 0) {
      res
        .status(200)
        .send({ msg: "User is found", status: "success", userPresent: true });
    } else {
      res.status(200).send({
        msg: "User doesn't exist",
        status: "error",
        userPresent: false,
      });
    }
  } catch (err) {
    console.log(err.message);
    res
      .status(200)
      .send({ msg: "Something went wrong please try again", status: "error" });
  }
});

UserAuthRoutes.patch("/setpass", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const data = await ModelUserAuth.find({ email });
    if (data.length > 0) {
      bcrypt.hash(password, 8, async (err, protected_password) => {
        if (err) {
          console.log(err);
        } else {
          await ModelUserAuth.updateOne(
            { email },
            { password: protected_password }
          );
          res.status(200).send({
            msg: "User password has been changed successfully",
            status: "success",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .send({ msg: "Something went wrong please try again", status: "error" });
  }
});

UserAuthRoutes.get("/:id", async (req, res) => {
  console.log("ssssssssss", req.params);
  try {
    const user = await ModelUserAuth.findById({ _id: req.params.id });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { UserAuthRoutes };
