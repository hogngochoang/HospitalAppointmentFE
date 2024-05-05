import actionTypes from './actionTypes';
import { getALLCodeService, createNewUserService, getUsers, deleteUserService, updateUserService, getDoctorHomeService, getAllDoctors, getAllWaitingPatientForStaff, deleteBookingService, } from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getALLCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log(e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getALLCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log(e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getALLCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log(e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                toast.success("CREATE NEW USER SUCCEED");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log(e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getUsers("ALL");
            // let res1 = await getDoctorHomeService('');
            // console.log('check doctor home', res1)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log(e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUser = (id) => {
    return async(dispatch, getState) => {
        try {
            let res = await deleteUserService(id)
            if (res && res.errCode === 0) {
                toast.success("DELETE USER SUCCEED");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log(e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await updateUserService(data)
            if (res && res.errCode === 0) {
                toast.success("UPDATE USER SUCCEED");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log(e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED

})

export const fetchDoctor = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await getDoctorHomeService('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_DOCTORS_FAILED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_DOCTORS_FAILED
            });
            console.log(e)
        }
    }
}

export const fetchAllTime = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getALLCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_TIME_SUCCESS,
                    dataTime: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_TIME_FAILED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_TIME_FAILED
            });
            console.log(e)
        }
    }
}

export const fetchAllDoctors = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataAllDoctors: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            });
            console.log(e)
        }
    }
}

export const fetchAllPatients = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllWaitingPatientForStaff()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PATIENTS_SUCCESS,
                    dataAllPatients: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PATIENTS_FAILED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_PATIENTS_FAILED
            });
            console.log(e)
        }
    }
}

export const deleteBooking = (id) => {
    return async(dispatch, getState) => {
        try {
            let res = await deleteBookingService(id)
            if (res && res.errCode === 0) {
                toast.success("DELETE BOOKING SUCCEED");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllPatients());
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log(e)
        }
    }
}

export const deleteBookingSuccess = () => ({
    type: actionTypes.DELETE_BOOKING_SUCCESS,
})

export const deleteBookingFailed = () => ({
    type: actionTypes.DELETE_BOOKING_FAILED
})


