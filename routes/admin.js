const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/singup", (req, res) => {
    res.json({
        message: "Admin signed up successfully",
    });
});

adminRouter.post("/signin", (req, res) => {
    res.json({
        message: "Admin signed in successfully",
    });
});

adminRouter.post("/course", (req, res) => {
    res.json({
        message: "Admin signed in successfully",
    });
});
adminRouter.put("/course", (req, res) => {
    res.json({
        message: "Admin signed in successfully",
    });
});
adminRouter.get("/course/detail", (req, res) => {
    res.json({
        message: "Admin signed in successfully",
    });
});

module.exports = {
    adminRouter:adminRouter
}