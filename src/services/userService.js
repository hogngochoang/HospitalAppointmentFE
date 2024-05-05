import axios from '../axios'

const handleLogin = (email, password) => {
    return axios.post('/api/login', {email, password})
}

const getUsers = (inputId) => {
    return axios.get(`/api/get-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-user',data)
}

const deleteUserService = (id) => {
    return axios.delete('/api/delete-user',{data:{id}})
}

const updateUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getALLCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getDoctorHomeService = (limit) => {
    return axios.get(`/api/doctor-home?limit=${limit}`)
}

const getDoctorDetailService = (limit) => {
    return axios.get(`/api/all-doctor-detail`)
}

const saveScheduleDoctor = (data) => {
    return axios.post(`/api/create-schedule`,data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getScheduleDoctorById = (doctorId) => {
    return axios.get(`/api/get-schedule-doctor-by-id?doctorId=${doctorId}`)
}

const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors')
}

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`,data)
}

const postVerifyPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-verify-book-appointment`,data)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const getAllExaminedPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-examined-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const updateBookingStatusDone = (data) => {
    return axios.post(`/api/update-booking-status-done`,data)
}

const getAllPatientForAdmin = (data) => {
    return axios.get(`/api/get-list-patient-for-admin?date=${data.date}`)
}

const getTotalPatientForAdmin = (doctorId) => {
    return axios.get(`/api/get-total-patient-for-admin?doctorId=${doctorId}`)
}

const getAllWaitingPatientForStaff = (data) => {
    return axios.get(`/api/get-list-waiting-patient-for-staff`)
}

const updateBookingStatusConfirmed = (data) => {
    return axios.post(`/api/update-booking-status-confirmed`,data)
}

const getAllConfirmedPatientForStaff = (data) => {
    return axios.get(`/api/get-list-confirmed-patient-for-staff`)
}

const deleteBookingService = (id) => {
    return axios.delete('/api/delete-booking',{data:{id}})
}

const updateBookingStatusCancel = (data) => {
    return axios.post(`/api/update-booking-status-cancel`,data)
}

const deleteSchedule = (doctorId, date) => {
    return axios.delete('/api/delete-schedule',{data:{doctorId, date}})
}


export {
    handleLogin, getUsers, 
    createNewUserService,deleteUserService, 
    updateUserService, getALLCodeService,
    getDoctorHomeService, 
    getDoctorDetailService,
    saveScheduleDoctor,
    getScheduleDoctorByDate,getAllDoctors,
    getScheduleDoctorById,
    postPatientBookAppointment,
    postVerifyPatientBookAppointment,
    getAllPatientForDoctor,
    getAllExaminedPatientForDoctor,
    updateBookingStatusDone,
    getAllPatientForAdmin,
    getTotalPatientForAdmin,
    getAllWaitingPatientForStaff,
    updateBookingStatusConfirmed,
    getAllConfirmedPatientForStaff,
    deleteBookingService,
    updateBookingStatusCancel,
    deleteSchedule
}