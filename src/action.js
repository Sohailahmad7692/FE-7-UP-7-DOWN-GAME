// actions.js
export const updateDiceResult = (diceResult) => ({
    type: 'UPDATE_DICE_RESULT',
    payload: diceResult,
});

export const updatePoints = (points) => ({
    type: 'UPDATE_POINTS',
    payload: points,
});