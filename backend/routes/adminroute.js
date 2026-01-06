const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {isAuthenticated,isAuthorized}= require("../middleware/auth");

router.post("/register",isAuthenticated,isAuthorized(["Admin"]) ,adminController.register);
router.post("/login",adminController.login);
router.post("/logout",isAuthenticated,adminController.logout)
router.post("/forgetPassword",adminController.forgetPassword)
router.post("/resetPassword",adminController.resetPassword)
router.get("/All",isAuthenticated,isAuthorized(["Admin"]) ,adminController.getAll)
router.get("/fetch/:id",isAuthenticated,isAuthorized(["Admin"],"Admin") ,adminController.getById)
router.put("/update/:id",isAuthenticated,isAuthorized(["Admin"],"Admin") ,adminController.updateById)
router.delete("/delete/:id",isAuthenticated,isAuthorized(["Admin"],"Admin") ,adminController.deleteById)

module.exports = router;
