import {createSlice} from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    incomeData: undefined,
    expenseData: undefined,
    combine: undefined,
    colors: undefined,
  },

  reducers: {
    setData: (state, action) => {
      const {incomeData, expenseData, combine, colors} = action.payload;
      state.incomeData = incomeData;
      state.expenseData = expenseData;
      state.combine = combine;
      state.colors = colors;
    },
  },
});

export const {setData} = dataSlice.actions;
export default dataSlice.reducer;
