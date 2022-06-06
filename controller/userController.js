const User = require('../models/User');

exports.getStudentByHostels = async (req,res)=> {
    console.log(req.params)
    const {id} = req.params;
    User.find({'hostel.id': id, roles: 'STUDENT'})
        .sort({createdAt: -1})
        .then(students=> res.json(students))
        .catch(err=> res.status(404).json({error: 'No students found'}))
}

exports.getStudentsByDepartments = async (req,res)=> {
    const {id} = req.params;
    User.find({'department.id': id, roles: 'STUDENT'})
        .sort({createdAt: -1})
        .then(students=> res.json(students))
        .catch(err=> res.status(404).json({error: 'No students found'}))
}

exports.getStudentsByProjectGuide = async (req,res)=> {
    const {id} = req.params;
    User.find({'projectGuide.id': id, roles: 'STUDENT'})
        .sort({createdAt: -1})
        .then(students=> res.json(students))
        .catch(err=> res.status(404).json({error: 'No students found'}))
}

exports.getStudentsByLocalGuardian = async (req,res)=> {
    const {id} = req.params;
    User.find({'localGuardian.id': id, roles: 'STUDENT'})
        .sort({createdAt: -1})
        .then(students=> res.json(students))
        .catch(err=> res.status(404).json({error: 'No students found'}))
}

exports.getAllStudents = async (req,res)=> {
    User.find({ roles: 'STUDENT'})
        .sort({createdAt: -1})
        .then(students=> res.json(students))
        .catch(err=> res.status(404).json({error: 'No students found'}))
}

exports.getAllApprovedStudents = async (req,res)=> {
    User.find({ roles: 'STUDENT', isApproved: true})
        .sort({createdAt: -1})
        .then(students=> res.json(students))
        .catch(err=> res.status(404).json({error: 'No students found'}))
}

exports.getAllLocalGuardians = async (req,res)=> {
    User.find({ roles: 'LOCAL_GUARDIAN', isApproved: true})
        .sort({createdAt: -1})
        .then(localGuardian=>{
            console.log('getting data', localGuardian)
            return res.json(localGuardian)})
        .catch(err=> res.status(404).json({error: 'No local guardian found'}))
}

exports.getAllProjectGuides = async (req,res)=> {
    User.find({ roles: 'PROJECT_GUIDE',  isApproved: true})
        .sort({createdAt: -1})
        .then(projectGuide=> res.json(projectGuide))
        .catch(err=> res.status(404).json({error: 'No project guide found'}))
}

exports.getStudentsByIds = async (req, res) => {
    const ids = req.params.ids
    console.log({ids})
    console.log('gettig students...')
    User.find({ _id: { $in: ids } })
      .sort({ createdAt: -1 })
      .then((students) => res.json(students))
      .catch((err) => res.status(404).json({ error: "No students found" }));
  };
