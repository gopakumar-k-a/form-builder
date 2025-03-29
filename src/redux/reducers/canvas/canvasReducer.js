import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  components: [],
  selectedComponent: null,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setComponents: (state, action) => {
      const { item, operation } = action.payload;
      switch (operation) {
        case "add": {
          const uniqueInstanceId = `${item.id}-${Date.now()}`;
          state.components = [
            ...state.components,
            { ...item, id: uniqueInstanceId },
          ];
          break;
        }

        case "remove": {
          state.components = state.components.filter(
            (comp) => comp.id !== item.id
          );
          if (state.selectedComponent.id == item.id) {
            state.selectedComponent = null;
          }
          break;
        }

        default:
          return state;
      }
    },
    setSelectedComponent: (state, action) => {
      const { item, operation } = action.payload;
      switch (operation) {
        case "add": {
          state.selectedComponent = {...item};
          break;
        }
        case "remove": {
          state.selectedComponent = null;
          break;
        }
        default:
          return state;
      }
    },
  },
});

export const { setComponents, setSelectedComponent } = canvasSlice.actions;
export default canvasSlice.reducer;
