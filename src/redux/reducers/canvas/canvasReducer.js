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
      const { item, operation, index, fromIndex, toIndex } = action.payload;
      switch (operation) {
        case "add": {
          const newComponents = [...state.components];

          if (index !== null && index >= 0 && index < newComponents.length) {
            // Insert at a specific index
            newComponents.splice(index, 0, item);
          } else {
            // Add at the end by default
            newComponents.push(item);
          }

          return {
            ...state,
            components: newComponents,
            selectedComponent: item,
          };

          // const uniqueInstanceId = `${item.id}-${Date.now()}`;
          // const newComponent = { ...item, id: uniqueInstanceId };
          // return {
          //   ...state,
          //   components: [...state.components, item],
          //   selectedComponent: item,
          // };
        }
        // switch (operation) {
        //   case "add": {
        //     const uniqueInstanceId = `${item.id}-${Date.now()}`;
        //     const newComponent = { ...item, id: uniqueInstanceId };
        //     return {
        //       ...state,
        //       components: [...state.components, newComponent],
        //       selectedComponent: newComponent,
        //     };
        //   }
        case "remove": {
          const newComponents = state.components.filter(
            (comp) => comp.id !== item.id
          );
          return {
            ...state,
            components: newComponents,
            selectedComponent: null,
          };
        }
        case "swap": {
          console.log("fromIndex === toIndex ", fromIndex, " === ", toIndex);
          if (fromIndex === toIndex) return state; // No need to swap

          if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= state.components.length ||
            toIndex >= state.components.length
          )
            return state;

          const newComponents = [...state.components];
          // Swap elements
          [newComponents[fromIndex], newComponents[toIndex]] = [
            newComponents[toIndex],
            newComponents[fromIndex],
          ];
          // let selectedComponent = state.selectedComponent;

          // if (state.selectedComponent === state.components[fromIndex]) {
          //   selectedComponent = newComponents[toIndex];
          // } else if (state.selectedComponent === state.components[toIndex]) {
          //   selectedComponent = newComponents[fromIndex];
          // }
          const selectedComponent = newComponents[toIndex];
          return {
            ...state,
            components: newComponents,
            selectedComponent,
          };
        }

        default:
          return state;
      }
    },
    setSelectedComponent: (state, action) => {
      const { item, operation } = action.payload;
      switch (operation) {
        case "add": {
          state.selectedComponent = { ...item };
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
