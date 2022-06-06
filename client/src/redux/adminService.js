import {appContract} from '../utils/blockchain'
export const getAllAdmins = async (userData)=> {
    console.log(userData)
    
    return fetch(`http://localhost:5000/api/admin/admins`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(data=> {
                console.log('admin', data)
                return data;
            })
}


export const approveAdmin = async (userData)=> {
        appContract.makeAdmin(userData.publicKey).then(async ()=> {
        console.log("approving...", userData)
        return fetch(`http://localhost:5000/api/admin/approve-user-admin`, {
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
    })
}

export const approveGuideAdmin = async (userData)=> {
    appContract.makeAdmin(userData.publicKey).then(async ()=> {
    console.log("approving guide...", userData)
    return fetch(`http://localhost:5000/api/admin/approve-guide-admin`, {
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
})
}

export const rejectAdmin = async (userData)=> {
    
    console.log("rejecting...", userData)
    return fetch(`http://localhost:5000/api/admin/reject-user-admin`, {
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


export const approveProfileUpdate = async (userData)=> {
    
    console.log("approvig update...", userData)
    return fetch(`http://localhost:5000/api/admin/approve-user-profile-update`, {
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


const adminService = {
    getAllAdmins,
    approveAdmin,
    rejectAdmin,
    approveProfileUpdate,
    approveGuideAdmin
}

export default adminService;