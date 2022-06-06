
const express = require("express");
const { upload } = require('../../utils/cloudinary/cloudinary');
const router = express.Router();
const auth = require('../../middleware/authMiddleware')
const profileController = require("../../controller/profileController");

router.post("/create-profile",auth, upload.single('idProof'), profileController.createUserProfile);
router.post("/create-admin-profile",auth, upload.single('idProof'), profileController.createAdminProfile);
router.get("/get-hostels", profileController.getHostels);
router.get("/get-departments", profileController.getDepartments);
router.post("/add-project-guide",auth, profileController.addProjectGuide);

module.exports = router;