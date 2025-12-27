const { Router } = require("express");
const { userModel } = require("../db");
const { z } = require("zod");
//ZOD-> to validate user input.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel } = require("../db");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
 const {email,password,firstName,lastName } = req.body;
 const userSchema = z.object({
  email:z.string().email(),
  password:z.string().min(8),
  firstName:z.string(),
  lastName:z.string()
 })

 const validateUser = userSchema.safeParse(req.body);
 try {
  await userModel.create({
    email,
    password:bcrypt.hashSync(password,10),
    firstName,
    lastName
  })
 } catch (error) {
  return res.status(500).json({
    message:error.message
  })
 }
  res.json({
    message: "User signed up successfully",
  });
});

userRouter.post("/signin", async (req, res) => {
const {email,password}  = req.body;

const user = await userModel.findOne({
email,
password:bcrypt.hashSync(password,10)
})
if(!user){
  return res.status(400).json({
    message:"Invalid credentials"
  })
}else if(user){
 const token = jwt.sign({
  id: user._id
 },JWT_USER_PASSWORD);
 res.json({
  token
})
}else{
  res.status(400).json({
    message:"Invalid credentials"
  })
}
});

userRouter.get("/purchases", (req, res) => {

  res.json({
    message: "User purchases successfully",
  });
});
module.exports = {
    userRouter:userRouter
}