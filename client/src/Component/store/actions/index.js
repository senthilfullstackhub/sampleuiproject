import axios from 'axios';
require('es6-promise').polyfill();

// To map the fetch response with details

export const fetchResponseSuccess = (res) => {
        return {
            type: 'API_RESPONSE_MAPPING',
            serviceDecision: res.data.serviceDecision,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            dob: res.data.dob,
            income: res.data.income,
            timestampLog: res.data.timestampLog,
            currentApr: res.data.apr
        }
}

export const fetchResponseError = (res) => {
    return {
        type: 'API_RESPONSE_ERROR'
    }
}

export const spinnerAction = (res) => {
    return {
        type: 'LOADING'
    }
}



// Action creator - To fetch the decision creator

export const fetchDecisions = (firstName, lastName, dob, income) => async dispatch => {
    let currentTimestamp = new Date();
    await axios({
        method: 'post',
        url: 'http://localhost:5000/api/decision',
        data: {
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            income: income,
            timestampLog: currentTimestamp
        }
    })
        .then(function (response) {
            if (response.status === 200) {
               dispatch(fetchResponseSuccess(response));
            }
            else {
               dispatch(fetchResponseError());
            }
        })
        .catch(function (error) {
            dispatch(fetchResponseError());
        });
}