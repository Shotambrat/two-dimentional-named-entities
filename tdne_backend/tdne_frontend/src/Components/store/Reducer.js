import { createStore } from 'redux';

const initialState = {
    data: [
        { id: 1, name: 'EntiieA', coordinate: {x: -5, y: 10}, labels: ['labelA', 'labelB', 'labelE']},
        { id: 2, name: 'EntiieB', coordinate: {x: 3, y: 6}, labels: ['labelC', 'labelD']},
        { id: 3, name: 'EntiieC', coordinate: {x: 4, y: -1}, labels: ['labelA', 'labelC']},
    ],
    editableRowId: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ROW':
        return {
            ...state,
            data: [...state.data, action.payload]
        };
        case 'REMOVE_ROW':
        return {
            data: state.data.filter(item => item.id !== action.payload)
        }
        case 'EDIT_ROW':
        return { ...state, editableRowId: action.payload };
        case 'SAVE_ROW':
        return { ...state, editableRowId: null };
        case 'UPDATE_ROW':
            const newData = state.data.map((row) => {
                if (row.id === action.payload.id) {
                    return { ...row, [action.payload.key]: action.payload.value };
                }
                return row;
            });
        return { ...state, data: newData };
        default:
        return state;
    }
}

export const store = createStore(reducer);