const {Router} = require("express");
const courseRouter = Router();

const {purchaseModel,courseModel} = require("../db")
const {userMiddleware} = require("../middleware/user")


courseRouter.post("/purchase", async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId
  })
  res.json({
    message: "You have successfully  purchased the course",
  });
});
courseRouter.get("/preview", async (req, res) => {
  const courses = await courseModel.find({});

  res.json({
    message: "Courses fetched successfully",
    courses
  });
});
module.exports = {
    courseRouter:courseRouter
}