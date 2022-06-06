export const createUserProfile = async (userData)=> {
    
      const token = userData.get('jwt_token')
      
    return fetch(`http://localhost:5000/api/profile/create-profile`, {
                body: userData,
                headers: {
                    'x-auth-token': token
                },
                method: 'POST',
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const createAdminProfile = async (adminData)=> {
    console.log('hello')
    const token = adminData.get('jwt_token')
    console.log('fetching...', token)
      
    return fetch(`http://localhost:5000/api/profile/create-admin-profile`, {
                body: adminData,
                headers: {
                    'x-auth-token': token
                },
                method: 'POST',
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}



const authService = {
    createUserProfile,
    createAdminProfile
}

export default authService;