import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "../reducers/canvas/canvasReducer";
import formHandlerReducer from "../reducers/formHandling/formHandleReducer";
export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    formHandler: formHandlerReducer,
  },
});
