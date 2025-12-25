const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  res.json({
    message: "User signed up successfully",
  });
});
userRouter.post("/signin", (req, res) => {
  res.json({
    message: "User signed in successfully",
  });
});
userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "User purchases successfully",
  });
});
module.exports = {
    userRouter:userRouter
}