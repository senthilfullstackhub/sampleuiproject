import { combineReducers } from 'redux';

// To initialize the store 
const initialState = {
    userFirstName: '',
    userLastName: '',
    userIncome: 0,
    userDob: '',
    apiServiceTimestamp: '',
    apiServiceDecision: '',
    FetchError: '',
    uiPage: 'Home',
    currentApr: 0.0,

};

// To change the state based on th action reducers 
const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'API_RESPONSE_MAPPING':
            return {
                ...state,
                userFirstName: action.firstName,
                userLastName: action.lastName,
                userIncome: action.income,
                userDob: action.dob,
                apiServiceDecision: action.serviceDecision,
                apiServiceTimestamp: action.timestampLog,
                uiPage: action.serviceDecision,
                currentApr: action.currentApr,
                FetchError: '',
            }
        case 'API_RESPONSE_ERROR':
            return {
                ...state,
                FetchError: 'Internal Server Error',
                uiPage: 'Home'
            }
        case 'LOADING':
                return {
                    ...state,
                    uiPage: 'Loading'
                }
        case 'SWITCH_TO_FORM_PAGE':
            return {
                ...state,
                uiPage: 'Home'
            }
        default:
            return state;
    }
}

export default combineReducers({
    pageTag: pageReducer
});
