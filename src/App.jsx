import React from "react";
import "./App.css";
import FormBuilderPage from "./pages/FormBuilderPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import { RightClickProvider } from "./contexts/rightClickContexts";
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
const Backend = isMobile ? TouchBackend : HTML5Backend;
function App() {
  return (
    <>
      <RightClickProvider>
        <DndProvider backend={Backend}>
          <Provider store={store}>
            <FormBuilderPage />
          </Provider>
        </DndProvider>
      </RightClickProvider>
    </>
  );
}

export default App;
