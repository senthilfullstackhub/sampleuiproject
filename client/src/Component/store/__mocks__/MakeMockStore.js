import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([thunk]);

export const MakeMockStore = (state = {}) => {
    return mockStore({
        ...state
    });
};