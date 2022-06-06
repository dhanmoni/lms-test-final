const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    admin: {
        adminId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        adminName: {
          type: String
        }
      },
    students: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        studentName: {
          type: String,
        }
    },
    ]
  },
  { timestamps: true }
);

module.exports = Department = mongoose.model("department", schema);