import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "../reducers/canvas/canvasReducer";

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
  },
});
