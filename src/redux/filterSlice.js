import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = '';

const filterSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,

  reducers: {
    findContact(state, action) {
      return (state = action.payload);
    },
  },
});
// state.contacts.filter(contact =>
// contact.name.toLowerCase().includes(action.payload.toLowerCase())
export const { findContact } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
