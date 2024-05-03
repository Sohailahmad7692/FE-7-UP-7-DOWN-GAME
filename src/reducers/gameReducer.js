// reducers/gameReducer.js
const initialState = {
    points: 5000,
    diceResult: {},
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DICE_RESULT':
            return {
                ...state,
                diceResult: action.payload,
            };
        case 'UPDATE_POINTS':
            return {
                ...state,
                points: action.payload,
            };
        default:
            return state;
    }
};

export default gameReducer;
