export const getStudentsByHostel = async (userData)=> {
    console.log(userData)
    
    return fetch(`http://localhost:5000/api/users/get-students-hostels/${userData.id}`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const getStudentsByDept = async (userData)=> {
    console.log(userData)
    
    return fetch(`http://localhost:5000/api/users/get-students-departments/${userData.id}`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const getStudentsByLocalGuardian = async (userData)=> {
    console.log(userData)
    
    return fetch(`http://localhost:5000/api/users/get-students-local-guardian/${userData.id}`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const getStudentsByProjectGuide = async (userData)=> {
    console.log(userData)
    
    return fetch(`http://localhost:5000/api/users/get-students-project-guide/${userData.id}`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const getStudentsByIds = async (userData)=> {
    return fetch(`http://localhost:5000/api/users/get-students-by-ids/${userData.ids}`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const getAllStudents = async (userData)=> {
    
    return fetch(`http://localhost:5000/api/users/get-students`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(students=> {
                console.log({students})
                return students;
            })
}

export const getAllApprovedStudents = async (userData)=> {
    
    return fetch(`http://localhost:5000/api/users/get-approved-students`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(students=> {
                console.log({students})
                return students;
            })
}

export const approveStudent = async (userData)=> {
    
    console.log("approving...", userData)
    return fetch(`http://localhost:5000/api/admin/approve-user-student`, {
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userData.jwt_token
                },
                method: 'POST'
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const rejectStudent = async (userData)=> {
    
    console.log("rejecting...", userData)
    return fetch(`http://localhost:5000/api/admin/reject-user-student`, {
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userData.jwt_token
                },
                method: 'POST'
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}


const studentsService = {
    getStudentsByDept,
    getStudentsByHostel,
    approveStudent,
    rejectStudent,
    getAllStudents,
    getStudentsByIds,
    getStudentsByLocalGuardian,
    getStudentsByProjectGuide,
    getAllApprovedStudents
}

export default studentsService;