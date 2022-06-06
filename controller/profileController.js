const User = require("../models/User");
const Hostel = require("../models/Hostel");
const Department = require("../models/Department");
const cloudinary = require("cloudinary").v2;
const { deleteFile } = require("../utils/cloudinary/cloudinary");

exports.createUserProfile = async (req, res) => {
  console.log('creating profile..', req.file.path)
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const { name, email, phone, hostel, department, publicKey, localGuardian, roll } = req.body;
    
    if (!publicKey) {
      return res.status(400).json({ error: "Request should have publicKey" });
    }

    // console.log(req.user.publicKey);
    // console.log({ publicKey, name, email, phone, department, hostel });
    return User.findOne({ publicKey })
      .then((user) => {
        if (!user) {
          res.status(400).json({ errors: "user doesnot exists" });
          return null;
        }
        User.findOneAndUpdate(
          { publicKey },
          {
            $set: {
              name,
              email,
              phone,
              roll,
              hostel: JSON.parse(hostel),
              department: JSON.parse(department),
              localGuardian: JSON.parse(localGuardian),
              idProof: result.secure_url,
            },
          },
          { new: true }
        ).then((s) => {
          if (result.secure_url) {
            deleteFile(req.file.filename);
          }
          console.log(s)
          res.json(s);
        });
      })
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    console.log("error occured");
  }
};

exports.createAdminProfile = async (req, res) => {
  console.log('creating amdin profile')
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const { name, email, phone, role, publicKey } = req.body;
    if (!publicKey) {
      return res.status(400).json({ error: "Request should have publicKey" });
    }

    console.log({ publicKey, name, email, phone, role });
    return User.findOne({ publicKey })
      .then((user) => {
        if (!user) {
          res.status(400).json({ errors: "user doesnot exists" });
          return null;
        }
        let newValue;
        if (role === "HOD") {
          console.log("hod profile");
          newValue = {
            name,
            email,
            phone,
            roles: role,
            department: JSON.parse(req.body.department),
            idProof: result.secure_url,
          };
        } else if (role === "WARDEN") {
          console.log("warden profile");
          newValue = {
            name,
            email,
            phone,
            roles: role,
            hostel: JSON.parse(req.body.hostel),
            idProof: result.secure_url,
          };
        } else if (role === "PROJECT_GUIDE") {
          console.log("project guide profile");
          newValue = {
            name,
            email,
            phone,
            roles: role,
            department: JSON.parse(req.body.department),
            idProof: result.secure_url,
          };
        } else if (role === "LOCAL_GUARDIAN") {
          console.log("local guardian profile");
          newValue = {
            name,
            email,
            phone,
            roles: role,
            idProof: result.secure_url,
          };
        }
        console.log({ newValue });
        User.findOneAndUpdate(
          { publicKey },
          { $set: newValue },
          { new: true }
        ).then((s) => {
          if (result.secure_url) {
            deleteFile(req.file.filename);
          }
          res.json(s);
        });
      })
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    console.log("error occured");
  }
};

exports.addLocalGuardian = async (req, res)=> {
    const { publicKey, localGuardianID, localGuardianName } = req.body;
    if (!publicKey) {
      return res.status(400).json({ error: "Request should have publicKey" });
    }
    
    return User.findOne({ publicKey })
      .then((user) => {
        if (!user) {
          res.status(400).json({ errors: "user doesnot exists" });
          return null;
        }
        User.findOneAndUpdate(
          { publicKey },
          {
            $set: {
                localGuardian: {
                    id: localGuardianID,
                    name: localGuardianName
                }
            },
          },
          { new: true }
        ).then((s) => res.json(s));
      })
      .catch((err) => res.status(500).json(err));
}

exports.addProjectGuide = async (req, res)=> {
    const { publicKey, projectGuide } = req.body;
    if (!publicKey) {
      return res.status(400).json({ error: "Request should have publicKey" });
    }
    console.log('adding project guide', projectGuide)
    return User.findOne({ publicKey })
      .then((user) => {
        if (!user) {
          res.status(400).json({ errors: "user doesnot exists" });
          return null;
        }
        User.findOneAndUpdate(
          { publicKey },
          {
            $set: {
                isApproved: false,
                projectGuide: {
                    id: projectGuide.id,
                    name: projectGuide.name
                }
            },
          },
          { new: true }
        ).then((s) => res.json(s));
      })
      .catch((err) => res.status(500).json(err));
}

exports.getHostels = async (req, res) => {
  Hostel.find()
    .sort({ createdAt: -1 })
    .then((hostels) => res.json(hostels))
    .catch((err) => res.status(404).json({ error: "No hostel found" }));
};

exports.getDepartments = async (req, res) => {
  Department.find()
    .sort({ createdAt: -1 })
    .then((depts) => res.json(depts))
    .catch((err) => res.status(404).json({ error: "No departments found" }));
};
