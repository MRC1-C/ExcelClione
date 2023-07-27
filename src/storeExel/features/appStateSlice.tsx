import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type CellCurent = {
    row: number
    col: number,
}


type appState = {
    data: any[],
    currentCell: CellCurent,
    render: boolean
};


const initialState: appState = {
    data: [[]],
    currentCell: { row: 0, col: 0 },
    render: true
};

export const appStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
        },
        setCurrentCell: (state, action: PayloadAction<CellCurent>) => {
            state.currentCell = action.payload
        },
        setValueCellCurent: (state, action: PayloadAction<any>) => {
            state.data[state.currentCell.row][state.currentCell.col] = action.payload
        },
        updateData: (state, action: PayloadAction<any>) => {
            const newData = [...state.data];
            action.payload.forEach(([row, column, _oldValue, newValue]: Array<any>) => {
                newData[row][column] = newValue;
            })
            state.data = newData
        },
    }
});

export const {
    setData,
    setCurrentCell,
    setValueCellCurent,
    updateData
} = appStateSlice.actions;

export default appStateSlice.reducer;