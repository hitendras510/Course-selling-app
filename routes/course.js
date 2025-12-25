const {Router} = require("express");
const courseRouter = Router();


courseRouter.post("/purchase", (req, res) => {
  res.json({
    message: "User purchase successfully",
  });
});
courseRouter.get("/courses", (req, res) => {
  res.json({
    message: "Courses fetched successfully",
  });
});
module.exports = {
    courseRouter:courseRouter
}