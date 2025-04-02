import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFormPreviewOpen: false,
};
const formHandlerSlice = createSlice({
  name: "formHandler",
  initialState,
  reducers: {
    setFormPreviewOpen: (state, action) => {
      state.isFormPreviewOpen = action.payload;
    },
  },
});

export const { setFormPreviewOpen } = formHandlerSlice.actions;

export default formHandlerSlice.reducer;
