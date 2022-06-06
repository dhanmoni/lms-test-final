const express = require("express");
const router = express.Router();
const systemAdminAuth = require('../../middleware/systemAdminAuth')
const adminAuth = require('../../middleware/adminAuthMiddleware')
const adminController = require("../../controller/adminController");


// :5000/api/admin/...
// routes only accessed by system admin
router.post("/add-hostel", systemAdminAuth, adminController.addHostel);
router.post("/add-department", systemAdminAuth, adminController.addDepartment);
router.post("/approve-user-admin", systemAdminAuth, adminController.approveUserAdmin);
router.post("/reject-user-admin", systemAdminAuth, adminController.rejectUserAdmin);
router.post("/approve-guide-admin", systemAdminAuth, adminController.approveGuideAdmin);
router.get("/admins", systemAdminAuth, adminController.getAllAdmins);

//routes accessed by normal admin as well as system admin
router.post("/approve-user-student", adminAuth, adminController.approveUserStudent);
router.post("/approve-user-profile-update", adminAuth, adminController.approveUserProfileUpdate);
router.post("/reject-user-student", adminAuth, adminController.rejectUserStudent);

module.exports = router;