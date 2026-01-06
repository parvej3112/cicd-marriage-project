const express = require("express");
const router = express.Router();
const officeController = require("../controllers/officeController");
const { isAuthenticated, isAuthorized } = require("../middleware/auth");

// Only SuperAdmin (or Admin depending on your logic) can manage schools
router.post("/register", isAuthenticated, isAuthorized(["SuperAdmin"]), officeController.createOfficeAndAdmin);
router.get("/All", isAuthenticated, isAuthorized(["SuperAdmin"]), officeController.getAll);
router.get("/fetch/:id", isAuthenticated, isAuthorized(["SuperAdmin"]), officeController.getById);
router.put("/update/:id", isAuthenticated, isAuthorized(["SuperAdmin"]), officeController.updateById);
router.delete("/delete/:id", isAuthenticated, isAuthorized(["SuperAdmin"]), officeController.deleteById);

module.exports = router;
