import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// @ts-ignore
import { textRenderer, registerRenderer } from 'handsontable/renderers';



export type CellCurent = {
    row: number
    col: number,
    row2: number,
    col2: number
}

export enum TypeCustomBorderStyle {
    NONE,
    LEFT,
    RIGHT,
    TOP,
    BOTTOM,
    ALL,
    OUTLINE,

}

export type MergeCell = {
    row: number
    col: number,
    rowspan: number,
    colspan: number
}



type appState = {
    data: any[],
    currentCell: CellCurent,
    mergeCells: MergeCell[],
    cellStyles: Record<string, any>,
    dropdownMenu: boolean
};



const initialState: appState = {
    data: [[]],
    currentCell: { row: 0, col: 0, row2: 0, col2: 0 },
    mergeCells: [],
    cellStyles: {},
    dropdownMenu: false
};

export const appStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
        },
        setCurrentCell: (state, action: PayloadAction<CellCurent>) => {
            let minCol = Math.min(action.payload.col, action.payload.col2)
            let maxCol = Math.max(action.payload.col, action.payload.col2)
            let minRow = Math.min(action.payload.row, action.payload.row2)
            let maxRow = Math.max(action.payload.row, action.payload.row2)
            state.currentCell = {
                col: minCol >= 0 ? minCol : 0,
                row: minRow >= 0 ? minRow : 0,
                col2: maxCol,
                row2: maxRow
            }
        },
        setValueCellCurent: (state, action: PayloadAction<any>) => {
            if (state.currentCell.col == state.currentCell.col2 && state.currentCell.row == state.currentCell.row2) {
                state.data[state.currentCell.row][state.currentCell.col] = action.payload
            }
            else {
                for (let index = state.currentCell.col; index <= state.currentCell.col2; index++) {
                    for (let indexrow = state.currentCell.row; indexrow <= state.currentCell.row2; indexrow++) {
                        state.data[indexrow][index] = action.payload
                    }
                }
            }
        },
        setRaseValueCellCurent: (state) => {
            if (state.currentCell.col == state.currentCell.col2 && state.currentCell.row == state.currentCell.row2) {
                let num = state.data[state.currentCell.row][state.currentCell.col]
                num = Number(num).toFixed(((num + '').split(".")[1] || "").length + 1);

                state.data[state.currentCell.row][state.currentCell.col] = num
            }
            else {
                for (let index = state.currentCell.col; index <= state.currentCell.col2; index++) {
                    for (let indexrow = state.currentCell.row; indexrow <= state.currentCell.row2; indexrow++) {
                        let num = state.data[indexrow][index]
                        num = Number(num).toFixed(((num + '').split(".")[1] || "").length + 1);
                        state.data[indexrow][index] = num
                    }
                }
            }
        },
        setHoldValueCellCurent: (state) => {
            if (state.currentCell.col == state.currentCell.col2 && state.currentCell.row == state.currentCell.row2) {
                let num = state.data[state.currentCell.row][state.currentCell.col]
                num = Number(num).toFixed(((num + '').split(".")[1] || "").length - 1);

                state.data[state.currentCell.row][state.currentCell.col] = num
            }
            else {
                for (let index = state.currentCell.col; index <= state.currentCell.col2; index++) {
                    for (let indexrow = state.currentCell.row; indexrow <= state.currentCell.row2; indexrow++) {
                        let num = state.data[indexrow][index]
                        num = Number(num).toFixed(((num + '').split(".")[1] || "").length - 1);
                        state.data[indexrow][index] = num
                    }
                }
            }
        },
        updateData: (state, action: PayloadAction<any>) => {
            action.payload.forEach(([row, column, _oldValue, newValue]: Array<any>) => {
                state.data[row][column] = newValue;
            })
        },
        mergeCell: (state) => {
            state.mergeCells.push({
                row: state.currentCell.row,
                col: state.currentCell.col,
                rowspan: state.currentCell.row2 - state.currentCell.row + 1,
                colspan: state.currentCell.col2 - state.currentCell.col + 1
            })
        },
        removemergeCell: (state) => {
            state.mergeCells = state.mergeCells.filter(mc => !(mc.col == state.currentCell.col && mc.row == state.currentCell.row))
        },
        setFilter: (state) => {
            state.dropdownMenu = !state.dropdownMenu
        },
        setCustomCell: (state, action: PayloadAction<Record<string, any>>) => {
            // if ('' + state.currentCell.row + state.currentCell.col)
            if (state.currentCell.col == state.currentCell.col2 && state.currentCell.row == state.currentCell.row2) {
                state.cellStyles[`${state.currentCell.row}-${state.currentCell.col}`] = { ...state.cellStyles[`${state.currentCell.row}-${state.currentCell.col}`], ...action.payload }
            }
            else {
                for (let index = state.currentCell.col; index <= state.currentCell.col2; index++) {
                    for (let indexrow = state.currentCell.row; indexrow <= state.currentCell.row2; indexrow++) {
                        state.cellStyles[`${indexrow}-${index}`] = { ...state.cellStyles[`${indexrow}-${index}`], ...action.payload }
                    }
                }
            }
        },
        setCustomBorderCell: (state, action: PayloadAction<TypeCustomBorderStyle>) => {
            switch (action.payload) {
                case TypeCustomBorderStyle.NONE:
                    for (let index = state.currentCell.col; index <= state.currentCell.col2; index++) {
                        for (let indexrow = state.currentCell.row; indexrow <= state.currentCell.row2; indexrow++) {
                            state.cellStyles[`${indexrow}-${index}`] = { ...state.cellStyles[`${indexrow}-${index}`], ...{ border: '1px solid #ccc', borderLeft: '0px solid #ccc', borderTop: '0px solid #ccc' } }
                        }
                    }
                    break
                case TypeCustomBorderStyle.TOP:
                    for (let index = state.currentCell.col; index <= state.currentCell.col2; index++) {
                        state.cellStyles[`${state.currentCell.row}-${index}`] = { ...state.cellStyles[`${state.currentCell.row}-${index}`], ...{ borderTop: '1px solid black' } }

                    }
                    break;
                case TypeCustomBorderStyle.BOTTOM:
                    for (let index = state.currentCell.col; index <= state.currentCell.col2; index++) {
                        state.cellStyles[`${state.currentCell.row2}-${index}`] = { ...state.cellStyles[`${state.currentCell.row}-${index}`], ...{ borderBottom: '1px solid black' } }

                    }
                    break;
                case TypeCustomBorderStyle.LEFT:
                    for (let index = state.currentCell.row; index <= state.currentCell.row2; index++) {
                        state.cellStyles[`${index}-${state.currentCell.col}`] = { ...state.cellStyles[`${index}-${state.currentCell.col}`], ...{ borderLeft: '1px solid black' } }

                    }
                    break;
                case TypeCustomBorderStyle.RIGHT:
                    for (let index = state.currentCell.row; index <= state.currentCell.row2; index++) {
                        state.cellStyles[`${index}-${state.currentCell.col2}`] = { ...state.cellStyles[`${index}-${state.currentCell.col}`], ...{ borderRight: '1px solid black' } }

                    }
                    break;
                case TypeCustomBorderStyle.ALL:
                    for (let index = state.currentCell.col; index <= state.currentCell.col2; index++) {
                        for (let indexrow = state.currentCell.row; indexrow <= state.currentCell.row2; indexrow++) {
                            state.cellStyles[`${indexrow}-${index}`] = { ...state.cellStyles[`${indexrow}-${index}`], ...{ border: '1px solid black', borderLeftWidth: 0, borderTopWidth: 0 } }
                        }
                    }
                    for (let index = state.currentCell.row; index <= state.currentCell.row2; index++) {
                        state.cellStyles[`${index}-${state.currentCell.col}`] = { ...state.cellStyles[`${index}-${state.currentCell.col}`], ...{ borderLeft: '1px solid black' } }

                    }
                    for (let index = state.currentCell.col; index <= state.currentCell.col2; index++) {
                        state.cellStyles[`${state.currentCell.row}-${index}`] = { ...state.cellStyles[`${state.currentCell.row}-${index}`], ...{ borderTop: '1px solid black' } }
                    }
                    break;
                default:
                    break;
            }

        },
    }
});

export const {
    setData,
    setCurrentCell,
    setValueCellCurent,
    updateData,
    setCustomCell,
    mergeCell,
    removemergeCell,
    setCustomBorderCell,
    setRaseValueCellCurent,
    setHoldValueCellCurent,
    setFilter
} = appStateSlice.actions;

export default appStateSlice.reducer;