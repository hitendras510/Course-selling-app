const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
const { courseModel } = require("../db");
const { purchaseModel } = require("../db");

adminRouter.post("/signup", (req, res) => {
    res.json({
        message: "Admin signed up successfully",
    });
});

adminRouter.post("/signin", async (req, res) => {
    const {email,password}  = req.body;
    
    const admin = await adminModel.findOne({
    email,
    password:bcrypt.hashSync(password,10)
    })
    if(!admin){
      return res.status(400).json({
        message:"Invalid credentials"
      })
    }else if(admin){
     const token = jwt.sign({
      id: admin._id
     },JWT_ADMIN_PASSWORD);
     res.json({
      token
    })
    }else{
      res.status(400).json({
        message:"Invalid credentials"
      })
    }
    res.json({
        message: "Admin signed in successfully",
    });
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const { title, description,imageUrl, price } = req.body;

    const course = await courseModel.create({
        adminId,
        title,
        description,
        imageUrl,
        price,
        creatorId:adminId
    })
    res.json({
        message: "Course created successfully",
    });
});

adminRouter.put("/course", adminMiddleware, async(req, res) => {
const adminId = req.userId;

const { title, description, imageUrl , price, courseId } = req.body;

const course = await courseModel.updateOne({
    _id:courseId,
    creatorId:adminId 
},{
    title,
    description,
    imageUrl,
    price
})
    res.json({
        message: "Course updated successfully",
    });
});
adminRouter.get("/course/detail", adminMiddleware, async(req, res) => {
    const adminId = req.userId;
    const courses = await courseModel.find({creatorId:adminId});
    res.json({
        message:"Courses fetched successfully",
        courses
    });
});

adminRouter.get("/course/purchase", adminMiddleware, async(req, res) => {
    const adminId = req.userId;
    const purchases = await purchaseModel.find({creatorId:adminId});
    res.json({
        message:"Purchases fetched successfully",
        purchases
    });
});

module.exports = {
    adminRouter:adminRouter
}