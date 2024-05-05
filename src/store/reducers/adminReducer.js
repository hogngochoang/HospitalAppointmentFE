import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors:[],
    time: [],
    allDoctors: [],
    allPatients:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGenders = true;
            return {
                ...copyState,
                
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGenders = false;
            return {              
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGenders = false;
            state.genders = []
            return {
                ...state,
                
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {              
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,   
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {              
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,   
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state,   
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
            return {
                ...state,   
            }
        case actionTypes.FETCH_DOCTORS_SUCCESS:
            state.doctors = action.dataDoctors
            return {
                ...state,   
            }
        case actionTypes.FETCH_DOCTORS_FAILED:
            state.doctors = []
            return {
                ...state,   
            }
        
        case actionTypes.FETCH_ALLCODE_TIME_SUCCESS:
            state.time = action.dataTime
            return {
                ...state,   
            }
        case actionTypes.FETCH_ALLCODE_TIME_FAILED:
            state.time = []
            return {
                ...state,   
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataAllDoctors
            return {
                ...state,   
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state,   
            }
        case actionTypes.FETCH_ALL_PATIENTS_SUCCESS:
            state.allPatients = action.dataAllPatients
            return {
                ...state,   
            }
        case actionTypes.FETCH_ALL_PATIENTS_FAILED:
            state.allPatients = []
            return {
                ...state,   
            }
        default:
            return state;
    }
}

export default adminReducer;