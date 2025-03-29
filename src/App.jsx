import React from "react";
import "./App.css";
import FormBuilderPage from "./pages/FormBuilderPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <FormBuilderPage />
        </Provider>
      </DndProvider>
    </>
  );
}

export default App;
