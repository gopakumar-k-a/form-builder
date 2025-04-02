import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFormPreviewOpen: false,
  isLeftSideBarOpen: false,
  isRightSideBarOpen: false,
};
const formHandlerSlice = createSlice({
  name: "formHandler",
  initialState,
  reducers: {
    setFormPreviewOpen: (state, action) => {
      state.isFormPreviewOpen = action.payload;
    },
    setLeftSideBarOpen: (state, action) => {
      state.isLeftSideBarOpen = action.payload;
    },
    setRightSideBarOpen: (state, action) => {
      state.isRightSideBarOpen = action.payload;
    },
  },
});

export const { setFormPreviewOpen, setLeftSideBarOpen, setRightSideBarOpen } =
  formHandlerSlice.actions;

export default formHandlerSlice.reducer;
