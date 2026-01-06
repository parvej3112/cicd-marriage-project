const express=require ("express")
const router=express.Router();

const marriagecertificateController=require('../controllers/marriagecertificateController');
const {isAuthenticated, isAuthorized}=require("../middleware/auth")

router.post('/createCertificate',isAuthenticated,isAuthorized(["Admin"]) ,marriagecertificateController.register);
router.get("/All",isAuthenticated,isAuthorized(["Admin"]) ,marriagecertificateController.getAll)
router.get("/fetch/:id",isAuthenticated,isAuthorized(["Admin"],"MarriageCertificate") ,marriagecertificateController.getById)
router.get("/search/:name",isAuthenticated,isAuthorized(["Admin"]) ,marriagecertificateController.getByName)
router.put("/update/:id",isAuthenticated,isAuthorized(["Admin"],"MarriageCertificate") ,marriagecertificateController.updateById)
router.delete("/delete/:id",isAuthenticated,isAuthorized(["Admin"],"MarriageCertificate") ,marriagecertificateController.deleteById)

module.exports = router;