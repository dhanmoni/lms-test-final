const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    publicKey:{
        type: String,
        required: true,
        unique: true,
    },
    nonce: {
        type: Number,
        default: () => Math.floor(Math.random() * 1000000) // Initialize with a random nonce
    },
    name: {
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    roll : {
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    idProof:{
        type: String,
    },
    roles: {
        type: [{
            type: String,
            enum: [
                'STUDENT', 
                'HOD', 
                'WARDEN', 
                'PROJECT_GUIDE', 
                'LOCAL_GUARDIAN',
                'DSW', 
                'SYSTEM_ADMIN']
        }],
        default: ['STUDENT']
    },
    localGuardian: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        name: {
            type: String
        }
    },
    projectGuide: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        name: {
            type: String
        }
    },
    department: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "department",
        },
        name: {
            type: String
        }
    },
    hostel: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "hostel",
        },
        name: {
            type: String
        }
    },
    // if user is project-guide or local-guardian the he/she will have a list
    // of students under his/her name
    students: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          name: {
            type: String
        }
        }
    ],
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", schema);