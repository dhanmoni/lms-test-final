export const getHostels = async ()=> {
    return fetch(`http://localhost:5000/api/profile/get-hostels`).then(res=> res.json())
            .then(hostels=> {
                console.log({hostels})
                return hostels;
            })
}

export const getDepts = async ()=> {
    return fetch(`http://localhost:5000/api/profile/get-departments`).then(res=> res.json())
            .then(depts=> {
                console.log({depts})
                return depts;
            })
}

export const getLocalGuardians = async(jwt_token)=> {
    console.log('getting guardians...')
    return fetch(`http://localhost:5000/api/users/get-local-guardians`, {
        headers: {
            'x-auth-token': jwt_token
        }
    }).then(res=> res.json())
            .then(guardians=> {
                console.log({guardians})
                return guardians;
            })
}

export const getProjectGuides = async(jwt_token)=> {
    console.log('getting project guides...')
    return fetch(`http://localhost:5000/api/users/get-project-guides`, {
        headers: {
            'x-auth-token': jwt_token
        }
    }).then(res=> res.json())
            .then(projectGuides=> {
                console.log({projectGuides})
                return projectGuides;
            })
}

export const addProjectGuide = async (userData)=> {
    console.log({userData})
    return fetch(`http://localhost:5000/api/profile/add-project-guide`, {
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userData.jwt_token
                },
                method: 'POST',
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}


const dataService = {
    getDepts,
    getHostels,
    getLocalGuardians,
    getProjectGuides,
    addProjectGuide
}

export default dataService;