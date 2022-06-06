import {appContract} from '../utils/blockchain'
export const getApplications = async (_key)=> {
    const returnValue = []
    const data = await  appContract.getApplicationsByStudentId(_key)
    data.map(d=> {
        returnValue.push({
            subject: d.subject,
            reason: d.reason,
            startDate: d.startDate.toNumber(),
            endDate: d.endDate.toNumber(),
            approvels: d.approvels,
            approveLevel: d.approveLevel.toNumber(),
            academicLeave: d.academicLeave,
            dswReq: d.dswReq,
            withDrawn: d.withDrawn,
            prefixDate: d.prefixDate.toNumber(),
            prefixReason: d.prefixReason,
            suffixDate: d.suffixDate.toNumber(),
            suffixReason: d.suffixReason,
        })
    })
    console.log({returnValue})
    const returnData = {
        [_key] : returnValue
    }
    console.log({returnData})
    return returnData
}

export const applyApplication = async (data)=> {
    const {subject, reason, start_date, end_date, isAcademicLeave, dsw_req, prefix_date, prefixReason, suffix_date, suffixReason} = data
    return appContract.applyLeave(subject, reason, start_date, end_date, isAcademicLeave, dsw_req, prefix_date, prefixReason, suffix_date, suffixReason).then(res=> console.log({res})).catch(err=> console.log({err}))
}

export const rejectApplication = async (key)=> {
    return appContract.rejectLeave(key).then(res=> console.log({res})).catch(err=> console.log({err}))
}

export const approveApplication = async (key)=> {
    return appContract.grantLeave(key).then(res=> console.log({res})).catch(err=> console.log({err}))
}

export const withdrawApplication = async (key)=> {
    return appContract.withDrawLeave(key).then(res=> console.log({res})).catch(err=> console.log({err}))
}

const applicationService = {
    getApplications,
    applyApplication,
    rejectApplication,
    approveApplication,
    withdrawApplication
}

export default applicationService;